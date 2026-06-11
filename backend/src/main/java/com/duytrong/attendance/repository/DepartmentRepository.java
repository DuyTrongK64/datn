package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.List;

        public interface DepartmentRepository extends JpaRepository<Department, UUID> {
            List<Department> findByCompanyId(UUID companyId);
        }
