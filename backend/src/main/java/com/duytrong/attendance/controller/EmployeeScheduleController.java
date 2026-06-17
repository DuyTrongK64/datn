package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.EmployeeSchedule;
import com.duytrong.attendance.repository.EmployeeScheduleRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/schedules")
@PreAuthorize("hasAnyRole('ADMIN','LEADER')")
public class EmployeeScheduleController extends SimpleCrudController<EmployeeSchedule> {
    public EmployeeScheduleController(EmployeeScheduleRepository repository) {
        super(repository);
    }
}
