package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "community_posts")
public class CommunityPost extends BaseEntity {
    @Column(nullable = false)
    private UUID employeeId;

    @Column(nullable = false, columnDefinition = "text")
    private String content;

    @Column(length = 30)
    private String visibility = "COMPANY";
}
