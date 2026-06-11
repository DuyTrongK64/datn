package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.List;

        public interface UserRoleRepository extends JpaRepository<UserRole, UUID> {
            List<UserRole> findByUserId(UUID userId);
    void deleteByUserId(UUID userId);
        }
