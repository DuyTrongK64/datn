package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.Shift;
import com.duytrong.attendance.repository.ShiftRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/shifts")
@PreAuthorize("hasRole('ADMIN')")
public class ShiftController extends SimpleCrudController<Shift> {
    public ShiftController(ShiftRepository repository) {
        super(repository);
    }
}
