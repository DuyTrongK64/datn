package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "monthly_attendance_summaries", uniqueConstraints = @UniqueConstraint(name = "uk_monthly_summary_employee_month", columnNames = {"employeeId", "yearMonth"}))
public class MonthlyAttendanceSummary extends BaseEntity {
    private UUID employeeId;
    @Column(nullable = false, length = 7)
    private String yearMonth;
    private Integer workingDays = 0;
    private Integer actualWorkingDays = 0;
    private Integer totalWorkingMinutes = 0;
    private Integer totalLateMinutes = 0;
    private Integer totalEarlyLeaveMinutes = 0;
    private Integer totalOvertimeMinutes = 0;
    private Double leaveDays = 0.0;
    private Integer absentDays = 0;
}
