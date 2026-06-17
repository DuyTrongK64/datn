package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.ShiftBreak;
import com.duytrong.attendance.repository.ShiftBreakRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/shift-breaks")
@PreAuthorize("hasRole('ADMIN')")
public class ShiftBreakController extends SimpleCrudController<ShiftBreak> {
    public ShiftBreakController(ShiftBreakRepository repository) {
        super(repository);
    }
}
