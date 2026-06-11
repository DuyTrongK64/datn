package com.duytrong.attendance.domain;

import com.duytrong.attendance.common.BaseEntity;
import com.duytrong.attendance.common.enums.GenericStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Duration;
import java.time.LocalTime;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "shifts", uniqueConstraints = @UniqueConstraint(name = "uk_shifts_company_code", columnNames = {"companyId", "code"}))
public class Shift extends BaseEntity {
    @Column(nullable = false)
    private UUID companyId;
    @Column(nullable = false, length = 50)
    private String code;
    @Column(nullable = false, length = 150)
    private String name;
    @Column(nullable = false)
    private LocalTime startTime;
    @Column(nullable = false)
    private LocalTime endTime;

    // Thời gian nghỉ trưa/nghỉ giữa ca. Nếu để trống, hệ thống dùng lunchBreakMinutes.
    private LocalTime lunchStartTime;
    private LocalTime lunchEndTime;
    private Integer lunchBreakMinutes = 60;

    // Số phút làm chuẩn sau khi trừ nghỉ trưa. Nếu không nhập, backend sẽ tự tính từ start/end/lunch.
    private Integer workingMinutes = 480;
    private Integer minWorkingMinutesPerDay = 480;
    private Integer lateToleranceMinutes = 5;
    private Integer earlyLeaveToleranceMinutes = 5;

    private boolean crossDay = false;
    private boolean flexible = false;
    private boolean remoteAllowed = false;
    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private GenericStatus status = GenericStatus.ACTIVE;

    public int resolveWorkingMinutes() {
        if (workingMinutes != null && workingMinutes > 0) return workingMinutes;
        if (startTime == null || endTime == null) return 0;
        long total = Duration.between(startTime, endTime).toMinutes();
        if (crossDay && total < 0) total += 24 * 60;
        return Math.max(0, (int) total - resolveLunchBreakMinutes());
    }

    public int resolveLunchBreakMinutes() {
        if (lunchStartTime != null && lunchEndTime != null) {
            long minutes = Duration.between(lunchStartTime, lunchEndTime).toMinutes();
            if (minutes < 0) minutes += 24 * 60;
            return Math.max(0, (int) minutes);
        }
        return lunchBreakMinutes == null ? 0 : Math.max(0, lunchBreakMinutes);
    }
}
