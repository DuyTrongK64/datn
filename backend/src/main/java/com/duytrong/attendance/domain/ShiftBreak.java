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
@Table(name = "shift_breaks")
public class ShiftBreak extends BaseEntity {
    @Column(nullable = false)
    private UUID shiftId;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer breakMinutes = 60;
}
