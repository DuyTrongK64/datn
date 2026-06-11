package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import com.duytrong.attendance.common.enums.IdentifierType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "employee_identifiers", uniqueConstraints = @UniqueConstraint(name = "uk_employee_identifier_value", columnNames = "identifierValue"))
public class EmployeeIdentifier extends BaseEntity {
    @Column(nullable = false)
    private UUID employeeId;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private IdentifierType identifierType = IdentifierType.EMPLOYEE_CODE;
    @Column(nullable = false, length = 100)
    private String identifierValue;
    @Column(nullable = false)
    private boolean active = true;
}
