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
@Table(name = "employees", uniqueConstraints = @UniqueConstraint(name = "uk_employees_company_code", columnNames = {"companyId", "employeeCode"}))
public class Employee extends BaseEntity {
    @Column(nullable = false)
    private UUID companyId;
    @Column(nullable = false, length = 50)
    private String employeeCode;
    @Column(nullable = false, length = 150)
    private String fullName;
    @Column(length = 150)
    private String email;
    @Column(length = 30)
    private String phone;
    @Column(length = 20)
    private String gender;
    private LocalDate dateOfBirth;
    @Column(length = 255)
    private String address;
    private UUID departmentId;
    private LocalDate hireDate;
    private LocalDate leaveDate;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private EmployeeStatus status = EmployeeStatus.WORKING;
}
