package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.EmployeePosition;
import com.duytrong.attendance.repository.EmployeePositionRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/employee-positions")
@PreAuthorize("hasAnyRole('ADMIN','HR')")
public class EmployeePositionController extends SimpleCrudController<EmployeePosition> {
    public EmployeePositionController(EmployeePositionRepository repository) {
        super(repository);
    }
}
