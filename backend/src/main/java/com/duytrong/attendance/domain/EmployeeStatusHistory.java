package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import com.duytrong.attendance.common.enums.EmployeeStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "employee_status_histories")
public class EmployeeStatusHistory extends BaseEntity {
    @Column(nullable = false)
    private UUID employeeId;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private EmployeeStatus status;
    private LocalDate startDate;
    private LocalDate endDate;
    @Column(length = 255)
    private String reason;
}
