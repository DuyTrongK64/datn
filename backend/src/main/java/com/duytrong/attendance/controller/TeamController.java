package com.duytrong.attendance.controller;

import com.duytrong.attendance.common.BusinessException;
import com.duytrong.attendance.domain.Team;
import com.duytrong.attendance.repository.TeamRepository;
import com.duytrong.attendance.service.AccessControlService;
import org.springframework.beans.BeanUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/teams")
@PreAuthorize("hasAnyRole('ADMIN','LEADER')")
public class TeamController extends SimpleCrudController<Team> {
    private final TeamRepository repository;
    private final AccessControlService accessControlService;

    public TeamController(TeamRepository repository, AccessControlService accessControlService) {
        super(repository);
        this.repository = repository;
        this.accessControlService = accessControlService;
    }

    @Override
    @GetMapping
    public List<Team> list() {
        return accessControlService.visibleTeamsForCurrentUser();
    }

    @Override
    @GetMapping("/{id}")
    public Team get(@PathVariable UUID id) {
        accessControlService.requireCanViewTeam(id);
        return repository.findById(id).orElseThrow(() -> new BusinessException("Không tìm thấy dữ liệu"));
    }

    @Override
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Team create(@RequestBody Team input) {
        input.setId(null);
        return repository.save(input);
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Team update(@PathVariable UUID id, @RequestBody Team input) {
        Team existing = repository.findById(id).orElseThrow(() -> new BusinessException("Không tìm thấy dữ liệu"));
        BeanUtils.copyProperties(input, existing, "id", "createdAt", "updatedAt");
        return repository.save(existing);
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable UUID id) {
        repository.deleteById(id);
    }
}
