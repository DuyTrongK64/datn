package com.duytrong.attendance.controller;

import com.duytrong.attendance.dto.SystemTimeDtos;
import com.duytrong.attendance.service.SystemTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/system-time")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class SystemTimeController {
    private final SystemTimeService service;

    @GetMapping
    public SystemTimeDtos.SystemTimeResponse get() {
        return service.getSettingResponse();
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public SystemTimeDtos.SystemTimeResponse update(@RequestBody SystemTimeDtos.UpdateSystemTimeRequest request) {
        return service.update(request);
    }
}
