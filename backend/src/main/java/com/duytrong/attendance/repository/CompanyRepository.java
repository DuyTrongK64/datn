package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.Optional;

        public interface CompanyRepository extends JpaRepository<Company, UUID> {
            Optional<Company> findByCode(String code);
        }
