package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.RequestType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.Optional;

        public interface RequestTypeRepository extends JpaRepository<RequestType, UUID> {
            Optional<RequestType> findByCode(String code);
        }
