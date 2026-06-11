package com.duytrong.attendance.repository;

import com.duytrong.attendance.common.enums.RequestStatus;
import com.duytrong.attendance.domain.AttendanceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface AttendanceRequestRepository extends JpaRepository<AttendanceRequest, UUID> {
    List<AttendanceRequest> findByEmployeeId(UUID employeeId);
    List<AttendanceRequest> findByStatus(RequestStatus status);

    @Query("""
            select r
            from AttendanceRequest r
            where r.employeeId = :employeeId
              and r.status = :status
              and r.targetDate <= :date
              and (r.endDate is null or r.endDate >= :date)
            """)
    List<AttendanceRequest> findEffectiveRequests(@Param("employeeId") UUID employeeId,
                                                  @Param("status") RequestStatus status,
                                                  @Param("date") LocalDate date);
}
