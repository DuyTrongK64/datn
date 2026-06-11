package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.AuditLog;
import com.duytrong.attendance.repository.AuditLogRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/audit-logs")
@PreAuthorize("hasRole('ADMIN')")
public class AuditLogController extends SimpleCrudController<AuditLog> {
    public AuditLogController(AuditLogRepository repository) {
        super(repository);
    }
}
