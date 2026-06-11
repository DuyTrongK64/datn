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
@Table(name = "team_members")
public class TeamMember extends BaseEntity {
    @Column(nullable = false)
    private UUID teamId;
    @Column(nullable = false)
    private UUID employeeId;
    private LocalDate joinedDate;
    private LocalDate leftDate;
    private boolean leader = false;
}
