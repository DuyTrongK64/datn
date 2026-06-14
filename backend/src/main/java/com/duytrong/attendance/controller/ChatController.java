package com.duytrong.attendance.controller;

import com.duytrong.attendance.common.BusinessException;
import com.duytrong.attendance.domain.ChatMessage;
import com.duytrong.attendance.domain.Employee;
import com.duytrong.attendance.dto.ChatDtos;
import com.duytrong.attendance.repository.ChatMessageRepository;
import com.duytrong.attendance.repository.EmployeeRepository;
import com.duytrong.attendance.service.AccessControlService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class ChatController {
    private final ChatMessageRepository chatMessageRepository;
    private final EmployeeRepository employeeRepository;
    private final AccessControlService accessControlService;


    @GetMapping("/employees")
    public List<java.util.Map<String, Object>> employees() {
        return employeeRepository.findAll().stream().map(employee -> {
            java.util.Map<String, Object> row = new java.util.LinkedHashMap<>();
            row.put("id", employee.getId());
            row.put("employeeCode", employee.getEmployeeCode());
            row.put("fullName", employee.getFullName());
            row.put("email", employee.getEmail());
            row.put("phone", employee.getPhone());
            row.put("departmentId", employee.getDepartmentId());
            return row;
        }).toList();
    }

    @GetMapping("/conversations")
    public List<ChatDtos.ConversationResponse> conversations() {
        UUID me = requireCurrentEmployeeId();
        Map<UUID, ChatDtos.ConversationResponse> result = new LinkedHashMap<>();
        for (ChatMessage message : chatMessageRepository.findRecentForEmployee(me)) {
            UUID otherId = me.equals(message.getSenderEmployeeId()) ? message.getReceiverEmployeeId() : message.getSenderEmployeeId();
            if (result.containsKey(otherId)) continue;
            Employee other = employeeRepository.findById(otherId).orElse(null);
            result.put(otherId, new ChatDtos.ConversationResponse(
                    otherId,
                    other == null ? null : other.getEmployeeCode(),
                    other == null ? "Không xác định" : other.getFullName(),
                    message.getContent(),
                    message.getCreatedAt()
            ));
        }
        return result.values().stream().toList();
    }

    @GetMapping("/messages")
    public List<ChatDtos.ChatMessageResponse> messages(@RequestParam UUID employeeId) {
        UUID me = requireCurrentEmployeeId();
        employeeRepository.findById(employeeId).orElseThrow(() -> new BusinessException("Không tìm thấy nhân viên"));
        return chatMessageRepository.findConversation(me, employeeId).stream()
                .map(message -> toResponse(message, me))
                .toList();
    }

    @PostMapping("/messages")
    public ChatDtos.ChatMessageResponse send(@RequestBody ChatDtos.SendMessageRequest request) {
        UUID me = requireCurrentEmployeeId();
        UUID receiverId = request.receiverEmployeeId();
        if (receiverId == null) throw new BusinessException("Vui lòng chọn người nhận");
        employeeRepository.findById(receiverId).orElseThrow(() -> new BusinessException("Không tìm thấy nhân viên nhận"));
        if (receiverId.equals(me)) throw new BusinessException("Không thể gửi tin nhắn cho chính mình");
        String content = request.content() == null ? "" : request.content().trim();
        if (content.isBlank()) throw new BusinessException("Nội dung tin nhắn là bắt buộc");
        ChatMessage message = new ChatMessage();
        message.setSenderEmployeeId(me);
        message.setReceiverEmployeeId(receiverId);
        message.setContent(content);
        return toResponse(chatMessageRepository.save(message), me);
    }

    private UUID requireCurrentEmployeeId() {
        UUID employeeId = accessControlService.currentEmployeeId();
        if (employeeId == null) throw new BusinessException("Tài khoản chưa gắn nhân viên");
        return employeeId;
    }

    private ChatDtos.ChatMessageResponse toResponse(ChatMessage message, UUID currentEmployeeId) {
        Employee sender = employeeRepository.findById(message.getSenderEmployeeId()).orElse(null);
        Employee receiver = employeeRepository.findById(message.getReceiverEmployeeId()).orElse(null);
        return new ChatDtos.ChatMessageResponse(
                message.getId(),
                message.getSenderEmployeeId(),
                sender == null ? null : sender.getEmployeeCode(),
                sender == null ? "Không xác định" : sender.getFullName(),
                message.getReceiverEmployeeId(),
                receiver == null ? null : receiver.getEmployeeCode(),
                receiver == null ? "Không xác định" : receiver.getFullName(),
                message.getContent(),
                message.getCreatedAt(),
                currentEmployeeId.equals(message.getSenderEmployeeId())
        );
    }
}
