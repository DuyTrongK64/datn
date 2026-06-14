package com.duytrong.attendance.controller;

import com.duytrong.attendance.common.BusinessException;
import com.duytrong.attendance.domain.CommunityPost;
import com.duytrong.attendance.domain.Department;
import com.duytrong.attendance.domain.Employee;
import com.duytrong.attendance.domain.PostComment;
import com.duytrong.attendance.dto.CommunityDtos;
import com.duytrong.attendance.repository.CommunityPostRepository;
import com.duytrong.attendance.repository.DepartmentRepository;
import com.duytrong.attendance.repository.EmployeeRepository;
import com.duytrong.attendance.repository.PostCommentRepository;
import com.duytrong.attendance.service.AccessControlService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/community")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class CommunityController {
    private final CommunityPostRepository postRepository;
    private final PostCommentRepository commentRepository;
    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final AccessControlService accessControlService;

    @GetMapping("/posts")
    public List<CommunityDtos.PostResponse> posts() {
        List<CommunityPost> posts = postRepository.findTop50ByOrderByCreatedAtDesc();
        return posts.stream().map(post -> toPostResponse(post, true)).toList();
    }

    @PostMapping("/posts")
    public CommunityDtos.PostResponse createPost(@RequestBody CommunityDtos.CreatePostRequest request) {
        UUID employeeId = accessControlService.currentEmployeeId();
        if (employeeId == null) throw new BusinessException("Tài khoản chưa gắn nhân viên");
        String content = request.content() == null ? "" : request.content().trim();
        if (content.isBlank()) throw new BusinessException("Nội dung bài đăng là bắt buộc");
        CommunityPost post = new CommunityPost();
        post.setEmployeeId(employeeId);
        post.setContent(content);
        post = postRepository.save(post);
        return toPostResponse(post, true);
    }

    @PostMapping("/posts/{postId}/comments")
    public CommunityDtos.CommentResponse createComment(@PathVariable UUID postId, @RequestBody CommunityDtos.CreateCommentRequest request) {
        UUID employeeId = accessControlService.currentEmployeeId();
        if (employeeId == null) throw new BusinessException("Tài khoản chưa gắn nhân viên");
        if (!postRepository.existsById(postId)) throw new BusinessException("Không tìm thấy bài đăng");
        String content = request.content() == null ? "" : request.content().trim();
        if (content.isBlank()) throw new BusinessException("Nội dung bình luận là bắt buộc");
        PostComment comment = new PostComment();
        comment.setPostId(postId);
        comment.setEmployeeId(employeeId);
        comment.setContent(content);
        return toCommentResponse(commentRepository.save(comment));
    }

    private CommunityDtos.PostResponse toPostResponse(CommunityPost post, boolean includeComments) {
        Employee employee = employeeRepository.findById(post.getEmployeeId()).orElse(null);
        Department department = employee != null && employee.getDepartmentId() != null
                ? departmentRepository.findById(employee.getDepartmentId()).orElse(null)
                : null;
        List<CommunityDtos.CommentResponse> comments = includeComments
                ? commentRepository.findByPostIdOrderByCreatedAtAsc(post.getId()).stream().map(this::toCommentResponse).toList()
                : List.of();
        return new CommunityDtos.PostResponse(
                post.getId(),
                post.getEmployeeId(),
                employee == null ? null : employee.getEmployeeCode(),
                employee == null ? "Không xác định" : employee.getFullName(),
                department == null ? null : department.getName(),
                post.getContent(),
                post.getCreatedAt(),
                commentRepository.countByPostId(post.getId()),
                comments
        );
    }

    private CommunityDtos.CommentResponse toCommentResponse(PostComment comment) {
        Employee employee = employeeRepository.findById(comment.getEmployeeId()).orElse(null);
        return new CommunityDtos.CommentResponse(
                comment.getId(),
                comment.getPostId(),
                comment.getEmployeeId(),
                employee == null ? null : employee.getEmployeeCode(),
                employee == null ? "Không xác định" : employee.getFullName(),
                comment.getContent(),
                comment.getCreatedAt()
        );
    }
}
