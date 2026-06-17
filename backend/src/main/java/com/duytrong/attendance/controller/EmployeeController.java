package com.duytrong.attendance.controller;

import com.duytrong.attendance.common.BusinessException;
import com.duytrong.attendance.common.enums.EmployeeStatus;
import com.duytrong.attendance.common.enums.UserStatus;
import com.duytrong.attendance.domain.*;
import com.duytrong.attendance.dto.EmployeeDtos;
import com.duytrong.attendance.repository.*;
import com.duytrong.attendance.service.AccessControlService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/employees")
@PreAuthorize("hasAnyRole('ADMIN','LEADER')")
public class EmployeeController {
    private final EmployeeRepository employeeRepository;
    private final CompanyRepository companyRepository;
    private final LeaveTypeRepository leaveTypeRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;
    private final AppUserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AccessControlService accessControlService;

    public EmployeeController(EmployeeRepository employeeRepository,
                              CompanyRepository companyRepository,
                              LeaveTypeRepository leaveTypeRepository,
                              LeaveBalanceRepository leaveBalanceRepository,
                              AppUserRepository userRepository,
                              RoleRepository roleRepository,
                              UserRoleRepository userRoleRepository,
                              PasswordEncoder passwordEncoder,
                              AccessControlService accessControlService) {
        this.employeeRepository = employeeRepository;
        this.companyRepository = companyRepository;
        this.leaveTypeRepository = leaveTypeRepository;
        this.leaveBalanceRepository = leaveBalanceRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
        this.passwordEncoder = passwordEncoder;
        this.accessControlService = accessControlService;
    }

