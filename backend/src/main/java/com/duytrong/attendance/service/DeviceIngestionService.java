package com.duytrong.attendance.service;

import com.duytrong.attendance.common.BusinessException;
import com.duytrong.attendance.common.enums.AttendanceEventType;
import com.duytrong.attendance.common.enums.DeviceStatus;
import com.duytrong.attendance.domain.*;
import com.duytrong.attendance.dto.DeviceDtos;
import com.duytrong.attendance.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DeviceIngestionService {
    private final AttendanceDeviceRepository deviceRepository;
    private final EmployeeRepository employeeRepository;
    private final AttendanceEventRepository eventRepository;
    private final DeviceHeartbeatRepository heartbeatRepository;
    private final AttendanceCalculationService calculationService;
    private final PasswordEncoder passwordEncoder;
    private final SystemTimeService systemTimeService;

    @Transactional
    public DeviceDtos.DeviceEventResponse ingest(String deviceCode, String apiKey, DeviceDtos.DeviceEventRequest request) {
        AttendanceDevice device = validateDevice(deviceCode, apiKey);
        markDeviceOnline(device);
        if (request.sequenceNo() != null && eventRepository.existsByDeviceIdAndSequenceNo(device.getId(), request.sequenceNo())) {
            return new DeviceDtos.DeviceEventResponse(true, "Log đã tồn tại, bỏ qua để chống trùng", null, null, null);
        }

        AttendanceEvent event = new AttendanceEvent();
        event.setCompanyId(device.getCompanyId());
        event.setDeviceId(device.getId());
        event.setDeviceCode(device.getDeviceCode());
        event.setEmployeeIdentifier(request.employeeIdentifier());
        event.setEventType(request.eventType());
        event.setEventTime(request.eventTime() == null ? systemTimeService.now() : request.eventTime());
        event.setSequenceNo(request.sequenceNo());
        event.setRawData(request.toString());

        Employee employee = employeeRepository.findByEmployeeCodeIgnoreCase(request.employeeIdentifier()).orElse(null);
        if (employee == null) {
            event.setValid(false);
            event.setErrorMessage("Không tìm thấy nhân viên theo mã nhân viên");
            event = eventRepository.save(event);
            return new DeviceDtos.DeviceEventResponse(false, event.getErrorMessage(), event.getId(), null, null);
        }

        event.setEmployeeId(employee.getId());
        event.setEmployeeIdentifier(employee.getEmployeeCode());
        event.setValid(true);
        event = eventRepository.save(event);
        DailyAttendance daily = calculationService.recalculate(employee.getId(), event.getEventTime().toLocalDate());
        return new DeviceDtos.DeviceEventResponse(true, "Đã nhận log chấm công", event.getId(), employee.getId(), daily.getStatus().name());
    }

    @Transactional
    public DeviceDtos.DeviceEventResponse ingestEmployeePunch(UUID employeeId, String employeeCode, AttendanceEventType eventType) {
        AttendanceDevice device = deviceRepository.findAll().stream()
                .filter(AttendanceDevice::isActive)
                .findFirst()
                .orElseThrow(() -> new BusinessException("Chưa có thiết bị chấm công đang hoạt động"));
        markDeviceOnline(device);

        AttendanceEvent event = new AttendanceEvent();
        event.setCompanyId(device.getCompanyId());
        event.setDeviceId(device.getId());
        event.setDeviceCode(device.getDeviceCode());
        event.setEmployeeId(employeeId);
        event.setEmployeeIdentifier(employeeCode == null || employeeCode.isBlank() ? employeeId.toString() : employeeCode);
        event.setEventType(eventType);
        event.setEventTime(systemTimeService.now());
        event.setRawData("WEB_PUNCH:" + eventType.name());
        event.setValid(true);
        event = eventRepository.save(event);

        DailyAttendance daily = calculationService.recalculate(employeeId, event.getEventTime().toLocalDate());
        return new DeviceDtos.DeviceEventResponse(true, "Đã ghi nhận chấm công", event.getId(), employeeId, daily.getStatus().name());
    }

    @Transactional
    public List<DeviceDtos.DeviceEventResponse> ingestBatch(String deviceCode, String apiKey, DeviceDtos.BatchDeviceEventRequest request) {
        List<DeviceDtos.DeviceEventResponse> result = new ArrayList<>();
        for (DeviceDtos.DeviceEventRequest event : request.events()) {
            result.add(ingest(deviceCode, apiKey, event));
        }
        return result;
    }

    @Transactional
    public void heartbeat(String deviceCode, String apiKey, DeviceDtos.HeartbeatRequest request) {
        AttendanceDevice device = validateDevice(deviceCode, apiKey);
        markDeviceOnline(device);

        DeviceHeartbeat heartbeat = new DeviceHeartbeat();
        heartbeat.setDeviceId(device.getId());
        heartbeat.setHeartbeatTime(LocalDateTime.now());
        heartbeat.setStatus(request.status() == null ? DeviceStatus.ONLINE : DeviceStatus.valueOf(request.status()));
        heartbeat.setMessage(request.message());
        heartbeatRepository.save(heartbeat);
    }

    private AttendanceDevice validateDevice(String deviceCode, String apiKey) {
        AttendanceDevice device = deviceRepository.findByDeviceCode(deviceCode)
                .orElseThrow(() -> new BusinessException("Thiết bị không tồn tại"));
        if (!device.isActive()) {
            throw new BusinessException("Thiết bị đã bị vô hiệu hóa");
        }
        if (apiKey == null || !passwordEncoder.matches(apiKey, device.getApiKeyHash())) {
            throw new BusinessException("API key của thiết bị không hợp lệ");
        }
        return device;
    }

    private void markDeviceOnline(AttendanceDevice device) {
        device.setLastOnlineAt(LocalDateTime.now());
        deviceRepository.save(device);
    }
}
