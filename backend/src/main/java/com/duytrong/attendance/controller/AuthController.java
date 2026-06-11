package com.duytrong.attendance.controller;

import com.duytrong.attendance.dto.AuthDtos;
import com.duytrong.attendance.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public AuthDtos.LoginResponse login(@RequestBody AuthDtos.LoginRequest request, HttpServletRequest httpRequest) {
        return authService.login(request, httpRequest);
    }

    @PostMapping("/refresh-token")
    public AuthDtos.LoginResponse refresh(@RequestBody AuthDtos.RefreshTokenRequest request) {
        return authService.refresh(request);
    }

    @GetMapping("/me")
    public AuthDtos.UserProfile me(Authentication authentication) {
        return authService.me(authentication.getName());
    }

    @PutMapping("/me")
    public AuthDtos.UserProfile updateMe(@RequestBody AuthDtos.UpdateProfileRequest request, Authentication authentication) {
        return authService.updateMe(authentication.getName(), request);
    }

    @PutMapping("/me/password")
    public void changeMyPassword(@RequestBody AuthDtos.ChangePasswordRequest request, Authentication authentication) {
        authService.changePassword(authentication.getName(), request);
    }
}
