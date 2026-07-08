package com.duytrong.attendance.controller;

import com.duytrong.attendance.common.BusinessException;
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
        normalize(input);
        return super.create(input);
    }

    @Override
    @PutMapping("/{id}")
    public Holiday update(@PathVariable UUID id, @RequestBody Holiday input) {
        normalize(input);
        return super.update(id, input);
    }

    private void normalize(Holiday input) {
        // Đồ án 1 công ty: ngày nghỉ lễ luôn được coi là nghỉ có lương.
        input.setPaid(true);

        if (input.getHolidayDate() == null) {
            throw new BusinessException("Vui lòng chọn ngày bắt đầu nghỉ lễ");
        }

        if (input.getEndDate() != null) {
            if (input.getEndDate().isBefore(input.getHolidayDate())) {
                throw new BusinessException("Ngày kết thúc nghỉ lễ không được trước ngày bắt đầu");
            }

            if (input.getEndDate().equals(input.getHolidayDate())) {
                input.setEndDate(null);
            }
        }
    }
}
