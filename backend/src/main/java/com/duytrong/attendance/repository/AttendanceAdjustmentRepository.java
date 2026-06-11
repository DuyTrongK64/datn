package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.AttendanceAdjustment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

        public interface AttendanceAdjustmentRepository extends JpaRepository<AttendanceAdjustment, UUID> {

        }
