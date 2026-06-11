package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import com.duytrong.attendance.common.enums.DeviceType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "attendance_devices", uniqueConstraints = @UniqueConstraint(name = "uk_attendance_devices_code", columnNames = "deviceCode"))
public class AttendanceDevice extends BaseEntity {
    @Column(nullable = false)
    private UUID companyId;
    @Column(nullable = false, length = 50)
    private String deviceCode;
    @Column(nullable = false, length = 150)
    private String deviceName;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private DeviceType deviceType = DeviceType.WEB_SIMULATOR;
    @Column(length = 150)
    private String location;
    @Column(length = 80)
    private String ipAddress;
    @Column(nullable = false, length = 255)
    private String apiKeyHash;
    @Column(length = 255)
    private String secretKeyHash;
    private boolean active = true;
    private LocalDateTime lastOnlineAt;
}
