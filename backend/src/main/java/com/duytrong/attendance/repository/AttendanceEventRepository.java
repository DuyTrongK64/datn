package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.AttendanceEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.List;
import java.time.LocalDateTime;

        public interface AttendanceEventRepository extends JpaRepository<AttendanceEvent, UUID> {
            boolean existsByDeviceIdAndSequenceNo(UUID deviceId, Long sequenceNo);
    List<AttendanceEvent> findByEmployeeIdAndEventTimeBetweenAndValidTrueOrderByEventTimeAsc(UUID employeeId, LocalDateTime from, LocalDateTime to);
    List<AttendanceEvent> findByEmployeeIdAndEventTimeBetweenOrderByEventTimeAsc(UUID employeeId, LocalDateTime from, LocalDateTime to);
    List<AttendanceEvent> findByDeviceIdOrderByEventTimeDesc(UUID deviceId);
        }
