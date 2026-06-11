package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import com.duytrong.attendance.common.enums.ReportStatus;
import com.duytrong.attendance.common.enums.ReportType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "report_export_histories")
public class ReportExportHistory extends BaseEntity {
    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private ReportType reportType;
    @Column(length = 255)
    private String fileName;
    @Column(length = 500)
    private String filePath;
    private UUID exportedBy;
    private LocalDateTime exportedAt;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private ReportStatus status;
}
