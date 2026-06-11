package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "system_time_settings")
public class SystemTimeSetting extends BaseEntity {
    @Column(nullable = false)
    private boolean useCustomTime = false;

    private LocalDateTime customDateTime;

    @Column(length = 300)
    private String note;
}
