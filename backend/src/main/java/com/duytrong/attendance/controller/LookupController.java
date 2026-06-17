package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.*;
import com.duytrong.attendance.repository.*;
import com.duytrong.attendance.service.AccessControlService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/lookups")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class LookupController {
    private final CompanyRepository companyRepository;
    private final DepartmentRepository departmentRepository;
    private final TeamRepository teamRepository;
    private final EmployeeRepository employeeRepository;
    private final ContractTypeRepository contractTypeRepository;
    private final ShiftRepository shiftRepository;
    private final LeaveTypeRepository leaveTypeRepository;
    private final RequestTypeRepository requestTypeRepository;
    private final AccessControlService accessControlService;

    @GetMapping("/companies")
    public List<Map<String, Object>> companies() {
        return companyRepository.findAll().stream().map(c -> item(c.getId(), c.getCode(), c.getName())).toList();
    }

    @GetMapping("/departments")
    public List<Map<String, Object>> departments() {
        if (accessControlService.isLeader() && !accessControlService.canSeeAllEmployees()) {
            Set<UUID> departmentIds = accessControlService.visibleTeamsForCurrentUser().stream()
                    .map(Team::getDepartmentId)
                    .collect(Collectors.toSet());
            return departmentRepository.findAllById(departmentIds).stream()
                    .map(d -> item(d.getId(), d.getCode(), d.getName()))
                    .toList();
        }
        return departmentRepository.findAll().stream().map(d -> item(d.getId(), d.getCode(), d.getName())).toList();
    }

    @GetMapping("/teams")
    public List<Map<String, Object>> teams() {
        return accessControlService.visibleTeamsForCurrentUser().stream().map(t -> {
            Map<String, Object> item = item(t.getId(), t.getCode(), t.getName());
            item.put("departmentId", t.getDepartmentId());
            item.put("leaderEmployeeId", t.getLeaderEmployeeId());
            return item;
        }).toList();
    }

    @GetMapping("/employees")
    public List<Map<String, Object>> employees() {
        return accessControlService.visibleEmployeesForCurrentUser().stream().map(e -> {
            Map<String, Object> item = item(e.getId(), e.getEmployeeCode(), e.getFullName());
            item.put("employeeCode", e.getEmployeeCode());
            item.put("fullName", e.getFullName());
            item.put("email", e.getEmail());
            item.put("phone", e.getPhone());
            item.put("departmentId", e.getDepartmentId());
            return item;
        }).toList();
    }

    @GetMapping("/contract-types")
    public List<Map<String, Object>> contractTypes() {
        return contractTypeRepository.findAll().stream().map(c -> item(c.getId(), c.getCode(), c.getName())).toList();
    }

    @GetMapping("/shifts")
    public List<Map<String, Object>> shifts() {
        return shiftRepository.findAll().stream().map(s -> item(s.getId(), s.getCode(), s.getName())).toList();
    }

    @GetMapping("/leave-types")
    public List<Map<String, Object>> leaveTypes() {
        return leaveTypeRepository.findAll().stream().map(l -> item(l.getId(), l.getCode(), l.getName())).toList();
    }

    @GetMapping("/request-types")
    public List<Map<String, Object>> requestTypes() {
        return requestTypeRepository.findAll().stream().map(r -> item(r.getId(), r.getCode(), r.getName())).toList();
    }

    private Map<String, Object> item(Object id, String code, String name) {
        return new java.util.LinkedHashMap<>(Map.of("id", id, "code", code == null ? "" : code, "name", name == null ? "" : name));
    }
}
