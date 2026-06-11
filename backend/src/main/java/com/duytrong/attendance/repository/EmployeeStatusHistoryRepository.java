package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.EmployeeStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

        public interface EmployeeStatusHistoryRepository extends JpaRepository<EmployeeStatusHistory, UUID> {

        }
