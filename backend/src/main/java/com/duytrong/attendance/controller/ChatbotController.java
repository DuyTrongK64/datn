package com.duytrong.attendance.controller;

import com.duytrong.attendance.dto.ChatDtos;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/chatbot")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class ChatbotController {
    @PostMapping("/ask")
    public ChatDtos.ChatbotResponse ask(@RequestBody ChatDtos.ChatbotRequest request) {
        String message = request.message() == null ? "" : request.message().toLowerCase();
        String answer;
        if (message.contains("quên") || message.contains("bổ sung") || message.contains("check")) {
            answer = "Nếu quên chấm công, bạn vào Đơn từ → Đơn bổ sung chấm công, chọn ngày và giờ cần bổ sung rồi gửi đơn chờ duyệt.";
        } else if (message.contains("nghỉ") || message.contains("phép")) {
            answer = "Để xin nghỉ phép, bạn vào Đơn từ → Đơn xin nghỉ phép. Khi đơn được duyệt, hệ thống tự trừ phép theo quy đổi 8 giờ = 1 ngày.";
        } else if (message.contains("muộn") || message.contains("về sớm") || message.contains("ra ngoài")) {
            answer = "Các đơn đi muộn, về sớm hoặc ra ngoài được tạo trong nhóm Đơn từ. Sau khi duyệt, dữ liệu này được ưu tiên khi tính bảng công.";
        } else if (message.contains("ot") || message.contains("làm thêm")) {
            answer = "Làm thêm giờ được ghi nhận qua dữ liệu chấm công và đơn OT đã duyệt. Nếu làm vào ngày nghỉ lễ/cuối tuần, hệ thống không đánh giá muộn/về sớm mà tính thời gian làm vào OT ngày nghỉ.";
        } else if (message.contains("leader") || message.contains("team")) {
            answer = "Leader chỉ xem dữ liệu thành viên trong team và có quyền phê duyệt đơn của team, nhưng không được thêm/sửa/xóa dữ liệu cấu hình.";
        } else {
            answer = "Bạn có thể hỏi về chấm công, quên check-in/check-out, nghỉ phép, đi muộn, về sớm, OT hoặc quyền của Leader/Admin trong hệ thống.";
        }
        return new ChatDtos.ChatbotResponse(answer);
    }
}
