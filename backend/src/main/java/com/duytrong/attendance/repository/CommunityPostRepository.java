package com.duytrong.attendance.repository;

import com.duytrong.attendance.domain.CommunityPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CommunityPostRepository extends JpaRepository<CommunityPost, UUID> {
    List<CommunityPost> findTop50ByOrderByCreatedAtDesc();
}
