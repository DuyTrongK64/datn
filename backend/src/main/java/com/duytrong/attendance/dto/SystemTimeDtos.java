package com.duytrong.attendance.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public class SystemTimeDtos {
    public record SystemTimeResponse(UUID id,
                                     boolean useCustomTime,
                                     LocalDateTime customDateTime,
                                     LocalDateTime realNow,
                                     LocalDateTime effectiveNow,
                                     LocalDate effectiveDate,
                                     String note) {}

    public record UpdateSystemTimeRequest(boolean useCustomTime, LocalDateTime customDateTime, String note) {}
}
