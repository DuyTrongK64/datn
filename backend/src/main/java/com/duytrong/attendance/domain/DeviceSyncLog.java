package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import com.duytrong.attendance.common.enums.ReportStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "device_sync_logs")
public class DeviceSyncLog extends BaseEntity {
    private UUID deviceId;
    private LocalDateTime syncStartedAt;
    private LocalDateTime syncFinishedAt;
    private Integer totalRecords;
    private Integer successRecords;
    private Integer failedRecords;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private ReportStatus status = ReportStatus.PROCESSING;
}
