package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.ApprovalStep;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.List;

        public interface ApprovalStepRepository extends JpaRepository<ApprovalStep, UUID> {
            List<ApprovalStep> findByRequestIdOrderByStepNo(UUID requestId);
        }
