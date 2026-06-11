package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import com.duytrong.attendance.common.enums.NotificationType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "notifications")
public class Notification extends BaseEntity {
    private UUID userId;
    @Column(nullable = false, length = 150)
    private String title;
    @Column(columnDefinition = "text")
    private String content;
    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private NotificationType type = NotificationType.SYSTEM;
    private boolean readStatus = false;
}
