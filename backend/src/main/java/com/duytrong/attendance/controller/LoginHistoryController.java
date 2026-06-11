package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.LoginHistory;
import com.duytrong.attendance.repository.LoginHistoryRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/login-histories")
@PreAuthorize("hasRole('ADMIN')")
public class LoginHistoryController extends SimpleCrudController<LoginHistory> {
    public LoginHistoryController(LoginHistoryRepository repository) {
        super(repository);
    }
}
