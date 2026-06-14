package com.duytrong.attendance.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class ChatDtos {
    public record SendMessageRequest(UUID receiverEmployeeId, String content) {}
    public record ChatMessageResponse(
            UUID id,
            UUID senderEmployeeId,
            String senderCode,
            String senderName,
            UUID receiverEmployeeId,
            String receiverCode,
            String receiverName,
            String content,
            LocalDateTime createdAt,
            boolean mine
    ) {}
    public record ConversationResponse(
            UUID employeeId,
            String employeeCode,
            String employeeName,
            String lastMessage,
            LocalDateTime lastMessageAt
    ) {}
    public record ChatbotRequest(String message) {}
    public record ChatbotResponse(String answer) {}
}
