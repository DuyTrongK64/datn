package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.WorkPolicy;
import com.duytrong.attendance.repository.WorkPolicyRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/work-policies")
@PreAuthorize("hasAnyRole('ADMIN','HR')")
public class WorkPolicyController extends SimpleCrudController<WorkPolicy> {
    public WorkPolicyController(WorkPolicyRepository repository) {
        super(repository);
    }
}
