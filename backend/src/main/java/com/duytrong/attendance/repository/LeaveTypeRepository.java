package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.LeaveType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.Optional;

        public interface LeaveTypeRepository extends JpaRepository<LeaveType, UUID> {
            Optional<LeaveType> findByCode(String code);
        }
