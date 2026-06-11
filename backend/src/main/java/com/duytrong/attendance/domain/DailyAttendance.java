package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import com.duytrong.attendance.common.enums.AttendanceStatus;
import com.duytrong.attendance.common.enums.CalculationStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "daily_attendances", uniqueConstraints = @UniqueConstraint(name = "uk_daily_attendance_employee_date", columnNames = {"employeeId", "workDate"}))
public class DailyAttendance extends BaseEntity {
    @Column(nullable = false)
    private UUID employeeId;
    @Column(nullable = false)
    private LocalDate workDate;
    private UUID scheduleId;
    private UUID shiftId;
    private LocalDateTime plannedStartTime;
    private LocalDateTime plannedEndTime;
    private LocalDateTime plannedLunchStartTime;
    private LocalDateTime plannedLunchEndTime;
    private Integer plannedWorkingMinutes = 0;
    private LocalDateTime firstCheckIn;
    private LocalDateTime lastCheckOut;
    private LocalDateTime firstBreakIn;
    private LocalDateTime lastBreakOut;
    private Integer totalWorkingMinutes = 0;
    private Integer breakMinutes = 0;
    private Integer lateMinutes = 0;
    private Integer earlyLeaveMinutes = 0;
    private Integer overtimeMinutes = 0;
    private Integer approvedLeaveMinutes = 0;
    @Column(columnDefinition = "text")
    private String approvedRequestTypes;
    private Integer nightWorkingMinutes = 0;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private AttendanceStatus status = AttendanceStatus.ABSENT;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private CalculationStatus calculationStatus = CalculationStatus.NOT_CALCULATED;
}
