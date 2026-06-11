package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.EmployeeSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.Optional;
import java.util.List;
import java.time.LocalDate;

        public interface EmployeeScheduleRepository extends JpaRepository<EmployeeSchedule, UUID> {
            Optional<EmployeeSchedule> findByEmployeeIdAndWorkDate(UUID employeeId, LocalDate workDate);
    List<EmployeeSchedule> findByEmployeeIdAndWorkDateBetween(UUID employeeId, LocalDate from, LocalDate to);
        }
