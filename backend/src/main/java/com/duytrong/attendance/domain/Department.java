package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import com.duytrong.attendance.common.enums.GenericStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "departments")
public class Department extends BaseEntity {
    @Column(nullable = false)
    private UUID companyId;
    @Column(nullable = false, length = 50)
    private String code;
    @Column(nullable = false, length = 150)
    private String name;
    private UUID parentId;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private GenericStatus status = GenericStatus.ACTIVE;
}
