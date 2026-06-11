package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import com.duytrong.attendance.common.enums.AttendanceEventType;
import com.duytrong.attendance.common.enums.SourceType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "attendance_details")
public class AttendanceDetail extends BaseEntity {
    private UUID dailyAttendanceId;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private AttendanceEventType eventType;
    private LocalDateTime eventTime;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private SourceType sourceType = SourceType.DEVICE;
    private UUID deviceEventId;
}
