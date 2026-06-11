package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.EmployeeIdentifier;
import com.duytrong.attendance.repository.EmployeeIdentifierRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/employee-identifiers")
@PreAuthorize("hasAnyRole('ADMIN','HR')")
public class EmployeeIdentifierController extends SimpleCrudController<EmployeeIdentifier> {
    public EmployeeIdentifierController(EmployeeIdentifierRepository repository) {
        super(repository);
    }
}
