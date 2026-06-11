package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import com.duytrong.attendance.common.enums.DeviceStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "device_heartbeats")
public class DeviceHeartbeat extends BaseEntity {
    @Column(nullable = false)
    private UUID deviceId;
    @Column(nullable = false)
    private LocalDateTime heartbeatTime;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private DeviceStatus status = DeviceStatus.ONLINE;
    @Column(length = 255)
    private String message;
}
