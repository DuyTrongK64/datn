package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.Notification;
import com.duytrong.attendance.repository.NotificationRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/notifications")
@PreAuthorize("isAuthenticated()")
public class NotificationController extends SimpleCrudController<Notification> {
    public NotificationController(NotificationRepository repository) {
        super(repository);
    }
}
