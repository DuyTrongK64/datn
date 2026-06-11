package com.duytrong.attendance.service;

import com.duytrong.attendance.common.enums.AttendanceStatus;
import com.duytrong.attendance.common.enums.RequestStatus;
import com.duytrong.attendance.dto.DashboardResponse;
import com.duytrong.attendance.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final EmployeeRepository employeeRepository;
    private final DailyAttendanceRepository dailyAttendanceRepository;
    private final AttendanceRequestRepository requestRepository;
    private final AttendanceDeviceRepository deviceRepository;
    private final SystemTimeService systemTimeService;

    public DashboardResponse getDashboard() {
        LocalDate today = systemTimeService.today();
        var attendances = dailyAttendanceRepository.findByWorkDateBetween(today, today);
        long checkedIn = attendances.stream().filter(a -> a.getFirstCheckIn() != null).count();
        long late = attendances.stream().filter(a -> a.getStatus() == AttendanceStatus.LATE).count();
        long absent = attendances.stream().filter(a -> a.getStatus() == AttendanceStatus.ABSENT).count();

        // Trạng thái online của thiết bị là trạng thái kỹ thuật theo thời gian thật,
        // không phụ thuộc vào giờ demo dùng cho nghiệp vụ chấm công.
        LocalDateTime realOnlineThreshold = LocalDateTime.now().minusMinutes(2);
        long online = deviceRepository.findAll().stream()
                .filter(d -> d.getLastOnlineAt() != null && d.getLastOnlineAt().isAfter(realOnlineThreshold))
                .count();
        return new DashboardResponse(
                employeeRepository.count(), checkedIn, late, absent,
                requestRepository.findByStatus(RequestStatus.PENDING).size(),
                deviceRepository.count(), online
        );
    }
}
