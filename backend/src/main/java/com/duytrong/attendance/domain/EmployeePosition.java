package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "employee_positions")
public class EmployeePosition extends BaseEntity {
    @Column(nullable = false)
    private UUID employeeId;
    @Column(length = 100)
    private String titleCode;
    @Column(length = 150)
    private String titleName;
    private LocalDate startDate;
    private LocalDate endDate;
}
