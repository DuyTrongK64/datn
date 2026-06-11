package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "request_types", uniqueConstraints = @UniqueConstraint(name = "uk_request_types_code", columnNames = "code"))
public class RequestType extends BaseEntity {
    @Column(nullable = false, length = 50)
    private String code;
    @Column(nullable = false, length = 150)
    private String name;
    @Column(length = 255)
    private String description;
    private boolean requireAttachment = false;
    private boolean requireLeaderApproval = true;
    private boolean requireHrApproval = false;
}