    @GetMapping
    public List<EmployeeDtos.EmployeeResponse> list() {
        return accessControlService.visibleEmployeesForCurrentUser().stream()
                .map(this::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public EmployeeDtos.EmployeeResponse get(@PathVariable UUID id) {
        accessControlService.requireCanViewEmployee(id);
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Không tìm thấy nhân viên"));
        return toResponse(employee);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public EmployeeDtos.EmployeeResponse create(@RequestBody EmployeeDtos.EmployeeUpsertRequest request) {
        String employeeCode = normalizeEmployeeCode(request.employeeCode());
        if (employeeCode == null || employeeCode.isBlank()) {
            throw new BusinessException("Mã nhân viên là bắt buộc");
        }
        if (employeeRepository.findByEmployeeCodeIgnoreCase(employeeCode).isPresent()) {
            throw new BusinessException("Mã nhân viên đã tồn tại");
        }
        if (userRepository.existsByUsernameIgnoreCase(employeeCode)) {
            throw new BusinessException("Mã nhân viên đã được dùng làm tài khoản đăng nhập");
        }

        Employee employee = new Employee();
        applyEmployeeFields(employee, request, employeeCode);
        employee = employeeRepository.save(employee);

        createOrUpdateLoginAccount(employee, request, true);
        createDefaultAnnualLeaveIfMissing(employee);
        return toResponse(employee);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public EmployeeDtos.EmployeeResponse update(@PathVariable UUID id, @RequestBody EmployeeDtos.EmployeeUpsertRequest request) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Không tìm thấy nhân viên"));
        String nextCode = normalizeEmployeeCode(request.employeeCode());
        if (nextCode == null || nextCode.isBlank()) {
            throw new BusinessException("Mã nhân viên là bắt buộc");
        }
        employeeRepository.findByEmployeeCodeIgnoreCase(nextCode)
                .filter(other -> !other.getId().equals(id))
                .ifPresent(other -> {
                    throw new BusinessException("Mã nhân viên đã tồn tại");
                });

        applyEmployeeFields(employee, request, nextCode);
        employee = employeeRepository.save(employee);

        createOrUpdateLoginAccount(employee, request, false);
        createDefaultAnnualLeaveIfMissing(employee);
        return toResponse(employee);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public void delete(@PathVariable UUID id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Không tìm thấy nhân viên"));
        for (AppUser user : userRepository.findByEmployeeId(employee.getId())) {
            userRoleRepository.deleteByUserId(user.getId());
            userRepository.delete(user);
        }
        employeeRepository.delete(employee);
    }

    private void applyEmployeeFields(Employee employee, EmployeeDtos.EmployeeUpsertRequest request, String employeeCode) {
        employee.setCompanyId(request.companyId() != null ? request.companyId() : defaultCompanyId());
        employee.setEmployeeCode(employeeCode);
        employee.setFullName(requiredText(request.fullName(), "Họ tên là bắt buộc"));
        employee.setEmail(trimToNull(request.email()));
        employee.setPhone(trimToNull(request.phone()));
        employee.setGender(trimToNull(request.gender()));
        employee.setDateOfBirth(request.dateOfBirth());
        employee.setAddress(trimToNull(request.address()));
        employee.setDepartmentId(request.departmentId());
        employee.setHireDate(request.hireDate());
        employee.setLeaveDate(request.leaveDate());
        employee.setStatus(request.status() == null ? EmployeeStatus.WORKING : request.status());
    }

    private void createOrUpdateLoginAccount(Employee employee, EmployeeDtos.EmployeeUpsertRequest request, boolean creatingEmployee) {
        List<AppUser> linkedUsers = userRepository.findByEmployeeId(employee.getId());
        Optional<AppUser> userOpt = linkedUsers.stream()
                .filter(item -> employee.getEmployeeCode().equalsIgnoreCase(item.getUsername()))
                .findFirst();

        AppUser user;
        if (userOpt.isPresent()) {
            user = userOpt.get();
        } else if (linkedUsers.size() == 1) {
            user = linkedUsers.getFirst();
        } else {
            user = new AppUser();
        }

        // ✅ Fix 1: copy sang biến final để dùng trong lambda
        // ✅ Fix 2: dùng Objects.equals() tránh NPE
        final AppUser existingUser = user;
        userRepository.findByUsernameIgnoreCase(employee.getEmployeeCode())
                .filter(existing -> !Objects.equals(existing.getId(), existingUser.getId()))
                .ifPresent(existing -> {
                    throw new BusinessException("Mã nhân viên đã được dùng làm tài khoản đăng nhập");
                });

        user.setUsername(employee.getEmployeeCode());
        user.setEmail(employee.getEmail());
        user.setFullName(employee.getFullName());
        user.setEmployeeId(employee.getId());
        user.setStatus(request.accountStatus() == null ? UserStatus.ACTIVE : request.accountStatus());
        if (user.getFailedLoginCount() == null) user.setFailedLoginCount(0);

        String password = firstNonBlank(request.initialPassword(), request.defaultPassword());
        if (user.getId() == null || creatingEmployee || password != null) {
            user.setPasswordHash(passwordEncoder.encode(password == null ? "123456" : password));
        }

        user = userRepository.save(user); // ✅ user vẫn có thể reassign bình thường sau lambda
        updateUserRoles(user.getId(), rolesFromRequest(request));
    }

    private List<String> rolesFromRequest(EmployeeDtos.EmployeeUpsertRequest request) {
        List<String> allowed = List.of("ADMIN", "LEADER", "EMPLOYEE");
        if (request.roles() != null && !request.roles().isEmpty()) {
            List<String> roles = request.roles().stream()
                    .filter(Objects::nonNull)
                    .map(String::trim)
                    .filter(item -> !item.isBlank())
                    .filter(allowed::contains)
                    .distinct()
                    .toList();
            return roles.isEmpty() ? List.of("EMPLOYEE") : roles;
        }
        String role = trimToNull(request.role());
        if (role != null && allowed.contains(role)) return List.of(role);
        return List.of("EMPLOYEE");
    }

    private void updateUserRoles(UUID userId, List<String> roleCodes) {
        userRoleRepository.deleteByUserId(userId);
        List<String> effectiveRoleCodes = roleCodes == null || roleCodes.isEmpty() ? List.of("EMPLOYEE") : roleCodes;
        List<Role> roles = roleRepository.findByCodeIn(effectiveRoleCodes);
        if (roles.isEmpty()) {
            Role employeeRole = roleRepository.findByCode("EMPLOYEE").orElseGet(() -> {
                Role role = new Role();
                role.setCode("EMPLOYEE");
                role.setName("Nhân viên");
                role.setDescription("Nhân viên");
                return roleRepository.save(role);
            });
            roles = List.of(employeeRole);
        }
        for (Role role : roles) {
            UserRole userRole = new UserRole();
            userRole.setUserId(userId);
            userRole.setRoleId(role.getId());
            userRoleRepository.save(userRole);
        }
    }

    private EmployeeDtos.EmployeeResponse toResponse(Employee employee) {
        AppUser user = userRepository.findByEmployeeId(employee.getId()).stream()
                .filter(item -> employee.getEmployeeCode() != null && employee.getEmployeeCode().equalsIgnoreCase(item.getUsername()))
                .findFirst()
                .orElseGet(() -> userRepository.findByEmployeeId(employee.getId()).stream().findFirst().orElse(null));
        List<String> roleCodes = user == null ? List.of() : roleCodes(user.getId());
        String mainRole = roleCodes.isEmpty() ? "EMPLOYEE" : roleCodes.get(0);
        return new EmployeeDtos.EmployeeResponse(
                employee.getId(),
                employee.getCreatedAt(),
                employee.getUpdatedAt(),
                employee.getCompanyId(),
                employee.getEmployeeCode(),
                employee.getFullName(),
                employee.getEmail(),
                employee.getPhone(),
                employee.getGender(),
                employee.getDateOfBirth(),
                employee.getAddress(),
                employee.getDepartmentId(),
                employee.getHireDate(),
                employee.getLeaveDate(),
                employee.getStatus(),
                user == null ? null : user.getId(),
                user == null ? null : user.getUsername(),
                user == null ? null : user.getStatus(),
                user != null,
                mainRole,
                roleCodes
        );
    }

    private List<String> roleCodes(UUID userId) {
        List<UserRole> userRoles = userRoleRepository.findByUserId(userId);
        Map<UUID, Role> roleMap = roleRepository.findAllById(userRoles.stream().map(UserRole::getRoleId).toList())
                .stream()
                .collect(Collectors.toMap(Role::getId, role -> role));
        return userRoles.stream()
                .map(UserRole::getRoleId)
                .map(roleMap::get)
                .filter(Objects::nonNull)
                .map(Role::getCode)
                .toList();
    }

    private void createDefaultAnnualLeaveIfMissing(Employee employee) {
        LeaveType annualLeave = leaveTypeRepository.findByCode("ANNUAL_LEAVE")
                .orElseGet(() -> {
                    LeaveType leaveType = new LeaveType();
                    leaveType.setCode("ANNUAL_LEAVE");
                    leaveType.setName("Nghỉ phép năm");
                    leaveType.setPaid(true);
                    leaveType.setMaxDaysPerYear(12.0);
                    return leaveTypeRepository.save(leaveType);
                });

        int year = LocalDate.now().getYear();
        boolean existed = leaveBalanceRepository.findByEmployeeId(employee.getId()).stream()
                .anyMatch(balance -> annualLeave.getId().equals(balance.getLeaveTypeId()) && Integer.valueOf(year).equals(balance.getYear()));
        if (existed) return;

        LeaveBalance balance = new LeaveBalance();
        balance.setEmployeeId(employee.getId());
        balance.setLeaveTypeId(annualLeave.getId());
        balance.setYear(year);
        balance.setTotalDays(12.0);
        balance.setUsedDays(0.0);
        balance.setRemainingDays(12.0);
        leaveBalanceRepository.save(balance);
    }

    private UUID defaultCompanyId() {
        return companyRepository.findAll().stream()
                .findFirst()
                .map(Company::getId)
                .orElseThrow(() -> new BusinessException("Chưa có công ty mặc định trong hệ thống"));
    }

    private String normalizeEmployeeCode(String value) {
        String code = trimToNull(value);
        return code == null ? null : code.toUpperCase(Locale.ROOT);
    }

    private String requiredText(String value, String message) {
        String result = trimToNull(value);
        if (result == null) throw new BusinessException(message);
        return result;
    }

    private String trimToNull(String value) {
        if (value == null) return null;
        String trimmed = value.trim();
        return trimmed.isBlank() ? null : trimmed;
    }

    private String firstNonBlank(String first, String second) {
        String normalizedFirst = trimToNull(first);
        if (normalizedFirst != null) return normalizedFirst;
        return trimToNull(second);
    }
}
