package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.MonthlyAttendanceSummary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

        public interface MonthlyAttendanceSummaryRepository extends JpaRepository<MonthlyAttendanceSummary, UUID> {

        }
