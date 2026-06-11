package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import com.duytrong.attendance.common.enums.ContractStatus;
import com.duytrong.attendance.common.enums.SalaryType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "employee_contracts")
public class EmployeeContract extends BaseEntity {
    @Column(nullable = false)
    private UUID employeeId;
    @Column(nullable = false)
    private UUID contractTypeId;
    @Column(length = 100)
    private String contractNo;
    private LocalDate startDate;
    private LocalDate endDate;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private SalaryType salaryType = SalaryType.MONTHLY;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private ContractStatus status = ContractStatus.ACTIVE;
}
