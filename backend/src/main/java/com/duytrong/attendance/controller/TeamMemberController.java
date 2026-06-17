package com.duytrong.attendance.controller;

import com.duytrong.attendance.common.BusinessException;
import com.duytrong.attendance.domain.TeamMember;
import com.duytrong.attendance.repository.TeamMemberRepository;
import com.duytrong.attendance.service.AccessControlService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/team-members")
@PreAuthorize("hasAnyRole('ADMIN','LEADER')")
public class TeamMemberController extends SimpleCrudController<TeamMember> {
    private final TeamMemberRepository repository;
    private final AccessControlService accessControlService;

    public TeamMemberController(TeamMemberRepository repository, AccessControlService accessControlService) {
        super(repository);
        this.repository = repository;
        this.accessControlService = accessControlService;
    }

    @Override
    @GetMapping
    public List<TeamMember> list() {
        if (accessControlService.canSeeAllEmployees()) return repository.findAll();
        if (accessControlService.isLeader()) {
            return accessControlService.leaderTeamIds().stream()
                    .flatMap(teamId -> repository.findByTeamId(teamId).stream())
                    .toList();
        }
        UUID employeeId = accessControlService.currentEmployeeId();
        return employeeId == null ? List.of() : repository.findByEmployeeId(employeeId);
    }

    @Override
    @GetMapping("/{id}")
    public TeamMember get(@PathVariable UUID id) {
        TeamMember member = repository.findById(id).orElseThrow(() -> new BusinessException("Không tìm thấy dữ liệu"));
        accessControlService.requireCanViewTeam(member.getTeamId());
        return member;
    }

    /**
     * Mỗi nhân viên chỉ có một team hiện tại trong phạm vi đồ án.
     * Khi thêm nhân viên vào team mới, hệ thống tự chuyển nhân viên đó khỏi team cũ.
     */
    @Override
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public TeamMember create(@RequestBody TeamMember input) {
        List<TeamMember> existingMemberships = repository.findByEmployeeId(input.getEmployeeId());
        TeamMember current = existingMemberships.stream()
                .filter(member -> member.getLeftDate() == null)
                .findFirst()
                .orElseGet(TeamMember::new);

        current.setTeamId(input.getTeamId());
        current.setEmployeeId(input.getEmployeeId());
        current.setJoinedDate(input.getJoinedDate() != null ? input.getJoinedDate() : LocalDate.now());
        current.setLeftDate(null);
        current.setLeader(input.isLeader());

        TeamMember saved = repository.save(current);
        existingMemberships.stream()
                .filter(member -> member.getId() != null && !member.getId().equals(saved.getId()))
                .forEach(repository::delete);
        return saved;
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public TeamMember update(@PathVariable UUID id, @RequestBody TeamMember input) {
        TeamMember existing = repository.findById(id).orElseThrow(() -> new BusinessException("Không tìm thấy dữ liệu"));
        existing.setTeamId(input.getTeamId());
        existing.setEmployeeId(input.getEmployeeId());
        existing.setJoinedDate(input.getJoinedDate());
        existing.setLeftDate(input.getLeftDate());
        existing.setLeader(input.isLeader());
        return repository.save(existing);
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable UUID id) {
        repository.deleteById(id);
    }
}
