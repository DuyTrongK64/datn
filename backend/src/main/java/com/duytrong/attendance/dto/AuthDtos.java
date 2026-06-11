package com.duytrong.attendance.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public class AuthDtos {
    public record LoginRequest(String username, String password) {}
    public record RefreshTokenRequest(String refreshToken) {}
    public record LoginResponse(String accessToken, String refreshToken, UserProfile user) {}
    public record TeamInfo(UUID id, String code, String name) {}
    public record UserProfile(
            UUID id,
            String username,
            String email,
            String fullName,
            UUID employeeId,
            String employeeCode,
            String employeeName,
            String phone,
            String gender,
            LocalDate dateOfBirth,
            String address,
            UUID departmentId,
            String departmentCode,
            String departmentName,
            List<TeamInfo> teams,
            List<String> roles
    ) {}
    public record UpdateProfileRequest(
            String fullName,
            String email,
            String phone,
            String gender,
            LocalDate dateOfBirth,
            String address
    ) {}
    public record ChangePasswordRequest(String currentPassword, String newPassword, String confirmPassword) {}
}
