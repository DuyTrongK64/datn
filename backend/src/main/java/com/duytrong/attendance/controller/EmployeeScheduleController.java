package com.duytrong.attendance.controller;

import com.duytrong.attendance.common.BusinessException;
import com.duytrong.attendance.domain.EmployeeSchedule;
import com.duytrong.attendance.repository.EmployeeScheduleRepository;
import com.duytrong.attendance.service.AccessControlService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/schedules")
@PreAuthorize("hasAnyRole('ADMIN','LEADER')")
public class EmployeeScheduleController extends SimpleCrudController<EmployeeSchedule> {
    private final EmployeeScheduleRepository repository;
    private final AccessControlService accessControlService;

    public EmployeeScheduleController(EmployeeScheduleRepository repository, AccessControlService accessControlService) {
        super(repository);
        this.repository = repository;
        this.accessControlService = accessControlService;
    }

    @Override
    @GetMapping
    public List<EmployeeSchedule> list() {
        if (accessControlService.canSeeAllEmployees()) return repository.findAll();
        Set<UUID> employeeIds = accessControlService.leaderEmployeeIds().stream().collect(Collectors.toSet());
        return repository.findAll().stream()
                .filter(schedule -> employeeIds.contains(schedule.getEmployeeId()))
                .toList();
    }

    @Override
    @GetMapping("/{id}")
    public EmployeeSchedule get(@PathVariable UUID id) {
        EmployeeSchedule schedule = repository.findById(id).orElseThrow(() -> new BusinessException("Không tìm thấy dữ liệu"));
        accessControlService.requireCanViewEmployee(schedule.getEmployeeId());
        return schedule;
    }
}
