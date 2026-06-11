package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.AttendanceDevice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.Optional;

        public interface AttendanceDeviceRepository extends JpaRepository<AttendanceDevice, UUID> {
            Optional<AttendanceDevice> findByDeviceCode(String deviceCode);
        }
