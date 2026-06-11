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
@Table(name = "refresh_tokens", indexes = @Index(name = "idx_refresh_token_hash", columnList = "tokenHash"))
public class RefreshToken extends BaseEntity {
    @Column(nullable = false)
    private UUID userId;
    @Column(nullable = false, length = 128)
    private String tokenHash;
    @Column(nullable = false)
    private LocalDateTime expiredAt;
    @Column(nullable = false)
    private boolean revoked = false;
}
