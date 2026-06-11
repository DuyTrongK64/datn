package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.List;

        public interface TeamRepository extends JpaRepository<Team, UUID> {
            List<Team> findByDepartmentId(UUID departmentId);
    List<Team> findByLeaderEmployeeId(UUID leaderEmployeeId);
        }
