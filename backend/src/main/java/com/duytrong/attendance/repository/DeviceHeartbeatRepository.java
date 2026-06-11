package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.DeviceHeartbeat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

        public interface DeviceHeartbeatRepository extends JpaRepository<DeviceHeartbeat, UUID> {

        }
