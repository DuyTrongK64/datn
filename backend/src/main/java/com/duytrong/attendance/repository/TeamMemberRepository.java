package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.List;

        public interface TeamMemberRepository extends JpaRepository<TeamMember, UUID> {
            List<TeamMember> findByTeamId(UUID teamId);
    List<TeamMember> findByEmployeeId(UUID employeeId);
        }
