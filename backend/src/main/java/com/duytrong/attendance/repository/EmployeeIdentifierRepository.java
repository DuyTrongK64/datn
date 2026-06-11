package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.EmployeeIdentifier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.Optional;
import java.util.List;

        public interface EmployeeIdentifierRepository extends JpaRepository<EmployeeIdentifier, UUID> {
            Optional<EmployeeIdentifier> findByIdentifierValueAndActiveTrue(String identifierValue);
    List<EmployeeIdentifier> findByEmployeeId(UUID employeeId);
        }
