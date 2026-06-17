package com.duytrong.attendance.service;

import com.duytrong.attendance.common.enums.*;
import com.duytrong.attendance.domain.*;
import com.duytrong.attendance.dto.AttendanceDtos;
import com.duytrong.attendance.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceCalculationService {
    private final AttendanceEventRepository attendanceEventRepository;
    private final DailyAttendanceRepository dailyAttendanceRepository;
    private final AttendanceDetailRepository attendanceDetailRepository;
    private final EmployeeScheduleRepository employeeScheduleRepository;
    private final ShiftRepository shiftRepository;
    private final EmployeeContractRepository employeeContractRepository;
    private final ContractTypeRepository contractTypeRepository;
    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final HolidayRepository holidayRepository;
    private final AttendanceRequestRepository requestRepository;
    private final RequestTypeRepository requestTypeRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;
    private final LeaveTypeRepository leaveTypeRepository;
    private final SystemTimeService systemTimeService;

    @Transactional
    public DailyAttendance recalculate(UUID employeeId, LocalDate workDate) {
        LocalDateTime from = workDate.atStartOfDay();
        LocalDateTime to = workDate.plusDays(1).atStartOfDay();
        List<AttendanceEvent> events = attendanceEventRepository
                .findByEmployeeIdAndEventTimeBetweenAndValidTrueOrderByEventTimeAsc(employeeId, from, to);

        DailyAttendance daily = dailyAttendanceRepository.findByEmployeeIdAndWorkDate(employeeId, workDate)
                .orElseGet(DailyAttendance::new);
        daily.setEmployeeId(employeeId);
        daily.setWorkDate(workDate);

        Optional<EmployeeSchedule> scheduleOpt = employeeScheduleRepository.findByEmployeeIdAndWorkDate(employeeId, workDate);
        if (scheduleOpt.isPresent()) {
            daily.setScheduleId(scheduleOpt.get().getId());
        }

        Shift shift = resolveShift(employeeId, workDate, scheduleOpt).orElse(null);
        applyPlannedShift(daily, shift);

        LocalDateTime firstIn = first(events, AttendanceEventType.CHECK_IN);
        LocalDateTime lastOut = last(events, AttendanceEventType.CHECK_OUT);
        LocalDateTime firstBreakIn = first(events, AttendanceEventType.BREAK_IN);
        LocalDateTime lastBreakOut = last(events, AttendanceEventType.BREAK_OUT);
        boolean dayOff = isDayOff(workDate);

        daily.setFirstCheckIn(firstIn);
        daily.setLastCheckOut(lastOut);
        daily.setFirstBreakIn(firstBreakIn);
        daily.setLastBreakOut(lastBreakOut);
        daily.setBreakMinutes(calculateBreakMinutes(events, shift));

        if (firstIn == null && lastOut == null) {
            daily.setTotalWorkingMinutes(0);
            daily.setLateMinutes(0);
            daily.setEarlyLeaveMinutes(0);
            daily.setOvertimeMinutes(0);
            daily.setStatus(dayOff ? AttendanceStatus.HOLIDAY : AttendanceStatus.ABSENT);
            daily.setCalculationStatus(dayOff ? CalculationStatus.CALCULATED : CalculationStatus.NEED_REVIEW);
        } else if (firstIn == null) {
            daily.setTotalWorkingMinutes(0);
            daily.setLateMinutes(0);
            daily.setEarlyLeaveMinutes(0);
            daily.setOvertimeMinutes(0);
            daily.setStatus(AttendanceStatus.MISSING_CHECK_IN);
            daily.setCalculationStatus(CalculationStatus.NEED_REVIEW);
        } else if (lastOut == null) {
            daily.setTotalWorkingMinutes(0);
            daily.setLateMinutes(0);
            daily.setEarlyLeaveMinutes(0);
            daily.setOvertimeMinutes(0);
            daily.setStatus(AttendanceStatus.MISSING_CHECK_OUT);
            daily.setCalculationStatus(CalculationStatus.NEED_REVIEW);
        } else {
            int worked = Math.max(0, (int) Duration.between(firstIn, lastOut).toMinutes() - daily.getBreakMinutes());
            daily.setTotalWorkingMinutes(worked);
            applyShiftRules(daily, shift, firstIn, lastOut, worked, dayOff);
            daily.setCalculationStatus(CalculationStatus.CALCULATED);
        }

        applyApprovedRequestOverrides(daily, workDate, shift);

        daily = dailyAttendanceRepository.save(daily);
        attendanceDetailRepository.deleteByDailyAttendanceId(daily.getId());
        for (AttendanceEvent event : events) {
            AttendanceDetail detail = new AttendanceDetail();
            detail.setDailyAttendanceId(daily.getId());
            detail.setEventType(event.getEventType());
            detail.setEventTime(event.getEventTime());
            detail.setSourceType(event.getDeviceId() == null ? SourceType.REQUEST : SourceType.DEVICE);
            detail.setDeviceEventId(event.getId());
            attendanceDetailRepository.save(detail);
        }
        return daily;
    }

    @Transactional
    public List<DailyAttendance> recalculateAllForDate(LocalDate workDate) {
        return employeeRepository.findAll().stream()
                .map(employee -> recalculate(employee.getId(), workDate))
                .toList();
    }

    @Transactional
    public List<DailyAttendance> recalculateRange(LocalDate from, LocalDate to, UUID employeeId, UUID teamId) {
        List<Employee> employees = resolveEmployees(employeeId, teamId);
        List<DailyAttendance> result = new ArrayList<>();
        LocalDate date = from;
        while (!date.isAfter(to)) {
            for (Employee employee : employees) {
                result.add(recalculate(employee.getId(), date));
            }
            date = date.plusDays(1);
        }
        return result;
    }

    @Scheduled(cron = "0 0 2 * * *", zone = "Asia/Bangkok")
    @Transactional
    public void scheduledDailyRecalculate() {
        recalculateAllForDate(systemTimeService.today().minusDays(1));
    }

    public List<AttendanceDtos.AttendanceResponse> buildEmployeeCalendar(UUID employeeId, LocalDate from, LocalDate to) {
        Map<LocalDate, DailyAttendance> existing = dailyAttendanceRepository.findByEmployeeIdAndWorkDateBetween(employeeId, from, to).stream()
                .collect(Collectors.toMap(DailyAttendance::getWorkDate, Function.identity(), (oldValue, newValue) -> oldValue));
        List<DailyAttendance> rows = new ArrayList<>();
        LocalDate date = from;
        while (!date.isAfter(to)) {
            DailyAttendance row = existing.get(date);
            if (row == null) {
                row = new DailyAttendance();
                row.setEmployeeId(employeeId);
                row.setWorkDate(date);
                Optional<EmployeeSchedule> scheduleOpt = employeeScheduleRepository.findByEmployeeIdAndWorkDate(employeeId, date);

                if (scheduleOpt.isPresent()) {
                    row.setScheduleId(scheduleOpt.get().getId());
                }
                Shift shift = resolveShift(employeeId, date, scheduleOpt).orElse(null);
                applyPlannedShift(row, shift);
                boolean dayOff = isDayOff(date);
                row.setStatus(dayOff ? AttendanceStatus.HOLIDAY : AttendanceStatus.ABSENT);
                row.setCalculationStatus(dayOff ? CalculationStatus.CALCULATED : CalculationStatus.NOT_CALCULATED);
                applyApprovedRequestOverrides(row, date, shift);
            }
            rows.add(row);
            date = date.plusDays(1);
        }
        return toResponses(rows);
    }

    public List<AttendanceDtos.AttendanceResponse> toResponses(List<DailyAttendance> rows) {
        Map<UUID, Employee> employeeMap = employeeRepository.findAllById(rows.stream().map(DailyAttendance::getEmployeeId).filter(Objects::nonNull).toList())
                .stream().collect(Collectors.toMap(Employee::getId, Function.identity()));
        Map<UUID, Department> departmentMap = departmentRepository.findAll().stream().collect(Collectors.toMap(Department::getId, Function.identity()));
        Map<UUID, Shift> shiftMap = shiftRepository.findAllById(rows.stream().map(DailyAttendance::getShiftId).filter(Objects::nonNull).toList())
                .stream().collect(Collectors.toMap(Shift::getId, Function.identity()));
        Map<UUID, Team> teamMap = teamRepository.findAll().stream().collect(Collectors.toMap(Team::getId, Function.identity()));
        Map<UUID, UUID> employeeTeamMap = teamMemberRepository.findAll().stream()
                .collect(Collectors.toMap(TeamMember::getEmployeeId, TeamMember::getTeamId, (oldValue, newValue) -> oldValue));
        Map<LocalDate, Holiday> holidayMap = holidayRepository.findByHolidayDateBetweenOrderByHolidayDateAsc(
                        rows.stream().map(DailyAttendance::getWorkDate).min(LocalDate::compareTo).orElse(systemTimeService.today()),
                        rows.stream().map(DailyAttendance::getWorkDate).max(LocalDate::compareTo).orElse(systemTimeService.today()))
                .stream().collect(Collectors.toMap(Holiday::getHolidayDate, Function.identity(), (oldValue, newValue) -> oldValue));

        return rows.stream().map(row -> {
            Employee employee = employeeMap.get(row.getEmployeeId());
            Department department = employee == null ? null : departmentMap.get(employee.getDepartmentId());
            UUID teamId = employeeTeamMap.get(row.getEmployeeId());
            Team team = teamId == null ? null : teamMap.get(teamId);
            Shift shift = row.getShiftId() == null ? null : shiftMap.get(row.getShiftId());
            Holiday holiday = holidayMap.get(row.getWorkDate());
            boolean weekend = isWeekend(row.getWorkDate());
            String dayType = holiday != null ? "HOLIDAY" : (weekend ? "WEEKEND" : "WORKDAY");
            boolean dayOff = weekend || holiday != null;
            int displayLateMinutes = dayOff ? 0 : safe(row.getLateMinutes());
            int displayEarlyMinutes = dayOff ? 0 : safe(row.getEarlyLeaveMinutes());
            return new AttendanceDtos.AttendanceResponse(
                    row.getId(),
                    row.getEmployeeId(),
                    employee == null ? null : employee.getEmployeeCode(),
                    employee == null ? null : employee.getFullName(),
                    employee == null ? null : employee.getDepartmentId(),
                    department == null ? null : department.getCode(),
                    department == null ? null : department.getName(),
                    teamId,
                    team == null ? null : team.getCode(),
                    team == null ? null : team.getName(),
                    row.getShiftId(),
                    shift == null ? null : shift.getCode(),
                    shift == null ? null : shift.getName(),
                    row.getWorkDate(),
                    row.getPlannedStartTime(),
                    row.getPlannedEndTime(),
                    row.getPlannedLunchStartTime(),
                    row.getPlannedLunchEndTime(),
                    row.getPlannedWorkingMinutes(),
                    row.getFirstCheckIn(),
                    row.getLastCheckOut(),
                    row.getFirstBreakIn(),
                    row.getLastBreakOut(),
                    row.getTotalWorkingMinutes(),
                    row.getBreakMinutes(),
                    displayLateMinutes,
                    displayEarlyMinutes,
                    row.getOvertimeMinutes(),
                    row.getApprovedLeaveMinutes(),
                    row.getApprovedRequestTypes(),
                    row.getStatus(),
                    row.getCalculationStatus(),
                    weekend,
                    holiday != null,
                    holiday == null ? null : holiday.getName(),
                    dayType
            );
        }).toList();
    }

    public List<AttendanceDtos.AttendanceSummaryResponse> summarize(LocalDate from, LocalDate to, UUID employeeId, UUID teamId) {
        List<Employee> employees = resolveEmployees(employeeId, teamId);
        Map<UUID, List<DailyAttendance>> rowsByEmployee = new HashMap<>();
        for (Employee employee : employees) {
            rowsByEmployee.put(employee.getId(), dailyAttendanceRepository.findByEmployeeIdAndWorkDateBetween(employee.getId(), from, to));
        }
        Map<UUID, Department> departmentMap = departmentRepository.findAll().stream().collect(Collectors.toMap(Department::getId, Function.identity()));
        Map<UUID, Team> teamMap = teamRepository.findAll().stream().collect(Collectors.toMap(Team::getId, Function.identity()));
        Map<UUID, UUID> employeeTeamMap = teamMemberRepository.findAll().stream()
                .collect(Collectors.toMap(TeamMember::getEmployeeId, TeamMember::getTeamId, (oldValue, newValue) -> oldValue));

        return employees.stream().map(employee -> {
            List<DailyAttendance> rows = rowsByEmployee.getOrDefault(employee.getId(), List.of());
            UUID teamOfEmployeeId = employeeTeamMap.get(employee.getId());
            Team team = teamOfEmployeeId == null ? null : teamMap.get(teamOfEmployeeId);
            Department department = departmentMap.get(employee.getDepartmentId());
            int actualWorkingDays = (int) rows.stream().filter(row -> safe(row.getTotalWorkingMinutes()) > 0).count();
            int dayOffCount = countDayOff(from, to);
            int absentDays = (int) rows.stream().filter(row -> row.getStatus() == AttendanceStatus.ABSENT && !isDayOff(row.getWorkDate())).count();
            int lateDays = (int) rows.stream().filter(row -> !isDayOff(row.getWorkDate()) && safe(row.getLateMinutes()) > 0).count();
            int earlyDays = (int) rows.stream().filter(row -> !isDayOff(row.getWorkDate()) && safe(row.getEarlyLeaveMinutes()) > 0).count();
            int missingDays = (int) rows.stream().filter(row -> !isDayOff(row.getWorkDate()) && (row.getStatus() == AttendanceStatus.MISSING_CHECK_IN || row.getStatus() == AttendanceStatus.MISSING_CHECK_OUT)).count();
            int totalWorkingMinutes = rows.stream().mapToInt(row -> safe(row.getTotalWorkingMinutes())).sum();
            int totalOvertimeMinutes = rows.stream().mapToInt(row -> safe(row.getOvertimeMinutes())).sum();
            int totalLateMinutes = rows.stream().filter(row -> !isDayOff(row.getWorkDate())).mapToInt(row -> safe(row.getLateMinutes())).sum();
            int totalEarlyMinutes = rows.stream().filter(row -> !isDayOff(row.getWorkDate())).mapToInt(row -> safe(row.getEarlyLeaveMinutes())).sum();
            LeaveBalance annualBalance = findAnnualLeaveBalance(employee.getId(), from.getYear()).orElse(null);
            return new AttendanceDtos.AttendanceSummaryResponse(
                    employee.getId(),
                    employee.getEmployeeCode(),
                    employee.getFullName(),
                    employee.getDepartmentId(),
                    department == null ? null : department.getCode(),
                    department == null ? null : department.getName(),
                    teamOfEmployeeId,
                    team == null ? null : team.getCode(),
                    team == null ? null : team.getName(),
                    from,
                    to,
                    Math.max(0, numberOfDays(from, to) - dayOffCount),
                    actualWorkingDays,
                    dayOffCount,
                    absentDays,
                    lateDays,
                    earlyDays,
                    missingDays,
                    totalWorkingMinutes,
                    totalOvertimeMinutes,
                    totalLateMinutes,
                    totalEarlyMinutes,
                    annualBalance == null ? 0.0 : annualBalance.getUsedDays(),
                    annualBalance == null ? 0.0 : annualBalance.getRemainingDays()
            );
        }).toList();
    }


    private void applyApprovedRequestOverrides(DailyAttendance daily, LocalDate workDate, Shift shift) {
        if (daily.getEmployeeId() == null) return;
        List<AttendanceRequest> approvedRequests = requestRepository.findEffectiveRequests(daily.getEmployeeId(), RequestStatus.APPROVED, workDate);
        if (approvedRequests.isEmpty()) {
            daily.setApprovedLeaveMinutes(0);
            daily.setApprovedRequestTypes(null);
            return;
        }

        Map<UUID, RequestType> typeMap = requestTypeRepository.findAllById(
                        approvedRequests.stream().map(AttendanceRequest::getRequestTypeId).filter(Objects::nonNull).toList())
                .stream().collect(Collectors.toMap(RequestType::getId, Function.identity()));

        int approvedMinutes = 0;
        List<String> labels = new ArrayList<>();
        boolean fullDayLeave = false;
        boolean remote = false;
        for (AttendanceRequest request : approvedRequests) {
            RequestType type = typeMap.get(request.getRequestTypeId());
            String code = type == null ? "" : type.getCode();
            String name = type == null ? code : type.getName();
            if (name != null && !name.isBlank()) labels.add(name);

            if ("LEAVE_REQUEST".equals(code)) {
                fullDayLeave = true;
                approvedMinutes += resolveStandardDayMinutes(shift);
            } else if ("REMOTE_WORK".equals(code)) {
                remote = true;
            } else if (isLeaveDeductiblePartialRequest(code)) {
                approvedMinutes += calculateRequestMinutes(request, shift);
            }
        }

        daily.setApprovedLeaveMinutes(approvedMinutes);
        daily.setApprovedRequestTypes(labels.stream().distinct().collect(Collectors.joining(", ")));

        if (fullDayLeave) {
            daily.setStatus(AttendanceStatus.ON_LEAVE);
            daily.setLateMinutes(0);
            daily.setEarlyLeaveMinutes(0);
            daily.setOvertimeMinutes(0);
            daily.setCalculationStatus(CalculationStatus.CALCULATED);
            return;
        }
        if (remote && daily.getStatus() == AttendanceStatus.ABSENT) {
            daily.setStatus(AttendanceStatus.REMOTE);
            daily.setCalculationStatus(CalculationStatus.CALCULATED);
        }

        if (approvedMinutes > 0) {
            int late = safe(daily.getLateMinutes());
            int early = safe(daily.getEarlyLeaveMinutes());
            int remainingApproved = approvedMinutes;
            int lateCovered = Math.min(late, remainingApproved);
            late -= lateCovered;
            remainingApproved -= lateCovered;
            int earlyCovered = Math.min(early, remainingApproved);
            early -= earlyCovered;
            daily.setLateMinutes(late);
            daily.setEarlyLeaveMinutes(early);
            if (late == 0 && early == 0 && daily.getStatus() != AttendanceStatus.ABSENT && daily.getStatus() != AttendanceStatus.MISSING_CHECK_IN && daily.getStatus() != AttendanceStatus.MISSING_CHECK_OUT) {
                daily.setStatus(AttendanceStatus.NORMAL);
            }
        }
    }

    private boolean isLeaveDeductiblePartialRequest(String code) {
        return "LATE_ARRIVAL".equals(code)
                || "EARLY_LEAVE_REQUEST".equals(code)
                || "OUTSIDE_REQUEST".equals(code)
                || "TIME_OFF".equals(code);
    }

    private int calculateRequestMinutes(AttendanceRequest request, Shift shift) {
        if (request.getStartTime() == null || request.getEndTime() == null) {
            return 0;
        }
        LocalDate baseDate = request.getTargetDate() == null ? systemTimeService.today() : request.getTargetDate();
        LocalDateTime start = baseDate.atTime(request.getStartTime());
        LocalDateTime end = baseDate.atTime(request.getEndTime());
        if (end.isBefore(start)) end = end.plusDays(1);
        return Math.max(0, (int) Duration.between(start, end).toMinutes());
    }

    private int resolveStandardDayMinutes(Shift shift) {
        if (shift != null && shift.resolveWorkingMinutes() > 0) return shift.resolveWorkingMinutes();
        return 480;
    }

    private Optional<LeaveBalance> findAnnualLeaveBalance(UUID employeeId, int year) {
        Optional<LeaveType> annualLeave = leaveTypeRepository.findByCode("ANNUAL_LEAVE");
        if (annualLeave.isEmpty()) return Optional.empty();
        return leaveBalanceRepository.findByEmployeeId(employeeId).stream()
                .filter(balance -> annualLeave.get().getId().equals(balance.getLeaveTypeId()))
                .filter(balance -> Integer.valueOf(year).equals(balance.getYear()))
                .findFirst();
    }

    private Optional<Shift> resolveShift(UUID employeeId, LocalDate workDate, Optional<EmployeeSchedule> scheduleOpt) {
        if (scheduleOpt.isPresent() && scheduleOpt.get().getShiftId() != null) {
            return shiftRepository.findById(scheduleOpt.get().getShiftId());
        }
        Optional<EmployeeContract> activeNoEndDate = employeeContractRepository
                .findFirstByEmployeeIdAndStatusAndStartDateLessThanEqualAndEndDateIsNullOrderByStartDateDesc(employeeId, ContractStatus.ACTIVE, workDate);
        Optional<EmployeeContract> activeWithEndDate = employeeContractRepository
                .findFirstByEmployeeIdAndStatusAndStartDateLessThanEqualAndEndDateGreaterThanEqualOrderByStartDateDesc(employeeId, ContractStatus.ACTIVE, workDate, workDate);
        Optional<EmployeeContract> contract = activeNoEndDate.or(() -> activeWithEndDate);
        if (contract.isEmpty()) {
            contract = employeeContractRepository.findByEmployeeId(employeeId).stream()
                    .filter(c -> c.getStatus() == ContractStatus.ACTIVE)
                    .filter(c -> c.getStartDate() == null || !c.getStartDate().isAfter(workDate))
                    .filter(c -> c.getEndDate() == null || !c.getEndDate().isBefore(workDate))
                    .findFirst();
        }
        if (contract.isEmpty()) return Optional.empty();
        return contractTypeRepository.findById(contract.get().getContractTypeId())
                .flatMap(type -> type.getDefaultShiftId() == null ? Optional.empty() : shiftRepository.findById(type.getDefaultShiftId()));
    }

    private void applyPlannedShift(DailyAttendance daily, Shift shift) {
        if (shift == null || shift.getStartTime() == null || shift.getEndTime() == null) {
            daily.setShiftId(null);
            daily.setPlannedStartTime(null);
            daily.setPlannedEndTime(null);
            daily.setPlannedLunchStartTime(null);
            daily.setPlannedLunchEndTime(null);
            daily.setPlannedWorkingMinutes(0);
            return;
        }
        daily.setShiftId(shift.getId());
        LocalDateTime start = daily.getWorkDate().atTime(shift.getStartTime());
        LocalDateTime end = daily.getWorkDate().atTime(shift.getEndTime());
        if (shift.isCrossDay() || end.isBefore(start)) end = end.plusDays(1);
        daily.setPlannedStartTime(start);
        daily.setPlannedEndTime(end);
        if (shift.getLunchStartTime() != null) {
            daily.setPlannedLunchStartTime(daily.getWorkDate().atTime(shift.getLunchStartTime()));
        }
        if (shift.getLunchEndTime() != null) {
            LocalDateTime lunchEnd = daily.getWorkDate().atTime(shift.getLunchEndTime());
            if (shift.getLunchStartTime() != null && lunchEnd.isBefore(daily.getWorkDate().atTime(shift.getLunchStartTime()))) {
                lunchEnd = lunchEnd.plusDays(1);
            }
            daily.setPlannedLunchEndTime(lunchEnd);
        }
        daily.setPlannedWorkingMinutes(shift.resolveWorkingMinutes());
    }

    private LocalDateTime first(List<AttendanceEvent> events, AttendanceEventType type) {
        return events.stream().filter(e -> e.getEventType() == type).map(AttendanceEvent::getEventTime).findFirst().orElse(null);
    }

    private LocalDateTime last(List<AttendanceEvent> events, AttendanceEventType type) {
        return events.stream().filter(e -> e.getEventType() == type).map(AttendanceEvent::getEventTime).reduce((first, second) -> second).orElse(null);
    }

    private int calculateBreakMinutes(List<AttendanceEvent> events, Shift shift) {
        int total = 0;
        LocalDateTime breakOut = null;
        for (AttendanceEvent event : events) {
            if (event.getEventType() == AttendanceEventType.BREAK_OUT) {
                breakOut = event.getEventTime();
            } else if (event.getEventType() == AttendanceEventType.BREAK_IN && breakOut != null) {
                total += Math.max(0, (int) Duration.between(breakOut, event.getEventTime()).toMinutes());
                breakOut = null;
            }
        }
        if (total == 0 && shift != null) return shift.resolveLunchBreakMinutes();
        return total;
    }

    private void applyShiftRules(DailyAttendance daily, Shift shift, LocalDateTime firstIn, LocalDateTime lastOut, int worked, boolean dayOff) {
        if (dayOff) {
            daily.setLateMinutes(0);
            daily.setEarlyLeaveMinutes(0);
            daily.setOvertimeMinutes(worked);
            daily.setStatus(AttendanceStatus.HOLIDAY);
            return;
        }

        int late = 0;
        int early = 0;
        int overtime = 0;
        AttendanceStatus status = AttendanceStatus.NORMAL;

        if (shift != null && daily.getPlannedStartTime() != null && daily.getPlannedEndTime() != null) {
            LocalDateTime standardStart = daily.getPlannedStartTime();
            LocalDateTime standardEnd = daily.getPlannedEndTime();
            int lateTolerance = shift.getLateToleranceMinutes() == null ? 0 : shift.getLateToleranceMinutes();
            int earlyTolerance = shift.getEarlyLeaveToleranceMinutes() == null ? 0 : shift.getEarlyLeaveToleranceMinutes();
            late = Math.max(0, (int) Duration.between(standardStart, firstIn).toMinutes() - lateTolerance);
            early = Math.max(0, (int) Duration.between(lastOut, standardEnd).toMinutes() - earlyTolerance);
            overtime = Math.max(0, worked - shift.resolveWorkingMinutes());
        }
        if (late > 0) status = AttendanceStatus.LATE;
        if (early > 0) status = status == AttendanceStatus.LATE ? AttendanceStatus.LATE : AttendanceStatus.EARLY_LEAVE;
        daily.setLateMinutes(late);
        daily.setEarlyLeaveMinutes(early);
        daily.setOvertimeMinutes(overtime);
        daily.setStatus(status);
    }

    private List<Employee> resolveEmployees(UUID employeeId, UUID teamId) {
        if (employeeId != null) {
            return employeeRepository.findById(employeeId).map(employee -> List.of(employee)).orElseGet(List::of);
        }
        if (teamId != null) {
            List<UUID> employeeIds = teamMemberRepository.findByTeamId(teamId).stream().map(TeamMember::getEmployeeId).toList();
            return employeeRepository.findAllById(employeeIds);
        }
        return employeeRepository.findAll();
    }

    private boolean isDayOff(LocalDate date) {
        return isWeekend(date) || holidayRepository.findFirstByHolidayDate(date).isPresent();
    }

    private boolean isWeekend(LocalDate date) {
        return date.getDayOfWeek() == DayOfWeek.SATURDAY || date.getDayOfWeek() == DayOfWeek.SUNDAY;
    }

    private int countDayOff(LocalDate from, LocalDate to) {
        int count = 0;
        LocalDate date = from;
        while (!date.isAfter(to)) {
            if (isDayOff(date)) count++;
            date = date.plusDays(1);
        }
        return count;
    }

    private int numberOfDays(LocalDate from, LocalDate to) {
        return (int) Duration.between(from.atStartOfDay(), to.plusDays(1).atStartOfDay()).toDays();
    }

    private int safe(Integer value) {
        return value == null ? 0 : value;
    }
}
