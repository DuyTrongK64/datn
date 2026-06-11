package com.duytrong.attendance.dto;

import com.duytrong.attendance.common.enums.EmployeeStatus;
import com.duytrong.attendance.common.enums.UserStatus;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public class EmployeeDtos {
    public record EmployeeUpsertRequest(
            UUID companyId,
            String employeeCode,
            String fullName,
            String email,
            String phone,
            String gender,
            LocalDate dateOfBirth,
            String address,
            UUID departmentId,
            LocalDate hireDate,
            LocalDate leaveDate,
            EmployeeStatus status,
            String role,
            List<String> roles,
            String initialPassword,
            String defaultPassword,
            UserStatus accountStatus
    ) {}

    public record EmployeeResponse(
            UUID id,
            java.time.LocalDateTime createdAt,
            java.time.LocalDateTime updatedAt,
            UUID companyId,
            String employeeCode,
            String fullName,
            String email,
            String phone,
            String gender,
            LocalDate dateOfBirth,
            String address,
            UUID departmentId,
            LocalDate hireDate,
            LocalDate leaveDate,
            EmployeeStatus status,
            UUID userId,
            String username,
            UserStatus accountStatus,
            Boolean hasAccount,
            String role,
            List<String> roles
    ) {}
}
