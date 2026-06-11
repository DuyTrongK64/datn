package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import com.duytrong.attendance.common.enums.RequestStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "approval_steps")
public class ApprovalStep extends BaseEntity {
    private UUID requestId;
    private Integer stepNo;
    private UUID approverEmployeeId;
    @Column(length = 50)
    private String approverRole;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private RequestStatus status;
    @Column(length = 255)
    private String comment;
    private LocalDateTime approvedAt;
}
