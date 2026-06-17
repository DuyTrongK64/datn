package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.ContractType;
import com.duytrong.attendance.repository.ContractTypeRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/contract-types")
@PreAuthorize("hasRole('ADMIN')")
public class ContractTypeController extends SimpleCrudController<ContractType> {
    public ContractTypeController(ContractTypeRepository repository) {
        super(repository);
    }
}
