package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.EmployeeContract;
import com.duytrong.attendance.repository.EmployeeContractRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/employee-contracts")
@PreAuthorize("hasRole('ADMIN')")
public class EmployeeContractController extends SimpleCrudController<EmployeeContract> {
    public EmployeeContractController(EmployeeContractRepository repository) {
        super(repository);
    }
}
