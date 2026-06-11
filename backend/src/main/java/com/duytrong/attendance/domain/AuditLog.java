package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "audit_logs")
public class AuditLog extends BaseEntity {
    private UUID userId;
    @Column(nullable = false, length = 100)
    private String action;
    @Column(length = 100)
    private String targetType;
    private UUID targetId;
    @Column(columnDefinition = "text")
    private String oldValue;
    @Column(columnDefinition = "text")
    private String newValue;
    @Column(length = 80)
    private String ipAddress;
    @Column(length = 500)
    private String userAgent;
}
