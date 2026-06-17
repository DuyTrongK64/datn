package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.Holiday;
import com.duytrong.attendance.repository.HolidayRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/holidays")
@PreAuthorize("hasRole('ADMIN')")
public class HolidayController extends SimpleCrudController<Holiday> {
    public HolidayController(HolidayRepository repository) {
        super(repository);
    }

    @Override
    @PostMapping
    public Holiday create(@RequestBody Holiday input) {
        // Đồ án 1 công ty: ngày nghỉ lễ luôn được coi là nghỉ có lương.
        input.setPaid(true);
        return super.create(input);
    }

    @Override
    @PutMapping("/{id}")
    public Holiday update(@PathVariable UUID id, @RequestBody Holiday input) {
        // Không cho UI/API đổi ngày nghỉ lễ thành không lương.
        input.setPaid(true);
        return super.update(id, input);
    }
}
