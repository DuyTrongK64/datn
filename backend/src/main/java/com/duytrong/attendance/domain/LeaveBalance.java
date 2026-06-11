package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "leave_balances", uniqueConstraints = @UniqueConstraint(name = "uk_leave_balance_employee_year_type", columnNames = {"employeeId", "leave_year", "leaveTypeId"}))
public class LeaveBalance extends BaseEntity {
    private UUID employeeId;
    @Column(name = "leave_year")
    private Integer year;
    private UUID leaveTypeId;
    private Double totalDays = 0.0;
    private Double usedDays = 0.0;
    private Double remainingDays = 0.0;
}
