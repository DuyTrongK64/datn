package com.duytrong.attendance.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class CommunityDtos {
    public record CreatePostRequest(String content) {}
    public record CreateCommentRequest(String content) {}
    public record CommentResponse(
            UUID id,
            UUID postId,
            UUID employeeId,
            String employeeCode,
            String employeeName,
            String content,
            LocalDateTime createdAt
    ) {}
    public record PostResponse(
            UUID id,
            UUID employeeId,
            String employeeCode,
            String employeeName,
            String departmentName,
            String content,
            LocalDateTime createdAt,
            long commentCount,
            List<CommentResponse> comments
    ) {}
}
