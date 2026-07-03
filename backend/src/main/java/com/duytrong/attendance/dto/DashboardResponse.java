package com.duytrong.attendance.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record DashboardResponse(
        long totalEmployees,
        long checkedInToday,
        long lateToday,
        long absentToday,
        long pendingRequests,
        long totalDevices,
        long onlineDevices,
        String roleDashboard,
        String scopeLabel,
        String today,
        PersonalCard personal,
        AttendanceToday todayAttendance,
        LeaveCard leaveBalance,
        List<TeamCard> teams,
        List<EmployeeCard> employees,
        List<RequestCard> recentRequests
) {
    public record PersonalCard(
            UUID employeeId,
            String employeeCode,
            String employeeName,
            String departmentName,
            List<String> teamNames
    ) {}

    public record AttendanceToday(
            UUID id,
            UUID employeeId,
            LocalDate workDate,
            LocalDateTime plannedStartTime,
            LocalDateTime plannedEndTime,
            LocalDateTime firstCheckIn,
            LocalDateTime lastCheckOut,
            Integer totalWorkingMinutes,
            Integer lateMinutes,
            Integer earlyLeaveMinutes,
            Integer overtimeMinutes,
            String status
    ) {}

    public record LeaveCard(
            Double totalDays,
            Double usedDays,
            Double remainingDays
    ) {}

    public record TeamCard(
            UUID teamId,
            String teamCode,
            String teamName,
            long memberCount,
            long checkedInToday,
            long lateToday,
            long absentToday,
            long pendingRequests
    ) {}

    public record EmployeeCard(
            UUID employeeId,
            String employeeCode,
            String employeeName,
            String email,
            String phone,
            String departmentName,
            String teamName,
            String todayStatus
    ) {}

    public record RequestCard(
            UUID id,
            UUID employeeId,
            String employeeCode,
            String employeeName,
            String requestTypeCode,
            String requestTypeName,
            LocalDate targetDate,
            LocalDate endDate,
            String status,
            String reason,
            LocalDateTime createdAt
    ) {}
}
