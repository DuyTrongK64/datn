package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "login_histories")
public class LoginHistory extends BaseEntity {
    private UUID userId;
    @Column(length = 100)
    private String username;
    @Column(nullable = false)
    private LocalDateTime loginTime;
    @Column(nullable = false)
    private boolean success;
    @Column(length = 255)
    private String failureReason;
    @Column(length = 80)
    private String ipAddress;
    @Column(length = 500)
    private String userAgent;
}
