package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.RequestType;
import com.duytrong.attendance.repository.RequestTypeRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/request-types")
@PreAuthorize("isAuthenticated()")
public class RequestTypeController extends SimpleCrudController<RequestType> {
    public RequestTypeController(RequestTypeRepository repository) {
        super(repository);
    }
}
