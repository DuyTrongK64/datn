package com.duytrong.attendance.dto;

import com.duytrong.attendance.common.enums.AttendanceEventType;
import com.duytrong.attendance.common.enums.DeviceType;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class DeviceDtos {
    public record DeviceCreateRequest(UUID companyId, String deviceCode, String deviceName, DeviceType deviceType,
                                      String location, String ipAddress, String apiKey, boolean active) {}
    public record DeviceResponse(UUID id, UUID companyId, String deviceCode, String deviceName, DeviceType deviceType,
                                 String location, String ipAddress, boolean active, LocalDateTime lastOnlineAt) {}
    public record DeviceEventRequest(String employeeIdentifier, AttendanceEventType eventType, LocalDateTime eventTime, Long sequenceNo) {}
    public record UserPunchRequest(AttendanceEventType eventType) {}
    public record DeviceEventResponse(boolean accepted, String message, UUID eventId, UUID employeeId, String attendanceStatus) {}
    public record PunchHistoryResponse(UUID id, AttendanceEventType eventType, LocalDateTime eventTime, String deviceCode,
                                       String employeeIdentifier, boolean valid, String errorMessage) {}
    public record BatchDeviceEventRequest(List<DeviceEventRequest> events) {}
    public record HeartbeatRequest(String status, String message) {}
}
