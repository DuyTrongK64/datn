package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import com.duytrong.attendance.common.enums.RequestStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "attendance_requests")
public class AttendanceRequest extends BaseEntity {
    @Column(nullable = false)
    private UUID employeeId;
    @Column(nullable = false)
    private UUID requestTypeId;
    @Column(nullable = false)
    private LocalDate targetDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;
    @Column(columnDefinition = "text")
    private String reason;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private RequestStatus status = RequestStatus.PENDING;
}
