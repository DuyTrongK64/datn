package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.LeaveType;
import com.duytrong.attendance.repository.LeaveTypeRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/leave-types")
@PreAuthorize("hasRole('ADMIN')")
public class LeaveTypeController extends SimpleCrudController<LeaveType> {
    public LeaveTypeController(LeaveTypeRepository repository) {
        super(repository);
    }
}
