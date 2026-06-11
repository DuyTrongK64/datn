package com.duytrong.attendance.dto;

import com.duytrong.attendance.common.enums.AttendanceStatus;
import com.duytrong.attendance.common.enums.CalculationStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public class AttendanceDtos {
    public record AttendanceResponse(
            UUID id,
            UUID employeeId,
            String employeeCode,
            String employeeName,
            UUID departmentId,
            String departmentCode,
            String departmentName,
            UUID teamId,
            String teamCode,
            String teamName,
            UUID shiftId,
            String shiftCode,
            String shiftName,
            LocalDate workDate,
            LocalDateTime plannedStartTime,
            LocalDateTime plannedEndTime,
            LocalDateTime plannedLunchStartTime,
            LocalDateTime plannedLunchEndTime,
            Integer plannedWorkingMinutes,
            LocalDateTime firstCheckIn,
            LocalDateTime lastCheckOut,
            LocalDateTime firstBreakIn,
            LocalDateTime lastBreakOut,
            Integer totalWorkingMinutes,
            Integer breakMinutes,
            Integer lateMinutes,
            Integer earlyLeaveMinutes,
            Integer overtimeMinutes,
            Integer approvedLeaveMinutes,
            String approvedRequestTypes,
            AttendanceStatus status,
            CalculationStatus calculationStatus,
            Boolean weekend,
            Boolean holiday,
            String holidayName,
            String dayType
    ) {}

    public record AttendanceSummaryResponse(
            UUID employeeId,
            String employeeCode,
            String employeeName,
            UUID departmentId,
            String departmentCode,
            String departmentName,
            UUID teamId,
            String teamCode,
            String teamName,
            LocalDate from,
            LocalDate to,
            Integer workingDays,
            Integer actualWorkingDays,
            Integer dayOffCount,
            Integer absentDays,
            Integer lateDays,
            Integer earlyLeaveDays,
            Integer missingCheckDays,
            Integer totalWorkingMinutes,
            Integer totalOvertimeMinutes,
            Integer totalLateMinutes,
            Integer totalEarlyLeaveMinutes,
            Double leaveUsedDays,
            Double leaveRemainingDays
    ) {}

    public record RecalculateRangeRequest(LocalDate from, LocalDate to, UUID employeeId, UUID teamId) {}
}
