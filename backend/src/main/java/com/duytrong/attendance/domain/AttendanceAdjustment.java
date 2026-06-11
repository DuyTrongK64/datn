package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import com.duytrong.attendance.common.enums.AdjustmentType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "attendance_adjustments")
public class AttendanceAdjustment extends BaseEntity {
    private UUID employeeId;
    private LocalDate workDate;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private AdjustmentType adjustmentType;
    @Column(columnDefinition = "text")
    private String oldValue;
    @Column(columnDefinition = "text")
    private String newValue;
    @Column(length = 255)
    private String reason;
    private UUID requestId;
    private UUID approvedBy;
    private LocalDateTime approvedAt;
}
