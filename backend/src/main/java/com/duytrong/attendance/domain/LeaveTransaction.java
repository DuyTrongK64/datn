package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import com.duytrong.attendance.common.enums.LeaveTransactionType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "leave_transactions")
public class LeaveTransaction extends BaseEntity {
    private UUID employeeId;
    private UUID leaveTypeId;
    private LocalDate transactionDate;
    private Double days;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private LeaveTransactionType transactionType;
    private UUID requestId;
    @Column(length = 255)
    private String note;
}
