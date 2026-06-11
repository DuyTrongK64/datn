package com.duytrong.attendance.controller;

import com.duytrong.attendance.common.BusinessException;
import com.duytrong.attendance.domain.LeaveBalance;
import com.duytrong.attendance.repository.LeaveBalanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/leave-balances")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class LeaveBalanceController {
    private final LeaveBalanceRepository repository;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','HR','LEADER')")
    public List<LeaveBalance> list() {
        return repository.findAll();
    }

    @GetMapping("/employee/{employeeId}")
    public List<LeaveBalance> byEmployee(@PathVariable UUID employeeId) {
        return repository.findByEmployeeId(employeeId);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','HR','LEADER')")
    public LeaveBalance get(@PathVariable UUID id) {
        return repository.findById(id).orElseThrow(() -> new BusinessException("Không tìm thấy dữ liệu"));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    public LeaveBalance create(@RequestBody LeaveBalance input) {
        input.setId(null);
        return repository.save(input);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
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
