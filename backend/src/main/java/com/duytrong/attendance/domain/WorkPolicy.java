package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "work_policies")
public class WorkPolicy extends BaseEntity {
    private UUID contractTypeId;
    @Column(nullable = false, length = 150)
    private String name;
    private LocalTime standardStartTime;
    private LocalTime standardEndTime;
    private Integer breakMinutes = 60;
    private Integer lateToleranceMinutes = 5;
    private Integer earlyLeaveToleranceMinutes = 5;
    private Integer minWorkingMinutesPerDay = 480;
    private Integer overtimeStartAfterMinutes = 480;
    private boolean allowFlexibleCheckIn = false;
    private boolean allowRemoteWork = false;
}
