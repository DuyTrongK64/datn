package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.ShiftBreak;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

        public interface ShiftBreakRepository extends JpaRepository<ShiftBreak, UUID> {

        }
