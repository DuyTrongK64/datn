package com.duytrong.attendance.service;

import com.duytrong.attendance.common.BusinessException;
import com.duytrong.attendance.common.HashUtil;
import com.duytrong.attendance.domain.*;
import com.duytrong.attendance.dto.AuthDtos;
import com.duytrong.attendance.repository.*;
import com.duytrong.attendance.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final AppUserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final LoginHistoryRepository loginHistoryRepository;
    private final UserRoleRepository userRoleRepository;
    private final RoleRepository roleRepository;
    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final TeamRepository teamRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.security.jwt.refresh-token-expiration-days}")
    private long refreshTokenExpirationDays;

    @Value("${app.security.login.max-failed-attempts}")
    private int maxFailedAttempts;

    @Value("${app.security.login.lock-duration-minutes}")
    private int lockDurationMinutes;

    @Transactional
    public AuthDtos.LoginResponse login(AuthDtos.LoginRequest request, HttpServletRequest httpRequest) {
        String loginCode = request.username() == null ? "" : request.username().trim();
        AppUser appUser = userRepository.findByUsernameIgnoreCase(loginCode)
                .orElseThrow(() -> new BadCredentialsException("Sai tài khoản hoặc mật khẩu"));
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginCode, request.password()));
            appUser.setFailedLoginCount(0);
            appUser.setLockedUntil(null);
            appUser.setLastLoginAt(LocalDateTime.now());
            userRepository.save(appUser);
            saveLoginHistory(appUser.getId(), appUser.getUsername(), true, null, httpRequest);
        } catch (AuthenticationException ex) {
            int failed = appUser.getFailedLoginCount() == null ? 1 : appUser.getFailedLoginCount() + 1;
            appUser.setFailedLoginCount(failed);
            if (failed >= maxFailedAttempts) {
                appUser.setLockedUntil(LocalDateTime.now().plusMinutes(lockDurationMinutes));
            }
            userRepository.save(appUser);
            saveLoginHistory(appUser.getId(), loginCode, false, "Sai mật khẩu", httpRequest);
            throw new BusinessException("Sai tài khoản hoặc mật khẩu");
        }

        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername(appUser.getUsername())
                .password(appUser.getPasswordHash())
                .authorities(getRoleCodes(appUser.getId()).stream().map(r -> "ROLE_" + r).toArray(String[]::new))
                .build();
        String accessToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = createRefreshToken(appUser.getId());
        return new AuthDtos.LoginResponse(accessToken, refreshToken, toProfile(appUser));
    }

    @Transactional
    public AuthDtos.LoginResponse refresh(AuthDtos.RefreshTokenRequest request) {
        String hash = HashUtil.sha256(request.refreshToken());
        RefreshToken token = refreshTokenRepository.findByTokenHash(hash)
                .orElseThrow(() -> new BusinessException("Refresh token không hợp lệ"));
        if (token.isRevoked() || token.getExpiredAt().isBefore(LocalDateTime.now())) {
            throw new BusinessException("Refresh token đã hết hạn");
        }
        AppUser user = userRepository.findById(token.getUserId()).orElseThrow();
        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPasswordHash())
                .authorities(getRoleCodes(user.getId()).stream().map(r -> "ROLE_" + r).toArray(String[]::new))
                .build();
        String accessToken = jwtService.generateAccessToken(userDetails);
        return new AuthDtos.LoginResponse(accessToken, request.refreshToken(), toProfile(user));
    }

    public AuthDtos.UserProfile me(String username) {
        AppUser user = userRepository.findByUsernameIgnoreCase(username).orElseThrow();
        return toProfile(user);
    }

    @Transactional
    public AuthDtos.UserProfile updateMe(String username, AuthDtos.UpdateProfileRequest request) {
        AppUser user = userRepository.findByUsernameIgnoreCase(username).orElseThrow();
        if (request.fullName() != null) user.setFullName(request.fullName().trim());
        if (request.email() != null) user.setEmail(request.email().trim());

        if (user.getEmployeeId() != null) {
            employeeRepository.findById(user.getEmployeeId()).ifPresent(employee -> {
                if (request.fullName() != null) employee.setFullName(request.fullName().trim());
                if (request.email() != null) employee.setEmail(request.email().trim());
                if (request.phone() != null) employee.setPhone(request.phone().trim());
                if (request.gender() != null) employee.setGender(request.gender().trim());
                employee.setDateOfBirth(request.dateOfBirth());
                if (request.address() != null) employee.setAddress(request.address().trim());
                employeeRepository.save(employee);
            });
        }

        userRepository.save(user);
        return toProfile(user);
    }

    @Transactional
    public void changePassword(String username, AuthDtos.ChangePasswordRequest request) {
        AppUser user = userRepository.findByUsernameIgnoreCase(username).orElseThrow(() -> new BusinessException("Không tìm thấy tài khoản"));
        if (request.currentPassword() == null || request.currentPassword().isBlank()) {
            throw new BusinessException("Vui lòng nhập mật khẩu hiện tại");
        }
        if (!passwordEncoder.matches(request.currentPassword(), user.getPasswordHash())) {
            throw new BusinessException("Mật khẩu hiện tại không đúng");
        }
        if (request.newPassword() == null || request.newPassword().length() < 6) {
            throw new BusinessException("Mật khẩu mới phải có ít nhất 6 ký tự");
        }
        if (!request.newPassword().equals(request.confirmPassword())) {
            throw new BusinessException("Xác nhận mật khẩu mới không khớp");
        }
        user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
    }

    private String createRefreshToken(UUID userId) {
        String raw = UUID.randomUUID() + "." + UUID.randomUUID();
        RefreshToken token = new RefreshToken();
        token.setUserId(userId);
        token.setTokenHash(HashUtil.sha256(raw));
        token.setExpiredAt(LocalDateTime.now().plusDays(refreshTokenExpirationDays));
        refreshTokenRepository.save(token);
        return raw;
    }

    private void saveLoginHistory(UUID userId, String username, boolean success, String reason, HttpServletRequest request) {
        LoginHistory history = new LoginHistory();
        history.setUserId(userId);
        history.setUsername(username);
        history.setLoginTime(LocalDateTime.now());
        history.setSuccess(success);
        history.setFailureReason(reason);
        history.setIpAddress(request.getRemoteAddr());
        history.setUserAgent(request.getHeader("User-Agent"));
        loginHistoryRepository.save(history);
    }

    private AuthDtos.UserProfile toProfile(AppUser user) {
        String employeeCode = null;
        String employeeName = null;
        String phone = null;
        String gender = null;
        LocalDate dateOfBirth = null;
        String address = null;
        UUID departmentId = null;
        String departmentCode = null;
        String departmentName = null;
        List<AuthDtos.TeamInfo> teams = List.of();

        if (user.getEmployeeId() != null) {
            var employee = employeeRepository.findById(user.getEmployeeId()).orElse(null);
            if (employee != null) {
                employeeCode = employee.getEmployeeCode();
                employeeName = employee.getFullName();
                phone = employee.getPhone();
                gender = employee.getGender();
                dateOfBirth = employee.getDateOfBirth();
                address = employee.getAddress();
                departmentId = employee.getDepartmentId();

                if (departmentId != null) {
                    Department department = departmentRepository.findById(departmentId).orElse(null);
                    if (department != null) {
                        departmentCode = department.getCode();
                        departmentName = department.getName();
                    }
                }

                LocalDate today = LocalDate.now();
                List<TeamMember> memberships = teamMemberRepository.findByEmployeeId(employee.getId()).stream()
                        .filter(member -> member.getLeftDate() == null || !member.getLeftDate().isBefore(today))
                        .toList();
                Map<UUID, Team> teamMap = teamRepository.findAllById(memberships.stream().map(TeamMember::getTeamId).toList())
                        .stream()
                        .collect(Collectors.toMap(Team::getId, team -> team));
                teams = memberships.stream()
                        .map(TeamMember::getTeamId)
                        .map(teamMap::get)
                        .filter(team -> team != null)
                        .map(team -> new AuthDtos.TeamInfo(team.getId(), team.getCode(), team.getName()))
                        .distinct()
                        .toList();
            }
        }
        return new AuthDtos.UserProfile(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                user.getEmployeeId(),
                employeeCode,
                employeeName,
                phone,
                gender,
                dateOfBirth,
                address,
                departmentId,
                departmentCode,
                departmentName,
                teams,
                getRoleCodes(user.getId())
        );
    }

    private List<String> getRoleCodes(UUID userId) {
        List<UserRole> userRoles = userRoleRepository.findByUserId(userId);
        Map<UUID, Role> roleMap = roleRepository.findAllById(userRoles.stream().map(UserRole::getRoleId).toList())
                .stream().collect(Collectors.toMap(Role::getId, r -> r));
        return userRoles.stream()
                .map(UserRole::getRoleId)
                .map(roleMap::get)
                .filter(role -> role != null)
                .map(Role::getCode)
                .toList();
    }
}
