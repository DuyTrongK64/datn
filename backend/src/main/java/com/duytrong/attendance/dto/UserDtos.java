package com.duytrong.attendance.dto;

import com.duytrong.attendance.common.enums.UserStatus;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class UserDtos {
    public record UserCreateRequest(String username, String password, String email, String fullName, UUID employeeId, List<String> roles) {}
    public record UserUpdateRequest(String email, String fullName, UUID employeeId, UserStatus status, List<String> roles) {}
    public record UserResponse(UUID id, String username, String email, String fullName, UUID employeeId,
                               String employeeCode, String employeeName, UserStatus status,
                               Integer failedLoginCount, LocalDateTime lockedUntil, LocalDateTime lastLoginAt, List<String> roles) {}
}
