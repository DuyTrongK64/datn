package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.Optional;
import java.util.List;

        public interface RoleRepository extends JpaRepository<Role, UUID> {
            Optional<Role> findByCode(String code);
    List<Role> findByCodeIn(List<String> codes);
        }
