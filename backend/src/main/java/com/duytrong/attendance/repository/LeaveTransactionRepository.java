package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.LeaveTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

        public interface LeaveTransactionRepository extends JpaRepository<LeaveTransaction, UUID> {

        }
