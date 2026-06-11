package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.WorkPolicy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

        public interface WorkPolicyRepository extends JpaRepository<WorkPolicy, UUID> {

        }
