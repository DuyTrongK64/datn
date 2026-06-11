package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "work_calendars")
public class WorkCalendar extends BaseEntity {
    private UUID companyId;
    private UUID departmentId;
    @Column(nullable = false)
    private LocalDate workDate;
    private boolean workingDay = true;
    @Column(length = 150)
    private String name;
}
