package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import com.duytrong.attendance.common.enums.ScheduleType;
import com.duytrong.attendance.common.enums.SourceType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "employee_schedules", uniqueConstraints = @UniqueConstraint(name = "uk_employee_schedule_day", columnNames = {"employeeId", "workDate"}))
public class EmployeeSchedule extends BaseEntity {
    @Column(nullable = false)
    private UUID employeeId;
    @Column(nullable = false)
    private LocalDate workDate;
    private UUID shiftId;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private ScheduleType scheduleType = ScheduleType.WORKING;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private SourceType sourceType = SourceType.MANUAL;
    @Column(length = 255)
    private String note;
}
