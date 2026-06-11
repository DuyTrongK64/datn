package com.duytrong.attendance.repository;

import com.duytrong.attendance.domain.DailyAttendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DailyAttendanceRepository extends JpaRepository<DailyAttendance, UUID> {
    Optional<DailyAttendance> findByEmployeeIdAndWorkDate(UUID employeeId, LocalDate workDate);
    List<DailyAttendance> findByWorkDateBetween(LocalDate from, LocalDate to);
    List<DailyAttendance> findByEmployeeIdAndWorkDateBetween(UUID employeeId, LocalDate from, LocalDate to);
}
