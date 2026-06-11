package com.duytrong.attendance.service;

import com.duytrong.attendance.domain.SystemTimeSetting;
import com.duytrong.attendance.dto.SystemTimeDtos;
import com.duytrong.attendance.repository.SystemTimeSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SystemTimeService {
    private final SystemTimeSettingRepository repository;

    public LocalDateTime now() {
        SystemTimeSetting setting = getOrCreate();
        if (setting.isUseCustomTime() && setting.getCustomDateTime() != null) {
            return setting.getCustomDateTime();
        }
        return LocalDateTime.now();
    }

    public LocalDate today() {
        return now().toLocalDate();
    }

    @Transactional
    public SystemTimeDtos.SystemTimeResponse getSettingResponse() {
        return toResponse(getOrCreate());
    }

    @Transactional
    public SystemTimeDtos.SystemTimeResponse update(SystemTimeDtos.UpdateSystemTimeRequest request) {
        SystemTimeSetting setting = getOrCreate();
        setting.setUseCustomTime(request.useCustomTime());
        setting.setCustomDateTime(request.customDateTime());
        setting.setNote(request.note());
        setting = repository.save(setting);
        return toResponse(setting);
    }

    private SystemTimeSetting getOrCreate() {
        return repository.findAll().stream().findFirst().orElseGet(() -> {
            SystemTimeSetting setting = new SystemTimeSetting();
            setting.setUseCustomTime(false);
            setting.setCustomDateTime(LocalDateTime.now());
            setting.setNote("Mặc định dùng giờ thực tế của máy chủ");
            return repository.save(setting);
        });
    }

    private SystemTimeDtos.SystemTimeResponse toResponse(SystemTimeSetting setting) {
        LocalDateTime realNow = LocalDateTime.now();
        LocalDateTime effectiveNow = setting.isUseCustomTime() && setting.getCustomDateTime() != null
                ? setting.getCustomDateTime()
                : realNow;
        return new SystemTimeDtos.SystemTimeResponse(
                setting.getId(),
                setting.isUseCustomTime(),
                setting.getCustomDateTime(),
                realNow,
                effectiveNow,
                effectiveNow.toLocalDate(),
                setting.getNote()
        );
    }
}
