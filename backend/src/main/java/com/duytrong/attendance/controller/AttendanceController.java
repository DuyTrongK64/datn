package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.AttendanceDetail;
import com.duytrong.attendance.domain.DailyAttendance;
import com.duytrong.attendance.dto.AttendanceDtos;
import com.duytrong.attendance.repository.AttendanceDetailRepository;
import com.duytrong.attendance.repository.DailyAttendanceRepository;
import com.duytrong.attendance.repository.TeamMemberRepository;
import com.duytrong.attendance.service.AttendanceCalculationService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/attendances")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class AttendanceController {
    private final DailyAttendanceRepository dailyAttendanceRepository;
    private final AttendanceDetailRepository attendanceDetailRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final AttendanceCalculationService calculationService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','HR','LEADER')")
    public List<AttendanceDtos.AttendanceResponse> list(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to,
            @RequestParam(required = false) UUID teamId,
            @RequestParam(required = false) UUID employeeId) {
        List<DailyAttendance> rows;
        if (employeeId != null) {
            rows = dailyAttendanceRepository.findByEmployeeIdAndWorkDateBetween(employeeId, from, to);
        } else if (teamId != null) {
            List<UUID> employeeIds = teamMemberRepository.findByTeamId(teamId).stream().map(m -> m.getEmployeeId()).toList();
            rows = employeeIds.stream()
                    .flatMap(id -> dailyAttendanceRepository.findByEmployeeIdAndWorkDateBetween(id, from, to).stream())
                    .toList();
        } else {
            rows = dailyAttendanceRepository.findByWorkDateBetween(from, to);
        }
        return calculationService.toResponses(rows);
    }

    @GetMapping("/summary")
    @PreAuthorize("hasAnyRole('ADMIN','HR','LEADER')")
    public List<AttendanceDtos.AttendanceSummaryResponse> summary(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to,
            @RequestParam(required = false) UUID teamId,
            @RequestParam(required = false) UUID employeeId) {
        return calculationService.summarize(from, to, employeeId, teamId);
    }

    @GetMapping("/employee/{employeeId}")
    public List<AttendanceDtos.AttendanceResponse> byEmployee(@PathVariable UUID employeeId,
                                            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
                                            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return calculationService.toResponses(dailyAttendanceRepository.findByEmployeeIdAndWorkDateBetween(employeeId, from, to));
    }


    @GetMapping("/employee/{employeeId}/summary")
    public List<AttendanceDtos.AttendanceSummaryResponse> employeeSummary(@PathVariable UUID employeeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return calculationService.summarize(from, to, employeeId, null);
    }

    @GetMapping("/employee/{employeeId}/calendar")
    public List<AttendanceDtos.AttendanceResponse> employeeCalendar(@PathVariable UUID employeeId,
                                            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
                                            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return calculationService.buildEmployeeCalendar(employeeId, from, to);
    }

    @GetMapping("/{dailyAttendanceId}/details")
    public List<AttendanceDetail> details(@PathVariable UUID dailyAttendanceId) {
        return attendanceDetailRepository.findByDailyAttendanceId(dailyAttendanceId);
    }

    @PostMapping("/recalculate")
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    public AttendanceDtos.AttendanceResponse recalculate(@RequestParam UUID employeeId,
                                       @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate workDate) {
        return calculationService.toResponses(List.of(calculationService.recalculate(employeeId, workDate))).getFirst();
    }

    @PostMapping("/recalculate-range")
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    public List<AttendanceDtos.AttendanceResponse> recalculateRange(@RequestBody AttendanceDtos.RecalculateRangeRequest request) {
        LocalDate from = request.from() == null ? LocalDate.now().minusDays(1) : request.from();
        LocalDate to = request.to() == null ? from : request.to();
        return calculationService.toResponses(calculationService.recalculateRange(from, to, request.employeeId(), request.teamId()));
    }
}
