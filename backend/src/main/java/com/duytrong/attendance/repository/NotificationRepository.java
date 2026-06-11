package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.List;

        public interface NotificationRepository extends JpaRepository<Notification, UUID> {
            List<Notification> findByUserIdOrderByCreatedAtDesc(UUID userId);
        }
