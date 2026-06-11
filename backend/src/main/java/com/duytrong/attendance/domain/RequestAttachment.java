package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "request_attachments")
public class RequestAttachment extends BaseEntity {
    private UUID requestId;
    @Column(length = 255)
    private String fileName;
    @Column(length = 500)
    private String filePath;
    @Column(length = 100)
    private String contentType;
}
