package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.EmployeePosition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

        public interface EmployeePositionRepository extends JpaRepository<EmployeePosition, UUID> {

        }
