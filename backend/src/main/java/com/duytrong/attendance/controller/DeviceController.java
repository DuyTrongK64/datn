package com.duytrong.attendance.controller;

import com.duytrong.attendance.common.BusinessException;
import com.duytrong.attendance.domain.AppUser;
import com.duytrong.attendance.domain.AttendanceDevice;
import com.duytrong.attendance.domain.AttendanceEvent;
import com.duytrong.attendance.domain.Employee;
import com.duytrong.attendance.dto.DeviceDtos;
import com.duytrong.attendance.repository.AppUserRepository;
import com.duytrong.attendance.repository.AttendanceDeviceRepository;
import com.duytrong.attendance.repository.AttendanceEventRepository;
import com.duytrong.attendance.repository.EmployeeRepository;
import com.duytrong.attendance.service.DeviceIngestionService;
import com.duytrong.attendance.service.SystemTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/devices")
@RequiredArgsConstructor
public class DeviceController {
    private final AttendanceDeviceRepository deviceRepository;
    private final DeviceIngestionService ingestionService;
    private final PasswordEncoder passwordEncoder;
    private final AppUserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final AttendanceEventRepository eventRepository;
    private final SystemTimeService systemTimeService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<DeviceDtos.DeviceResponse> list() {
        return deviceRepository.findAll().stream().map(this::toResponse).toList();
    }

    @GetMapping("/my-today-events")
    public List<DeviceDtos.PunchHistoryResponse> myTodayEvents(Authentication authentication) {
        AppUser user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new BusinessException("Không tìm thấy tài khoản"));
        if (user.getEmployeeId() == null) {
            return List.of();
        }
        LocalDate today = systemTimeService.today();
        return eventRepository.findByEmployeeIdAndEventTimeBetweenOrderByEventTimeAsc(
                        user.getEmployeeId(), today.atStartOfDay(), today.plusDays(1).atStartOfDay().minusNanos(1))
                .stream()
                .map(this::toPunchHistoryResponse)
                .toList();
    }

    @PostMapping("/my-punch")
    public DeviceDtos.DeviceEventResponse myPunch(@RequestBody DeviceDtos.UserPunchRequest request, Authentication authentication) {
        if (request.eventType() == null) {
            throw new BusinessException("Vui lòng chọn loại chấm công");
        }
        AppUser user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new BusinessException("Không tìm thấy tài khoản"));
        if (user.getEmployeeId() == null) {
            throw new BusinessException("Tài khoản hiện tại chưa gắn nhân viên");
        }
        Employee employee = employeeRepository.findById(user.getEmployeeId())
                .orElseThrow(() -> new BusinessException("Không tìm thấy nhân viên của tài khoản hiện tại"));
        return ingestionService.ingestEmployeePunch(employee.getId(), employee.getEmployeeCode(), request.eventType());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public DeviceDtos.DeviceResponse create(@RequestBody DeviceDtos.DeviceCreateRequest request) {
        AttendanceDevice device = new AttendanceDevice();
        device.setCompanyId(request.companyId());
        device.setDeviceCode(request.deviceCode());
        device.setDeviceName(request.deviceName());
        device.setDeviceType(request.deviceType());
        device.setLocation(request.location());
        device.setIpAddress(request.ipAddress());
        device.setApiKeyHash(passwordEncoder.encode(request.apiKey()));
        device.setActive(request.active());
        return toResponse(deviceRepository.save(device));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public DeviceDtos.DeviceResponse update(@PathVariable UUID id, @RequestBody DeviceDtos.DeviceCreateRequest request) {
        AttendanceDevice device = deviceRepository.findById(id).orElseThrow(() -> new BusinessException("Không tìm thấy thiết bị"));
        device.setCompanyId(request.companyId());
        device.setDeviceCode(request.deviceCode());
        device.setDeviceName(request.deviceName());
        device.setDeviceType(request.deviceType());
        device.setLocation(request.location());
        device.setIpAddress(request.ipAddress());
        if (request.apiKey() != null && !request.apiKey().isBlank()) {
            device.setApiKeyHash(passwordEncoder.encode(request.apiKey()));
        }
        device.setActive(request.active());
        return toResponse(deviceRepository.save(device));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable UUID id) {
        deviceRepository.deleteById(id);
    }

    @PostMapping("/{deviceCode}/events")
    public DeviceDtos.DeviceEventResponse ingest(@PathVariable String deviceCode,
                                                 @RequestHeader("X-Api-Key") String apiKey,
                                                 @RequestBody DeviceDtos.DeviceEventRequest request) {
        return ingestionService.ingest(deviceCode, apiKey, request);
    }

    @PostMapping("/{deviceCode}/events/batch")
    public List<DeviceDtos.DeviceEventResponse> ingestBatch(@PathVariable String deviceCode,
                                                            @RequestHeader("X-Api-Key") String apiKey,
                                                            @RequestBody DeviceDtos.BatchDeviceEventRequest request) {
        return ingestionService.ingestBatch(deviceCode, apiKey, request);
    }

    @PostMapping("/{deviceCode}/heartbeat")
    public void heartbeat(@PathVariable String deviceCode,
                          @RequestHeader("X-Api-Key") String apiKey,
                          @RequestBody DeviceDtos.HeartbeatRequest request) {
        ingestionService.heartbeat(deviceCode, apiKey, request);
    }

    private DeviceDtos.DeviceResponse toResponse(AttendanceDevice device) {
        return new DeviceDtos.DeviceResponse(device.getId(), device.getCompanyId(), device.getDeviceCode(), device.getDeviceName(),
                device.getDeviceType(), device.getLocation(), device.getIpAddress(), device.isActive(), device.getLastOnlineAt());
    }

    private DeviceDtos.PunchHistoryResponse toPunchHistoryResponse(AttendanceEvent event) {
        return new DeviceDtos.PunchHistoryResponse(
                event.getId(),
                event.getEventType(),
                event.getEventTime(),
                event.getDeviceCode(),
                event.getEmployeeIdentifier(),
                event.isValid(),
                event.getErrorMessage()
        );
    }
}
