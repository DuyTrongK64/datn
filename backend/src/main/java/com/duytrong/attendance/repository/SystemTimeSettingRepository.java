package com.duytrong.attendance.repository;

import com.duytrong.attendance.domain.SystemTimeSetting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SystemTimeSettingRepository extends JpaRepository<SystemTimeSetting, UUID> {
}
