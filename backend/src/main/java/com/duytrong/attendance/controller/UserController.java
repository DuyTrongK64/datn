package com.duytrong.attendance.controller;

import com.duytrong.attendance.dto.UserDtos;
import com.duytrong.attendance.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class UserController {
    private final UserService userService;

    @GetMapping
    public List<UserDtos.UserResponse> list() {
        return userService.list();
    }

    @PostMapping
    public UserDtos.UserResponse create(@RequestBody UserDtos.UserCreateRequest request) {
        return userService.create(request);
    }

    @PutMapping("/{id}")
    public UserDtos.UserResponse update(@PathVariable UUID id, @RequestBody UserDtos.UserUpdateRequest request) {
        return userService.update(id, request);
    }

    @PostMapping("/{id}/reset-password")
    public void resetPassword(@PathVariable UUID id, @RequestBody Map<String, String> body) {
        userService.resetPassword(id, body.getOrDefault("newPassword", "123456"));
    }
}
