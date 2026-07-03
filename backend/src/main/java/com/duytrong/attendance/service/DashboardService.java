package com.duytrong.attendance.service;

import com.duytrong.attendance.common.enums.AttendanceStatus;
import com.duytrong.attendance.common.enums.RequestStatus;
import com.duytrong.attendance.domain.*;
import com.duytrong.attendance.dto.DashboardResponse;
import com.duytrong.attendance.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final DailyAttendanceRepository dailyAttendanceRepository;
    private final AttendanceRequestRepository requestRepository;
    private final RequestTypeRepository requestTypeRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;
    private final AttendanceDeviceRepository deviceRepository;
    private final SystemTimeService systemTimeService;
    private final AccessControlService accessControlService;

    public DashboardResponse getDashboard() {
        LocalDate today = systemTimeService.today();
        UUID currentEmployeeId = accessControlService.currentEmployeeId();
        boolean admin = accessControlService.isAdmin();
        boolean leader = accessControlService.isLeader() && !admin;

        List<Employee> visibleEmployees = accessControlService.visibleEmployeesForCurrentUser();
        Set<UUID> visibleEmployeeIds = visibleEmployees.stream().map(Employee::getId).collect(Collectors.toCollection(LinkedHashSet::new));

        List<Team> visibleTeams = admin
                ? teamRepository.findAll()
                : leader
                    ? accessControlService.visibleTeamsForCurrentUser()
                    : currentEmployeeId == null ? List.of() : teamsOfEmployee(currentEmployeeId);

        List<DailyAttendance> todayAttendances = dailyAttendanceRepository.findByWorkDateBetween(today, today).stream()
                .filter(attendance -> visibleEmployeeIds.contains(attendance.getEmployeeId()))
                .toList();

        long checkedIn = todayAttendances.stream().filter(a -> a.getFirstCheckIn() != null).count();
        long late = todayAttendances.stream().filter(a -> a.getStatus() == AttendanceStatus.LATE).count();
        long absent = todayAttendances.stream().filter(a -> a.getStatus() == AttendanceStatus.ABSENT).count();

        List<AttendanceRequest> visibleRequests = requestRepository.findAll().stream()
                .filter(request -> visibleEmployeeIds.contains(request.getEmployeeId()))
                .toList();
        long pending = visibleRequests.stream().filter(request -> request.getStatus() == RequestStatus.PENDING).count();

        LocalDateTime realOnlineThreshold = LocalDateTime.now().minusMinutes(2);
        long online = admin
                ? deviceRepository.findAll().stream()
                    .filter(d -> d.getLastOnlineAt() != null && d.getLastOnlineAt().isAfter(realOnlineThreshold))
                    .count()
                : 0;

        Map<UUID, Employee> employeeMap = visibleEmployees.stream()
                .collect(Collectors.toMap(Employee::getId, Function.identity(), (a, b) -> a, LinkedHashMap::new));
        Map<UUID, Department> departmentMap = departmentRepository.findAllById(
                        visibleEmployees.stream().map(Employee::getDepartmentId).filter(Objects::nonNull).toList()
                ).stream()
                .collect(Collectors.toMap(Department::getId, Function.identity()));
        List<TeamMember> visibleMemberships = visibleTeams.stream()
                .flatMap(team -> teamMemberRepository.findByTeamId(team.getId()).stream())
                .filter(member -> member.getLeftDate() == null)
                .toList();
        Map<UUID, String> primaryTeamByEmployee = buildPrimaryTeamNameMap(visibleTeams, visibleMemberships);
        Map<UUID, DailyAttendance> todayAttendanceMap = todayAttendances.stream()
                .collect(Collectors.toMap(DailyAttendance::getEmployeeId, Function.identity(), (a, b) -> a));

        Employee me = currentEmployeeId == null ? null : employeeRepository.findById(currentEmployeeId).orElse(null);
        DashboardResponse.PersonalCard personal = toPersonalCard(me, departmentMap, visibleTeams, visibleMemberships);
        DashboardResponse.AttendanceToday todayAttendance = currentEmployeeId == null
                ? null
                : dailyAttendanceRepository.findByEmployeeIdAndWorkDate(currentEmployeeId, today).map(this::toAttendanceToday).orElse(null);
        DashboardResponse.LeaveCard leaveCard = currentEmployeeId == null ? null : toLeaveCard(currentEmployeeId, today.getYear());

        List<DashboardResponse.TeamCard> teamCards = visibleTeams.stream()
                .map(team -> toTeamCard(team, todayAttendances, visibleRequests))
                .toList();
        List<DashboardResponse.EmployeeCard> employeeCards = visibleEmployees.stream()
                .sorted(Comparator.comparing(Employee::getEmployeeCode, Comparator.nullsLast(String::compareToIgnoreCase)))
                .limit(admin ? 12 : leader ? 20 : 1)
                .map(employee -> toEmployeeCard(employee, departmentMap, primaryTeamByEmployee, todayAttendanceMap.get(employee.getId())))
                .toList();

        Map<UUID, RequestType> requestTypeMap = requestTypeRepository.findAll().stream()
                .collect(Collectors.toMap(RequestType::getId, Function.identity()));
        List<DashboardResponse.RequestCard> recentRequests = visibleRequests.stream()
                .sorted(Comparator.comparing(AttendanceRequest::getCreatedAt, Comparator.nullsLast(LocalDateTime::compareTo)).reversed())
                .limit(8)
                .map(request -> toRequestCard(request, employeeMap, requestTypeMap))
                .toList();

        String roleDashboard = admin ? "ADMIN" : leader ? "LEADER" : "EMPLOYEE";
        String scopeLabel = admin
                ? "Toàn công ty"
                : leader
                    ? "Team phụ trách"
                    : "Cá nhân";

        return new DashboardResponse(
                visibleEmployees.size(), checkedIn, late, absent, pending,
                admin ? deviceRepository.count() : 0,
                online,
                roleDashboard,
                scopeLabel,
                today.toString(),
                personal,
                todayAttendance,
                leaveCard,
                teamCards,
                employeeCards,
                recentRequests
        );
    }

    private List<Team> teamsOfEmployee(UUID employeeId) {
        List<UUID> teamIds = teamMemberRepository.findByEmployeeId(employeeId).stream()
                .filter(member -> member.getLeftDate() == null)
                .map(TeamMember::getTeamId)
                .distinct()
                .toList();
        if (teamIds.isEmpty()) return List.of();
        return teamRepository.findAllById(teamIds).stream().toList();
    }

    private Map<UUID, String> buildPrimaryTeamNameMap(List<Team> teams, List<TeamMember> memberships) {
        Map<UUID, Team> teamMap = teams.stream().collect(Collectors.toMap(Team::getId, Function.identity(), (a, b) -> a));
        Map<UUID, String> result = new LinkedHashMap<>();
        for (TeamMember member : memberships) {
            Team team = teamMap.get(member.getTeamId());
            if (team != null && !result.containsKey(member.getEmployeeId())) {
                result.put(member.getEmployeeId(), team.getName());
            }
        }
        return result;
    }

    private DashboardResponse.PersonalCard toPersonalCard(Employee employee,
                                                         Map<UUID, Department> departmentMap,
                                                         List<Team> visibleTeams,
                                                         List<TeamMember> memberships) {
        if (employee == null) return null;
        Map<UUID, Team> teamMap = visibleTeams.stream().collect(Collectors.toMap(Team::getId, Function.identity(), (a, b) -> a));
        List<String> teamNames = memberships.stream()
                .filter(member -> employee.getId().equals(member.getEmployeeId()))
                .map(TeamMember::getTeamId)
                .map(teamMap::get)
                .filter(Objects::nonNull)
                .map(Team::getName)
                .distinct()
                .toList();
        Department department = employee.getDepartmentId() == null ? null : departmentMap.get(employee.getDepartmentId());
        if (department == null && employee.getDepartmentId() != null) {
            department = departmentRepository.findById(employee.getDepartmentId()).orElse(null);
        }
        return new DashboardResponse.PersonalCard(
                employee.getId(),
                employee.getEmployeeCode(),
                employee.getFullName(),
                department == null ? null : department.getName(),
                teamNames
        );
    }

    private DashboardResponse.AttendanceToday toAttendanceToday(DailyAttendance attendance) {
        return new DashboardResponse.AttendanceToday(
                attendance.getId(),
                attendance.getEmployeeId(),
                attendance.getWorkDate(),
                attendance.getPlannedStartTime(),
                attendance.getPlannedEndTime(),
                attendance.getFirstCheckIn(),
                attendance.getLastCheckOut(),
                attendance.getTotalWorkingMinutes(),
                attendance.getLateMinutes(),
                attendance.getEarlyLeaveMinutes(),
                attendance.getOvertimeMinutes(),
                attendance.getStatus() == null ? null : attendance.getStatus().name()
        );
    }

    private DashboardResponse.LeaveCard toLeaveCard(UUID employeeId, int year) {
        List<LeaveBalance> balances = leaveBalanceRepository.findByEmployeeId(employeeId).stream()
                .filter(balance -> balance.getYear() == null || Integer.valueOf(year).equals(balance.getYear()))
                .toList();
        if (balances.isEmpty()) return null;
        double total = balances.stream().mapToDouble(balance -> safe(balance.getTotalDays())).sum();
        double used = balances.stream().mapToDouble(balance -> safe(balance.getUsedDays())).sum();
        double remaining = balances.stream().mapToDouble(balance -> safe(balance.getRemainingDays())).sum();
        return new DashboardResponse.LeaveCard(round(total), round(used), round(remaining));
    }

    private DashboardResponse.TeamCard toTeamCard(Team team, List<DailyAttendance> attendances, List<AttendanceRequest> requests) {
        List<UUID> memberIds = teamMemberRepository.findByTeamId(team.getId()).stream()
                .filter(member -> member.getLeftDate() == null)
                .map(TeamMember::getEmployeeId)
                .toList();
        Set<UUID> memberSet = new LinkedHashSet<>(memberIds);
        long checkedIn = attendances.stream().filter(a -> memberSet.contains(a.getEmployeeId()) && a.getFirstCheckIn() != null).count();
        long late = attendances.stream().filter(a -> memberSet.contains(a.getEmployeeId()) && a.getStatus() == AttendanceStatus.LATE).count();
        long absent = attendances.stream().filter(a -> memberSet.contains(a.getEmployeeId()) && a.getStatus() == AttendanceStatus.ABSENT).count();
        long pending = requests.stream().filter(r -> memberSet.contains(r.getEmployeeId()) && r.getStatus() == RequestStatus.PENDING).count();
        return new DashboardResponse.TeamCard(team.getId(), team.getCode(), team.getName(), memberIds.size(), checkedIn, late, absent, pending);
    }

    private DashboardResponse.EmployeeCard toEmployeeCard(Employee employee,
                                                         Map<UUID, Department> departmentMap,
                                                         Map<UUID, String> teamNames,
                                                         DailyAttendance todayAttendance) {
        Department department = employee.getDepartmentId() == null ? null : departmentMap.get(employee.getDepartmentId());
        String todayStatus = todayAttendance == null || todayAttendance.getStatus() == null ? "NO_DATA" : todayAttendance.getStatus().name();
        return new DashboardResponse.EmployeeCard(
                employee.getId(),
                employee.getEmployeeCode(),
                employee.getFullName(),
                employee.getEmail(),
                employee.getPhone(),
                department == null ? null : department.getName(),
                teamNames.get(employee.getId()),
                todayStatus
        );
    }

    private DashboardResponse.RequestCard toRequestCard(AttendanceRequest request,
                                                       Map<UUID, Employee> employeeMap,
                                                       Map<UUID, RequestType> requestTypeMap) {
        Employee employee = employeeMap.get(request.getEmployeeId());
        RequestType type = requestTypeMap.get(request.getRequestTypeId());
        return new DashboardResponse.RequestCard(
                request.getId(),
                request.getEmployeeId(),
                employee == null ? null : employee.getEmployeeCode(),
                employee == null ? "Không xác định" : employee.getFullName(),
                type == null ? null : type.getCode(),
                type == null ? null : type.getName(),
                request.getTargetDate(),
                request.getEndDate(),
                request.getStatus() == null ? null : request.getStatus().name(),
                request.getReason(),
                request.getCreatedAt()
        );
    }

    private double safe(Double value) {
        return value == null ? 0.0 : value;
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}
