package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "contract_types", uniqueConstraints = @UniqueConstraint(name = "uk_contract_types_code", columnNames = "code"))
public class ContractType extends BaseEntity {
    @Column(nullable = false, length = 50)
    private String code;
    @Column(nullable = false, length = 150)
    private String name;
    @Column(length = 255)
    private String description;

    // Lịch/Ca làm việc mặc định áp dụng cho loại hợp đồng này.
    private UUID defaultShiftId;

    private Integer defaultWorkingHoursPerDay = 8;
    private Integer defaultWorkingDaysPerMonth = 22;
    private boolean allowOvertime = true;
    private boolean allowRemoteWork = false;
    private boolean requireAttendanceDevice = true;
    private boolean requireLeaderApproval = true;
}
