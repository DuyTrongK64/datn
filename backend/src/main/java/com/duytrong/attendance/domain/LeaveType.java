package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "leave_types", uniqueConstraints = @UniqueConstraint(name = "uk_leave_types_code", columnNames = "code"))
public class LeaveType extends BaseEntity {
    @Column(nullable = false, length = 50)
    private String code;
    @Column(nullable = false, length = 150)
    private String name;
    private boolean paid = true;
    private Double maxDaysPerYear = 12.0;
}
