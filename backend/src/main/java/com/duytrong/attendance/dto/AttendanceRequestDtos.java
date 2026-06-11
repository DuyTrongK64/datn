package com.duytrong.attendance.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public class AttendanceRequestDtos {
    public record CreateRequest(UUID employeeId, String requestTypeCode, LocalDate targetDate, LocalDate endDate,
                                LocalTime startTime, LocalTime endTime, String reason) {}
    public record ApprovalRequest(String comment) {}
}
