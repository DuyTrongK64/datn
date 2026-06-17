package com.duytrong.attendance.config;

import com.duytrong.attendance.common.enums.*;
import com.duytrong.attendance.domain.*;
import com.duytrong.attendance.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {
    private static final String COMPANY_CODE = "ITC";
    private static final String DEFAULT_DEVICE_CODE = "DEVICE_001";
    private static final String DEFAULT_DEVICE_API_KEY = "device-secret-001";

    private final PasswordEncoder passwordEncoder;

    @Bean
    @Transactional
    CommandLineRunner initData(RoleRepository roleRepository,
                               AppUserRepository userRepository,
                               UserRoleRepository userRoleRepository,
                               CompanyRepository companyRepository,
                               DepartmentRepository departmentRepository,
                               TeamRepository teamRepository,
                               TeamMemberRepository teamMemberRepository,
                               EmployeeRepository employeeRepository,
                               ContractTypeRepository contractTypeRepository,
                               EmployeeContractRepository employeeContractRepository,
                               WorkPolicyRepository workPolicyRepository,
                               ShiftRepository shiftRepository,
                               EmployeeScheduleRepository scheduleRepository,
                               AttendanceDeviceRepository deviceRepository,
                               RequestTypeRepository requestTypeRepository,
                               LeaveTypeRepository leaveTypeRepository,
                               LeaveBalanceRepository leaveBalanceRepository) {
        return args -> {
            Role adminRole = ensureRole(roleRepository, "ADMIN", "Quản trị hệ thống");
            Role leaderRole = ensureRole(roleRepository, "LEADER", "Trưởng nhóm");
            Role employeeRole = ensureRole(roleRepository, "EMPLOYEE", "Nhân viên");
            ensureRole(roleRepository, "DEVICE", "Thiết bị chấm công");

            Company company = ensureCompany(companyRepository);

            Department devDepartment = ensureDepartment(departmentRepository, company.getId(), "DEV", "Phòng Phát triển phần mềm");
            Department adminDepartment = ensureDepartment(departmentRepository, company.getId(), "ADMIN", "Phòng Hành chính");

            Employee adminEmp = ensureEmployee(employeeRepository, company.getId(), adminDepartment.getId(), "ADM001", "Admin Demo", "admin@demo.com");
            Employee leaderEmp = ensureEmployee(employeeRepository, company.getId(), devDepartment.getId(), "LEA001", "Leader Demo", "leader@demo.com");
            Employee employee = ensureEmployee(employeeRepository, company.getId(), devDepartment.getId(), "EMP001", "Employee Demo", "employee@demo.com");
            Employee employee2 = ensureEmployee(employeeRepository, company.getId(), devDepartment.getId(), "EMP002", "Employee Demo 2", "employee2@demo.com");


            Team teamA = ensureTeam(teamRepository, devDepartment.getId(), "TEAM_A", "Team A", leaderEmp.getId());
            ensureTeamMember(teamMemberRepository, teamA, leaderEmp, true);
            ensureTeamMember(teamMemberRepository, teamA, employee, false);
            ensureTeamMember(teamMemberRepository, teamA, employee2, false);

            ensureDemoUser(userRepository, userRoleRepository, adminRole, "admin123", "admin@demo.com", "Admin Demo", adminEmp, List.of(adminRole));
            ensureDemoUser(userRepository, userRoleRepository, leaderRole, "leader123", "leader@demo.com", "Leader Demo", leaderEmp, List.of(leaderRole));
            ensureDemoUser(userRepository, userRoleRepository, employeeRole, "employee123", "employee@demo.com", "Employee Demo", employee, List.of(employeeRole));
            ensureDemoUser(userRepository, userRoleRepository, employeeRole, "employee123", "employee2@demo.com", "Employee Demo 2", employee2, List.of(employeeRole));

            Shift officeShift = ensureShift(shiftRepository, company.getId(), "OFFICE_8_18", "Lịch 08:00 - 18:00",
                    LocalTime.of(8, 0), LocalTime.of(18, 0), LocalTime.of(12, 0), LocalTime.of(13, 0), false);
            Shift officeShift830 = ensureShift(shiftRepository, company.getId(), "OFFICE_830_1730", "Lịch 08:30 - 17:30",
                    LocalTime.of(8, 30), LocalTime.of(17, 30), LocalTime.of(12, 0), LocalTime.of(13, 0), false);
            Shift remoteShift = ensureShift(shiftRepository, company.getId(), "REMOTE_8_18", "Remote 08:00 - 18:00",
                    LocalTime.of(8, 0), LocalTime.of(18, 0), LocalTime.of(12, 0), LocalTime.of(13, 0), true);
            Shift partTimeMorning = ensureShift(shiftRepository, company.getId(), "PART_TIME_MORNING", "Part-time sáng 08:00 - 12:00",
                    LocalTime.of(8, 0), LocalTime.of(12, 0), null, null, false);

            ContractType fullTime = ensureContractType(contractTypeRepository, "FULL_TIME_FIXED", "Full-time cố định", true, false, true, officeShift.getId());
            ensureContractType(contractTypeRepository, "FULL_TIME_FLEXIBLE", "Full-time linh hoạt", true, true, true, officeShift830.getId());
            ensureContractType(contractTypeRepository, "PART_TIME", "Part-time", false, false, true, partTimeMorning.getId());
            ensureContractType(contractTypeRepository, "INTERN", "Thực tập", false, false, true, partTimeMorning.getId());
            ensureContractType(contractTypeRepository, "REMOTE", "Remote", false, true, false, remoteShift.getId());

            ensureWorkPolicy(workPolicyRepository, fullTime.getId());

            ensureEmployeeContract(employeeContractRepository, adminEmp, fullTime);
            ensureEmployeeContract(employeeContractRepository, leaderEmp, fullTime);
            ensureEmployeeContract(employeeContractRepository, employee, fullTime);
            ensureEmployeeContract(employeeContractRepository, employee2, fullTime);

            ensureSchedules(scheduleRepository, List.of(adminEmp, leaderEmp, employee, employee2), officeShift.getId());

            ensureDevice(deviceRepository, company.getId());

            ensureRequestType(requestTypeRepository, "LEAVE_REQUEST", "Đơn xin nghỉ phép");
            ensureRequestType(requestTypeRepository, "LATE_ARRIVAL", "Đơn đi muộn");
            ensureRequestType(requestTypeRepository, "EARLY_LEAVE_REQUEST", "Đơn về sớm");
            ensureRequestType(requestTypeRepository, "OUTSIDE_REQUEST", "Đơn ra ngoài");
            ensureRequestType(requestTypeRepository, "TIME_OFF", "Đơn nghỉ theo giờ");
            ensureRequestType(requestTypeRepository, "MISSING_CHECK_IN", "Đơn bổ sung check-in");
            ensureRequestType(requestTypeRepository, "MISSING_CHECK_OUT", "Đơn bổ sung check-out");
            ensureRequestType(requestTypeRepository, "REMOTE_WORK", "Đơn làm remote");
            ensureRequestType(requestTypeRepository, "OVERTIME", "Đơn làm thêm giờ");
            ensureRequestType(requestTypeRepository, "SHIFT_CHANGE", "Đơn đổi ca");

            LeaveType annualLeave = ensureLeaveType(leaveTypeRepository, "ANNUAL_LEAVE", "Nghỉ phép năm", true, 12.0);
            ensureLeaveBalance(leaveBalanceRepository, adminEmp, annualLeave);
            ensureLeaveBalance(leaveBalanceRepository, leaderEmp, annualLeave);
            ensureLeaveBalance(leaveBalanceRepository, employee, annualLeave);
            ensureLeaveBalance(leaveBalanceRepository, employee2, annualLeave);
        };
    }

    private Role ensureRole(RoleRepository repository, String code, String name) {
        Role role = repository.findByCode(code).orElseGet(Role::new);
        role.setCode(code);
        role.setName(name);
        role.setDescription(name);
        return repository.save(role);
    }

    private Company ensureCompany(CompanyRepository repository) {
        Company company = repository.findByCode(COMPANY_CODE).orElseGet(Company::new);
        company.setCode(COMPANY_CODE);
        company.setName("IT Company Demo");
        company.setAddress("Hà Nội");
        company.setEmail("contact@itc.demo");
        company.setPhone("0240000000");
        return repository.save(company);
    }

    private Department ensureDepartment(DepartmentRepository repository, UUID companyId, String code, String name) {
        Optional<Department> existing = repository.findAll().stream()
                .filter(d -> code.equals(d.getCode()) && companyId.equals(d.getCompanyId()))
                .findFirst();
        Department department = existing.orElseGet(Department::new);
        department.setCompanyId(companyId);
        department.setCode(code);
        department.setName(name);
        return repository.save(department);
    }

    private Employee ensureEmployee(EmployeeRepository repository, UUID companyId, UUID departmentId, String code, String name, String email) {
        Employee employee = repository.findByEmployeeCode(code).orElseGet(Employee::new);
        employee.setCompanyId(companyId);
        employee.setDepartmentId(departmentId);
        employee.setEmployeeCode(code);
        employee.setFullName(name);
        employee.setEmail(email);
        employee.setPhone("0980000000");
        employee.setGender("OTHER");
        employee.setHireDate(LocalDate.now().minusMonths(6));
        employee.setStatus(EmployeeStatus.WORKING);
        return repository.save(employee);
    }

    private Team ensureTeam(TeamRepository repository, UUID departmentId, String code, String name, UUID leaderEmployeeId) {
        Optional<Team> existing = repository.findAll().stream()
                .filter(t -> code.equals(t.getCode()) && departmentId.equals(t.getDepartmentId()))
                .findFirst();
        Team team = existing.orElseGet(Team::new);
        team.setDepartmentId(departmentId);
        team.setCode(code);
        team.setName(name);
        team.setLeaderEmployeeId(leaderEmployeeId);
        return repository.save(team);
    }

    private void ensureTeamMember(TeamMemberRepository repository, Team team, Employee employee, boolean leader) {
        Optional<TeamMember> existing = repository.findByTeamId(team.getId()).stream()
                .filter(m -> employee.getId().equals(m.getEmployeeId()))
                .findFirst();
        TeamMember member = existing.orElseGet(TeamMember::new);
        member.setTeamId(team.getId());
        member.setEmployeeId(employee.getId());
        member.setJoinedDate(LocalDate.now().minusMonths(3));
        member.setLeader(leader);
        repository.save(member);
    }

    private void ensureDemoUser(AppUserRepository userRepository,
                                UserRoleRepository userRoleRepository,
                                Role defaultRole,
                                String password,
                                String email,
                                String fullName,
                                Employee employee,
                                List<Role> roles) {
        AppUser user = userRepository.findByUsernameIgnoreCase(employee.getEmployeeCode()).orElseGet(AppUser::new);
        user.setUsername(employee.getEmployeeCode());
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setEmail(email);
        user.setFullName(fullName);
        user.setEmployeeId(employee.getId());
        user.setStatus(UserStatus.ACTIVE);
        user.setFailedLoginCount(0);
        user.setLockedUntil(null);
        user = userRepository.save(user);

        List<UserRole> currentRoles = userRoleRepository.findByUserId(user.getId());
        for (Role role : roles.isEmpty() ? List.of(defaultRole) : roles) {
            boolean exists = currentRoles.stream().anyMatch(ur -> role.getId().equals(ur.getRoleId()));
            if (!exists) {
                UserRole userRole = new UserRole();
                userRole.setUserId(user.getId());
                userRole.setRoleId(role.getId());
                userRoleRepository.save(userRole);
            }
        }
    }

    private Shift ensureShift(ShiftRepository repository, UUID companyId, String code, String name,
                              LocalTime start, LocalTime end, LocalTime lunchStart, LocalTime lunchEnd, boolean remoteAllowed) {
        Shift shift = repository.findByCode(code).orElseGet(Shift::new);
        shift.setCompanyId(companyId);
        shift.setCode(code);
        shift.setName(name);
        shift.setStartTime(start);
        shift.setEndTime(end);
        shift.setLunchStartTime(lunchStart);
        shift.setLunchEndTime(lunchEnd);
        int lunchMinutes = lunchStart != null && lunchEnd != null
                ? (int) java.time.Duration.between(lunchStart, lunchEnd).toMinutes()
                : 0;
        shift.setLunchBreakMinutes(lunchMinutes);
        int workingMinutes = (int) java.time.Duration.between(start, end).toMinutes() - lunchMinutes;
        shift.setWorkingMinutes(workingMinutes);
        shift.setMinWorkingMinutesPerDay(Math.min(480, workingMinutes));
        shift.setLateToleranceMinutes(5);
        shift.setEarlyLeaveToleranceMinutes(5);
        shift.setRemoteAllowed(remoteAllowed);
        shift.setFlexible(false);
        shift.setCrossDay(end.isBefore(start));
        shift.setStatus(GenericStatus.ACTIVE);
        return repository.save(shift);
    }

    private ContractType ensureContractType(ContractTypeRepository repository, String code, String name,
                                            boolean ot, boolean remote, boolean device, UUID defaultShiftId) {
        ContractType type = repository.findByCode(code).orElseGet(ContractType::new);
        type.setCode(code);
        type.setName(name);
        type.setDescription(name);
        type.setAllowOvertime(ot);
        type.setAllowRemoteWork(remote);
        type.setRequireAttendanceDevice(device);
        type.setRequireLeaderApproval(true);
        type.setDefaultShiftId(defaultShiftId);
        return repository.save(type);
    }

    private void ensureWorkPolicy(WorkPolicyRepository repository, UUID contractTypeId) {
        Optional<WorkPolicy> existing = repository.findAll().stream()
                .filter(p -> contractTypeId.equals(p.getContractTypeId()))
                .findFirst();
        WorkPolicy policy = existing.orElseGet(WorkPolicy::new);
        policy.setContractTypeId(contractTypeId);
        policy.setName("Chính sách giờ hành chính");
        policy.setStandardStartTime(LocalTime.of(8, 0));
        policy.setStandardEndTime(LocalTime.of(18, 0));
        policy.setBreakMinutes(60);
        policy.setLateToleranceMinutes(5);
        policy.setEarlyLeaveToleranceMinutes(5);
        policy.setMinWorkingMinutesPerDay(480);
        policy.setOvertimeStartAfterMinutes(540);
        policy.setAllowFlexibleCheckIn(false);
        policy.setAllowRemoteWork(false);
        repository.save(policy);
    }

    private void ensureEmployeeContract(EmployeeContractRepository repository, Employee employee, ContractType contractType) {
        boolean exists = repository.findByEmployeeId(employee.getId()).stream()
                .anyMatch(c -> ContractStatus.ACTIVE.equals(c.getStatus()));
        if (exists) {
            return;
        }
        EmployeeContract contract = new EmployeeContract();
        contract.setEmployeeId(employee.getId());
        contract.setContractTypeId(contractType.getId());
        contract.setContractNo("HD-" + employee.getEmployeeCode());
        contract.setStartDate(LocalDate.now().minusMonths(6));
        contract.setStatus(ContractStatus.ACTIVE);
        contract.setSalaryType(SalaryType.MONTHLY);
        repository.save(contract);
    }

    private void ensureSchedules(EmployeeScheduleRepository repository, List<Employee> employees, UUID shiftId) {
        LocalDate today = LocalDate.now();
        for (Employee employee : employees) {
            for (int i = -30; i <= 30; i++) {
                LocalDate date = today.plusDays(i);
                if (date.getDayOfWeek().getValue() > 5) {
                    continue;
                }
                boolean exists = repository.findByEmployeeIdAndWorkDate(employee.getId(), date).isPresent();
                if (exists) {
                    continue;
                }
                EmployeeSchedule schedule = new EmployeeSchedule();
                schedule.setEmployeeId(employee.getId());
                schedule.setWorkDate(date);
                schedule.setShiftId(shiftId);
                schedule.setScheduleType(ScheduleType.WORKING);
                schedule.setSourceType(SourceType.AUTO_GENERATED);
                repository.save(schedule);
            }
        }
    }

    private void ensureDevice(AttendanceDeviceRepository repository, UUID companyId) {
        AttendanceDevice device = repository.findByDeviceCode(DEFAULT_DEVICE_CODE).orElseGet(AttendanceDevice::new);
        device.setCompanyId(companyId);
        device.setDeviceCode(DEFAULT_DEVICE_CODE);
        device.setDeviceName("Máy chấm công 001");
        device.setDeviceType(DeviceType.WEB_SIMULATOR);
        device.setLocation("Cửa chính");
        device.setIpAddress("127.0.0.1");
        device.setApiKeyHash(passwordEncoder.encode(DEFAULT_DEVICE_API_KEY));
        device.setActive(true);
        repository.save(device);
    }

    private void ensureRequestType(RequestTypeRepository repository, String code, String name) {
        RequestType type = repository.findByCode(code).orElseGet(RequestType::new);
        type.setCode(code);
        type.setName(name);
        type.setDescription(name);
        type.setRequireLeaderApproval(true);
        repository.save(type);
    }

    private LeaveType ensureLeaveType(LeaveTypeRepository repository, String code, String name, boolean paid, double maxDays) {
        LeaveType type = repository.findByCode(code).orElseGet(LeaveType::new);
        type.setCode(code);
        type.setName(name);
        type.setPaid(paid);
        type.setMaxDaysPerYear(maxDays);
        return repository.save(type);
    }

    private void ensureLeaveBalance(LeaveBalanceRepository repository, Employee employee, LeaveType leaveType) {
        int year = LocalDate.now().getYear();
        Optional<LeaveBalance> existing = repository.findByEmployeeId(employee.getId()).stream()
                .filter(b -> leaveType.getId().equals(b.getLeaveTypeId()) && Integer.valueOf(year).equals(b.getYear()))
                .findFirst();
        LeaveBalance balance = existing.orElseGet(LeaveBalance::new);
        balance.setEmployeeId(employee.getId());
        balance.setLeaveTypeId(leaveType.getId());
        balance.setYear(year);
        if (balance.getTotalDays() == null || balance.getTotalDays() == 0) {
            balance.setTotalDays(12.0);
        }
        if (balance.getUsedDays() == null) {
            balance.setUsedDays(0.0);
        }
        balance.setRemainingDays(balance.getTotalDays() - balance.getUsedDays());
        repository.save(balance);
    }
}
