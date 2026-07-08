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

    // Nếu null, ngày nghỉ lễ chỉ áp dụng cho holidayDate.
    // Nếu có giá trị, ngày nghỉ lễ áp dụng từ holidayDate đến endDate.
    private LocalDate endDate;

    @Column(nullable = false, length = 150)
    private String name;

    private boolean paid = true;
}
