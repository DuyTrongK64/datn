package com.duytrong.attendance.controller;

import com.duytrong.attendance.common.BusinessException;
import com.duytrong.attendance.domain.LeaveBalance;
import com.duytrong.attendance.repository.LeaveBalanceRepository;
import com.duytrong.attendance.service.AccessControlService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/leave-balances")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class LeaveBalanceController {
    private final LeaveBalanceRepository repository;
    private final AccessControlService accessControlService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','LEADER')")
    public List<LeaveBalance> list() {
        if (accessControlService.canSeeAllEmployees()) return repository.findAll();
        Set<UUID> employeeIds = accessControlService.leaderEmployeeIds().stream().collect(Collectors.toSet());
        return repository.findAll().stream()
                .filter(balance -> employeeIds.contains(balance.getEmployeeId()))
                .toList();
    }

    @GetMapping("/employee/{employeeId}")
    public List<LeaveBalance> byEmployee(@PathVariable UUID employeeId) {
        accessControlService.requireCanViewEmployee(employeeId);
        return repository.findByEmployeeId(employeeId);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LEADER')")
    public LeaveBalance get(@PathVariable UUID id) {
        LeaveBalance balance = repository.findById(id).orElseThrow(() -> new BusinessException("Không tìm thấy dữ liệu"));
        accessControlService.requireCanViewEmployee(balance.getEmployeeId());
        return balance;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public LeaveBalance create(@RequestBody LeaveBalance input) {
        input.setId(null);
        return repository.save(input);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public LeaveBalance update(@PathVariable UUID id, @RequestBody LeaveBalance input) {
        LeaveBalance existing = repository.findById(id).orElseThrow(() -> new BusinessException("Không tìm thấy dữ liệu"));
        BeanUtils.copyProperties(input, existing, "id", "createdAt", "updatedAt");
        return repository.save(existing);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable UUID id) {
        repository.deleteById(id);
    }
}
