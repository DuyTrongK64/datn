package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.WorkCalendar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

        public interface WorkCalendarRepository extends JpaRepository<WorkCalendar, UUID> {

        }
