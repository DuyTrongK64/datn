package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import com.duytrong.attendance.common.enums.AttendanceEventType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "attendance_events", indexes = {
        @Index(name = "idx_attendance_events_employee_time", columnList = "employeeId,eventTime"),
        @Index(name = "idx_attendance_events_device_seq", columnList = "deviceId,sequenceNo")
})
public class AttendanceEvent extends BaseEntity {
    private UUID companyId;
    private UUID deviceId;
    @Column(length = 50)
    private String deviceCode;
    @Column(nullable = false, length = 100)
    private String employeeIdentifier;
    private UUID employeeId;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private AttendanceEventType eventType;
    @Column(nullable = false)
    private LocalDateTime eventTime;
    private Long sequenceNo;
    @Column(columnDefinition = "text")
    private String rawData;
    private boolean valid = true;
    @Column(length = 255)
    private String errorMessage;
}
