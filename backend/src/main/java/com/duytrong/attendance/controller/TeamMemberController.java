package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.TeamMember;
import com.duytrong.attendance.repository.TeamMemberRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/team-members")
@PreAuthorize("hasAnyRole('ADMIN','HR','LEADER')")
public class TeamMemberController extends SimpleCrudController<TeamMember> {
    private final TeamMemberRepository repository;

    public TeamMemberController(TeamMemberRepository repository) {
        super(repository);
        this.repository = repository;
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
}
