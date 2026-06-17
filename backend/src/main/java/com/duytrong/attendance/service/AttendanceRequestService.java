package com.duytrong.attendance.service;

import com.duytrong.attendance.common.BusinessException;
import com.duytrong.attendance.common.enums.*;
import com.duytrong.attendance.domain.*;
import com.duytrong.attendance.dto.AttendanceRequestDtos;
import com.duytrong.attendance.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AttendanceRequestService {
    private final AttendanceRequestRepository requestRepository;
    private final RequestTypeRepository requestTypeRepository;
    private final ApprovalStepRepository approvalStepRepository;
    private final AttendanceEventRepository attendanceEventRepository;
    private final AttendanceAdjustmentRepository adjustmentRepository;
    private final DailyAttendanceRepository dailyAttendanceRepository;
    private final LeaveTypeRepository leaveTypeRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;
    private final LeaveTransactionRepository leaveTransactionRepository;
    private final AttendanceCalculationService calculationService;
    private final SystemTimeService systemTimeService;
    private final AccessControlService accessControlService;

    public List<AttendanceRequest> list(String status) {
        List<AttendanceRequest> rows;
        if (status != null && !status.isBlank()) {
            rows = requestRepository.findByStatus(RequestStatus.valueOf(status));
        } else {
            rows = requestRepository.findAll();
        }
        if (accessControlService.canSeeAllEmployees()) return rows;
        if (accessControlService.isLeader()) {
            List<UUID> employeeIds = accessControlService.leaderEmployeeIds();
            return rows.stream().filter(request -> employeeIds.contains(request.getEmployeeId())).toList();
        }
        UUID currentEmployeeId = accessControlService.currentEmployeeId();
        return rows.stream().filter(request -> request.getEmployeeId() != null && request.getEmployeeId().equals(currentEmployeeId)).toList();
    }

    @Transactional
    public AttendanceRequest create(AttendanceRequestDtos.CreateRequest request) {
        UUID targetEmployeeId = request.employeeId();
        if (!accessControlService.canSeeAllEmployees()) {
            UUID currentEmployeeId = accessControlService.currentEmployeeId();
            if (currentEmployeeId == null || targetEmployeeId == null || !currentEmployeeId.equals(targetEmployeeId)) {
                throw new BusinessException("Bạn chỉ được tạo đơn cho chính mình");
            }
        }
        RequestType type = requestTypeRepository.findByCode(request.requestTypeCode())
                .orElseThrow(() -> new BusinessException("Loại đơn không tồn tại"));
        AttendanceRequest entity = new AttendanceRequest();
        entity.setEmployeeId(request.employeeId());
        entity.setRequestTypeId(type.getId());
        entity.setTargetDate(request.targetDate() == null ? systemTimeService.today() : request.targetDate());
        entity.setEndDate(request.endDate());
        entity.setStartTime(request.startTime());
        entity.setEndTime(request.endTime());
        entity.setReason(request.reason());
        entity.setStatus(RequestStatus.PENDING);
        return requestRepository.save(entity);
    }

    @Transactional
    public AttendanceRequest approve(UUID requestId, String comment) {
        AttendanceRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new BusinessException("Không tìm thấy đơn"));
        accessControlService.requireCanApproveRequestForEmployee(request.getEmployeeId());
        UUID approverEmployeeId = accessControlService.currentEmployeeId();
        String approverRole = accessControlService.currentApproverRole();
        if (request.getStatus() != RequestStatus.PENDING) {
            throw new BusinessException("Chỉ được duyệt đơn đang chờ duyệt");
        }
        request.setStatus(RequestStatus.APPROVED);
        request = requestRepository.save(request);

        ApprovalStep step = new ApprovalStep();
        step.setRequestId(requestId);
        step.setStepNo(1);
        step.setApproverEmployeeId(approverEmployeeId);
        step.setApproverRole(approverRole);
        step.setStatus(RequestStatus.APPROVED);
        step.setComment(comment);
        step.setApprovedAt(systemTimeService.now());
        approvalStepRepository.save(step);

        applyApprovedRequest(request, approverEmployeeId);
        deductAnnualLeaveIfNeeded(request);
        return request;
    }

    @Transactional
    public AttendanceRequest reject(UUID requestId, String comment) {
        AttendanceRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new BusinessException("Không tìm thấy đơn"));
        accessControlService.requireCanApproveRequestForEmployee(request.getEmployeeId());
        UUID approverEmployeeId = accessControlService.currentEmployeeId();
        String approverRole = accessControlService.currentApproverRole();
        if (request.getStatus() != RequestStatus.PENDING) {
            throw new BusinessException("Chỉ được từ chối đơn đang chờ duyệt");
        }
        request.setStatus(RequestStatus.REJECTED);
        request = requestRepository.save(request);

        ApprovalStep step = new ApprovalStep();
        step.setRequestId(requestId);
        step.setStepNo(1);
        step.setApproverEmployeeId(approverEmployeeId);
        step.setApproverRole(approverRole);
        step.setStatus(RequestStatus.REJECTED);
        step.setComment(comment);
        step.setApprovedAt(systemTimeService.now());
        approvalStepRepository.save(step);
        return request;
    }

    private void applyApprovedRequest(AttendanceRequest request, UUID approverEmployeeId) {
        RequestType type = requestTypeRepository.findById(request.getRequestTypeId()).orElseThrow();
        String code = type.getCode();

        if ("MISSING_CHECK_IN".equals(code) && request.getStartTime() != null) {
            createManualEvent(request, AttendanceEventType.CHECK_IN, request.getTargetDate().atTime(request.getStartTime()));
            saveAdjustment(request, AdjustmentType.ADD_CHECK_IN, approverEmployeeId);
        } else if ("MISSING_CHECK_OUT".equals(code) && request.getEndTime() != null) {
            createManualEvent(request, AttendanceEventType.CHECK_OUT, request.getTargetDate().atTime(request.getEndTime()));
            saveAdjustment(request, AdjustmentType.ADD_CHECK_OUT, approverEmployeeId);
        } else if ("REMOTE_WORK".equals(code)) {
            markStatus(request, AttendanceStatus.REMOTE);
            saveAdjustment(request, AdjustmentType.MARK_REMOTE, approverEmployeeId);
        } else if ("LEAVE_REQUEST".equals(code)) {
            markStatus(request, AttendanceStatus.ON_LEAVE);
            saveAdjustment(request, AdjustmentType.MARK_LEAVE, approverEmployeeId);
        } else if ("OVERTIME".equals(code)) {
            saveAdjustment(request, AdjustmentType.MARK_OVERTIME, approverEmployeeId);
        } else if ("LATE_ARRIVAL".equals(code) || "EARLY_LEAVE_REQUEST".equals(code) || "OUTSIDE_REQUEST".equals(code) || "TIME_OFF".equals(code)) {
            saveAdjustment(request, AdjustmentType.MARK_LEAVE, approverEmployeeId);
        }

        LocalDate date = request.getTargetDate();
        LocalDate end = request.getEndDate() == null ? request.getTargetDate() : request.getEndDate();
        while (date != null && !date.isAfter(end)) {
            calculationService.recalculate(request.getEmployeeId(), date);
            date = date.plusDays(1);
        }
    }

    private void deductAnnualLeaveIfNeeded(AttendanceRequest request) {
        RequestType type = requestTypeRepository.findById(request.getRequestTypeId()).orElseThrow();
        String code = type.getCode();
        double daysToUse = calculateLeaveDaysToUse(request, code);
        if (daysToUse <= 0) return;

        LeaveType annualLeave = leaveTypeRepository.findByCode("ANNUAL_LEAVE")
                .orElseThrow(() -> new BusinessException("Chưa cấu hình loại nghỉ phép năm"));
        int year = request.getTargetDate().getYear();
        LeaveBalance balance = leaveBalanceRepository.findByEmployeeId(request.getEmployeeId()).stream()
                .filter(b -> annualLeave.getId().equals(b.getLeaveTypeId()))
                .filter(b -> Integer.valueOf(year).equals(b.getYear()))
                .findFirst()
                .orElseGet(() -> {
                    LeaveBalance newBalance = new LeaveBalance();
                    newBalance.setEmployeeId(request.getEmployeeId());
                    newBalance.setLeaveTypeId(annualLeave.getId());
                    newBalance.setYear(year);
                    newBalance.setTotalDays(12.0);
                    newBalance.setUsedDays(0.0);
                    newBalance.setRemainingDays(12.0);
                    return newBalance;
                });

        double used = safeDouble(balance.getUsedDays()) + daysToUse;
        double remaining = Math.max(0, safeDouble(balance.getTotalDays()) - used);
        balance.setUsedDays(round2(used));
        balance.setRemainingDays(round2(remaining));
        balance = leaveBalanceRepository.save(balance);

        LeaveTransaction transaction = new LeaveTransaction();
        transaction.setEmployeeId(request.getEmployeeId());
        transaction.setLeaveTypeId(annualLeave.getId());
        transaction.setTransactionDate(request.getTargetDate());
        transaction.setDays(round2(daysToUse));
        transaction.setTransactionType(LeaveTransactionType.USE);
        transaction.setRequestId(request.getId());
        transaction.setNote("Trừ phép từ đơn đã duyệt: " + type.getName());
        leaveTransactionRepository.save(transaction);
    }

    private double calculateLeaveDaysToUse(AttendanceRequest request, String code) {
        if ("LEAVE_REQUEST".equals(code)) {
            LocalDate start = request.getTargetDate();
            LocalDate end = request.getEndDate() == null ? start : request.getEndDate();
            double days = 0;
            while (!start.isAfter(end)) {
                if (start.getDayOfWeek() != DayOfWeek.SATURDAY && start.getDayOfWeek() != DayOfWeek.SUNDAY) {
                    days += 1.0;
                }
                start = start.plusDays(1);
            }
            return days;
        }
        if ("LATE_ARRIVAL".equals(code) || "EARLY_LEAVE_REQUEST".equals(code) || "OUTSIDE_REQUEST".equals(code) || "TIME_OFF".equals(code)) {
            if (request.getStartTime() == null || request.getEndTime() == null) return 0;
            LocalDateTime start = request.getTargetDate().atTime(request.getStartTime());
            LocalDateTime end = request.getTargetDate().atTime(request.getEndTime());
            if (end.isBefore(start)) end = end.plusDays(1);
            long minutes = Math.max(0, Duration.between(start, end).toMinutes());
            return round2(minutes / 480.0);
        }
        return 0;
    }

    private double safeDouble(Double value) {
        return value == null ? 0.0 : value;
    }

    private double round2(double value) {
        return Math.round(value * 100.0) / 100.0;
    }

    private void createManualEvent(AttendanceRequest request, AttendanceEventType eventType, LocalDateTime time) {
        AttendanceEvent event = new AttendanceEvent();
        event.setEmployeeId(request.getEmployeeId());
        event.setEmployeeIdentifier("REQUEST-" + request.getEmployeeId());
        event.setEventType(eventType);
        event.setEventTime(time);
        event.setValid(true);
        event.setRawData("APPROVED_REQUEST:" + request.getId());
        attendanceEventRepository.save(event);
    }

    private void markStatus(AttendanceRequest request, AttendanceStatus status) {
        DailyAttendance daily = dailyAttendanceRepository.findByEmployeeIdAndWorkDate(request.getEmployeeId(), request.getTargetDate())
                .orElseGet(DailyAttendance::new);
        daily.setEmployeeId(request.getEmployeeId());
        daily.setWorkDate(request.getTargetDate());
        daily.setStatus(status);
        daily.setCalculationStatus(CalculationStatus.CALCULATED);
        dailyAttendanceRepository.save(daily);
    }

    private void saveAdjustment(AttendanceRequest request, AdjustmentType type, UUID approverEmployeeId) {
        AttendanceAdjustment adjustment = new AttendanceAdjustment();
        adjustment.setEmployeeId(request.getEmployeeId());
        adjustment.setWorkDate(request.getTargetDate());
        adjustment.setAdjustmentType(type);
        adjustment.setReason(request.getReason());
        adjustment.setRequestId(request.getId());
        adjustment.setApprovedBy(approverEmployeeId);
        adjustment.setApprovedAt(systemTimeService.now());
        adjustmentRepository.save(adjustment);
    }
}
