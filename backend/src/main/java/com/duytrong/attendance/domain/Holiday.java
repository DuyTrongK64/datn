package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "holidays")
public class Holiday extends BaseEntity {
    private UUID companyId;
    @Column(nullable = false)
    private LocalDate holidayDate;
    @Column(nullable = false, length = 150)
    private String name;
    private boolean paid = true;
}
