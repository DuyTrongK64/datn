package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.DeviceSyncLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

        public interface DeviceSyncLogRepository extends JpaRepository<DeviceSyncLog, UUID> {

        }
