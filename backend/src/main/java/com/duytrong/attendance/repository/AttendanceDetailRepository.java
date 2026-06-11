package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.AttendanceDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.List;

        public interface AttendanceDetailRepository extends JpaRepository<AttendanceDetail, UUID> {
            void deleteByDailyAttendanceId(UUID dailyAttendanceId);
    List<AttendanceDetail> findByDailyAttendanceId(UUID dailyAttendanceId);
        }
