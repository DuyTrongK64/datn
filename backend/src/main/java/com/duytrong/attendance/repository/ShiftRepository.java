package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.Shift;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.Optional;
import java.util.List;

        public interface ShiftRepository extends JpaRepository<Shift, UUID> {
            Optional<Shift> findByCode(String code);
    List<Shift> findByCompanyId(UUID companyId);
        }
