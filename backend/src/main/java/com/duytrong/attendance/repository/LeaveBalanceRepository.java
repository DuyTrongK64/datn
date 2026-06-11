package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.LeaveBalance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.List;

        public interface LeaveBalanceRepository extends JpaRepository<LeaveBalance, UUID> {
            List<LeaveBalance> findByEmployeeId(UUID employeeId);
        }
