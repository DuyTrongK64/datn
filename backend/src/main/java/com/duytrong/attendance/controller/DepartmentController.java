package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.Department;
import com.duytrong.attendance.repository.DepartmentRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/departments")
@PreAuthorize("hasAnyRole('ADMIN','HR','LEADER')")
public class DepartmentController extends SimpleCrudController<Department> {
    public DepartmentController(DepartmentRepository repository) {
        super(repository);
    }
}
