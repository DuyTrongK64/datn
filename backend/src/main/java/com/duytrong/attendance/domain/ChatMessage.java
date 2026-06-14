package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "chat_messages")
public class ChatMessage extends BaseEntity {
    @Column(nullable = false)
    private UUID senderEmployeeId;

    @Column(nullable = false)
    private UUID receiverEmployeeId;

    @Column(nullable = false, columnDefinition = "text")
    private String content;

    private LocalDateTime readAt;
}
