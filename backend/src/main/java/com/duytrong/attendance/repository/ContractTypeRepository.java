package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.ContractType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.Optional;

        public interface ContractTypeRepository extends JpaRepository<ContractType, UUID> {
            Optional<ContractType> findByCode(String code);
        }
