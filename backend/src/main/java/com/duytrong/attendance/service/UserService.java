package com.duytrong.attendance.service;

import com.duytrong.attendance.common.BusinessException;
import com.duytrong.attendance.common.enums.UserStatus;
import com.duytrong.attendance.domain.AppUser;
import com.duytrong.attendance.domain.Role;
import com.duytrong.attendance.domain.UserRole;
import com.duytrong.attendance.dto.UserDtos;
import com.duytrong.attendance.repository.AppUserRepository;
import com.duytrong.attendance.repository.EmployeeRepository;
import com.duytrong.attendance.repository.RoleRepository;
import com.duytrong.attendance.repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AppUserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmployeeRepository employeeRepository;

    public List<UserDtos.UserResponse> list() {
        return userRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional
    public UserDtos.UserResponse create(UserDtos.UserCreateRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new BusinessException("Username đã tồn tại");
        }
        AppUser user = new AppUser();
        user.setUsername(request.username());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setEmail(request.email());
        user.setFullName(request.fullName());
        user.setEmployeeId(request.employeeId());
        user.setStatus(UserStatus.ACTIVE);
        user = userRepository.save(user);
        updateRoles(user.getId(), request.roles());
        return toResponse(user);
    }

    @Transactional
    public UserDtos.UserResponse update(UUID id, UserDtos.UserUpdateRequest request) {
        AppUser user = userRepository.findById(id).orElseThrow(() -> new BusinessException("Không tìm thấy user"));
        user.setEmail(request.email());
        user.setFullName(request.fullName());
        user.setEmployeeId(request.employeeId());
        if (request.status() != null) user.setStatus(request.status());
        user = userRepository.save(user);
        if (request.roles() != null) updateRoles(user.getId(), request.roles());
        return toResponse(user);
    }

    @Transactional
    public void resetPassword(UUID id, String newPassword) {
        AppUser user = userRepository.findById(id).orElseThrow(() -> new BusinessException("Không tìm thấy user"));
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    private void updateRoles(UUID userId, List<String> roleCodes) {
        userRoleRepository.deleteByUserId(userId);
        if (roleCodes == null || roleCodes.isEmpty()) return;
        List<Role> roles = roleRepository.findByCodeIn(roleCodes);
        for (Role role : roles) {
            UserRole userRole = new UserRole();
            userRole.setUserId(userId);
            userRole.setRoleId(role.getId());
            userRoleRepository.save(userRole);
        }
    }

    private UserDtos.UserResponse toResponse(AppUser user) {
        List<UserRole> userRoles = userRoleRepository.findByUserId(user.getId());
        Map<UUID, Role> roles = roleRepository.findAllById(userRoles.stream().map(UserRole::getRoleId).toList())
                .stream().collect(Collectors.toMap(Role::getId, r -> r));
        List<String> roleCodes = userRoles.stream()
                .map(UserRole::getRoleId)
                .map(roles::get)
                .filter(role -> role != null)
                .map(Role::getCode)
                .toList();
        String employeeCode = null;
        String employeeName = null;
        if (user.getEmployeeId() != null) {
            var employee = employeeRepository.findById(user.getEmployeeId()).orElse(null);
            if (employee != null) {
                employeeCode = employee.getEmployeeCode();
                employeeName = employee.getFullName();
            }
        }
        return new UserDtos.UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getFullName(), user.getEmployeeId(),
                employeeCode, employeeName, user.getStatus(), user.getFailedLoginCount(), user.getLockedUntil(), user.getLastLoginAt(), roleCodes);
    }
}
