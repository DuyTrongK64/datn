package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.LoginHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

        public interface LoginHistoryRepository extends JpaRepository<LoginHistory, UUID> {

        }
