package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.AttendanceRequest;
import com.duytrong.attendance.dto.AttendanceRequestDtos;
import com.duytrong.attendance.service.AttendanceRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/requests")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class AttendanceRequestController {
    private final AttendanceRequestService requestService;

    @GetMapping
    public List<AttendanceRequest> list(@RequestParam(required = false) String status) {
        return requestService.list(status);
    }

    @PostMapping
    public AttendanceRequest create(@RequestBody AttendanceRequestDtos.CreateRequest request) {
        return requestService.create(request);
    }

    @PostMapping("/{id}/approve")
    @PreAuthorize("hasAnyRole('ADMIN','HR','LEADER')")
    public AttendanceRequest approve(@PathVariable UUID id, @RequestBody AttendanceRequestDtos.ApprovalRequest request) {
        return requestService.approve(id, null, "SYSTEM", request.comment());
    }

    @PostMapping("/{id}/reject")
    @PreAuthorize("hasAnyRole('ADMIN','HR','LEADER')")
    public AttendanceRequest reject(@PathVariable UUID id, @RequestBody AttendanceRequestDtos.ApprovalRequest request) {
        return requestService.reject(id, null, "SYSTEM", request.comment());
    }
}
