package com.duytrong.attendance.service;

import com.duytrong.attendance.common.BusinessException;
import com.duytrong.attendance.domain.AppUser;
import com.duytrong.attendance.domain.Employee;
import com.duytrong.attendance.domain.Team;
import com.duytrong.attendance.domain.TeamMember;
import com.duytrong.attendance.repository.AppUserRepository;
import com.duytrong.attendance.repository.EmployeeRepository;
import com.duytrong.attendance.repository.TeamMemberRepository;
import com.duytrong.attendance.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AccessControlService {
    private final AppUserRepository userRepository;
    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final EmployeeRepository employeeRepository;

    public AppUser currentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new BusinessException("Người dùng chưa đăng nhập");
        }
        return userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new BusinessException("Không tìm thấy tài khoản hiện tại"));
    }

    public UUID currentEmployeeId() {
        return currentUser().getEmployeeId();
    }

    public boolean hasRole(String role) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) return false;
        String authority = role.startsWith("ROLE_") ? role : "ROLE_" + role;
        return authentication.getAuthorities().stream().anyMatch(item -> authority.equals(item.getAuthority()));
    }

    public boolean isAdmin() {
        return hasRole("ADMIN");
    }

    public boolean isLeader() {
        return hasRole("LEADER");
    }

    public boolean canSeeAllEmployees() {
        return isAdmin();
    }

    public List<Team> visibleTeamsForCurrentUser() {
        if (canSeeAllEmployees()) return teamRepository.findAll();
        if (!isLeader()) return List.of();
        return teamRepository.findAllById(leaderTeamIds()).stream().toList();
    }

    public List<UUID> leaderTeamIds() {
        UUID employeeId = currentEmployeeId();
        if (employeeId == null || !isLeader()) return List.of();
        Set<UUID> teamIds = new LinkedHashSet<>();
        teamRepository.findByLeaderEmployeeId(employeeId).forEach(team -> teamIds.add(team.getId()));
        teamMemberRepository.findByEmployeeId(employeeId).stream()
                .filter(member -> member.getLeftDate() == null)
                .filter(TeamMember::isLeader)
                .map(TeamMember::getTeamId)
                .forEach(teamIds::add);
        return teamIds.stream().toList();
    }

    public List<UUID> leaderEmployeeIds() {
        if (!isLeader()) return List.of();
        Set<UUID> teamIds = new LinkedHashSet<>(leaderTeamIds());
        if (teamIds.isEmpty()) return List.of();
        Set<UUID> employeeIds = new LinkedHashSet<>();
        for (UUID teamId : teamIds) {
            teamMemberRepository.findByTeamId(teamId).stream()
                    .filter(member -> member.getLeftDate() == null)
                    .map(TeamMember::getEmployeeId)
                    .forEach(employeeIds::add);
        }
        return employeeIds.stream().toList();
    }

    public List<Employee> visibleEmployeesForCurrentUser() {
        if (canSeeAllEmployees()) return employeeRepository.findAll();
        if (isLeader()) return employeeRepository.findAllById(leaderEmployeeIds());
        UUID ownEmployeeId = currentEmployeeId();
        if (ownEmployeeId == null) return List.of();
        return employeeRepository.findById(ownEmployeeId).map(List::of).orElseGet(List::of);
    }

    public boolean canViewTeam(UUID teamId) {
        if (teamId == null) return false;
        if (canSeeAllEmployees()) return true;
        return isLeader() && leaderTeamIds().contains(teamId);
    }

    public boolean canViewEmployee(UUID employeeId) {
        if (employeeId == null) return false;
        if (canSeeAllEmployees()) return true;
        UUID ownEmployeeId = currentEmployeeId();
        if (ownEmployeeId != null && ownEmployeeId.equals(employeeId)) return true;
        return isLeader() && leaderEmployeeIds().contains(employeeId);
    }

    public void requireCanViewTeam(UUID teamId) {
        if (!canViewTeam(teamId)) throw new BusinessException("Bạn không có quyền xem team này");
    }

    public void requireCanViewEmployee(UUID employeeId) {
        if (!canViewEmployee(employeeId)) throw new BusinessException("Bạn không có quyền xem nhân viên này");
    }

    public void requireAdminOrHrWrite() {
        requireAdminWrite();
    }

    public void requireAdminWrite() {
        if (!isAdmin()) {
            throw new BusinessException("Chỉ Admin được thực hiện thao tác này");
        }
    }

    public void requireCanApproveRequestForEmployee(UUID employeeId) {
        if (isAdmin()) return;
        if (isLeader() && leaderEmployeeIds().contains(employeeId)) return;
        throw new BusinessException("Bạn không có quyền phê duyệt đơn này");
    }

    public String currentApproverRole() {
        if (isAdmin()) return "ADMIN";
        if (isLeader()) return "LEADER";
        return "EMPLOYEE";
    }
}
