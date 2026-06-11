package com.duytrong.attendance.controller;

import com.duytrong.attendance.common.enums.AttendanceStatus;
import com.duytrong.attendance.domain.Employee;
import com.duytrong.attendance.domain.TeamMember;
import com.duytrong.attendance.dto.AttendanceDtos;
import com.duytrong.attendance.repository.DailyAttendanceRepository;
import com.duytrong.attendance.repository.EmployeeRepository;
import com.duytrong.attendance.repository.TeamMemberRepository;
import com.duytrong.attendance.service.AttendanceCalculationService;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/reports")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN','HR','LEADER')")
public class ReportController {
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DateTimeFormatter TIME_FORMAT = DateTimeFormatter.ofPattern("HH:mm");
    private static final DateTimeFormatter DATE_TIME_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    private final DailyAttendanceRepository dailyAttendanceRepository;
    private final AttendanceCalculationService calculationService;
    private final EmployeeRepository employeeRepository;
    private final TeamMemberRepository teamMemberRepository;

    @GetMapping("/monthly")
    public List<AttendanceDtos.AttendanceResponse> monthly(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
                                                           @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to,
                                                           @RequestParam(required = false) UUID teamId,
                                                           @RequestParam(required = false) UUID employeeId) {
        if (employeeId != null) {
            return calculationService.toResponses(dailyAttendanceRepository.findByEmployeeIdAndWorkDateBetween(employeeId, from, to));
        }
        if (teamId != null) {
            List<UUID> employeeIds = teamMemberRepository.findByTeamId(teamId).stream().map(TeamMember::getEmployeeId).toList();
            return calculationService.toResponses(employeeIds.stream()
                    .flatMap(id -> dailyAttendanceRepository.findByEmployeeIdAndWorkDateBetween(id, from, to).stream())
                    .toList());
        }
        return calculationService.toResponses(dailyAttendanceRepository.findByWorkDateBetween(from, to));
    }

    @GetMapping("/monthly/export-csv")
    public ResponseEntity<byte[]> exportCsv(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
                                            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        List<AttendanceDtos.AttendanceResponse> rows = calculationService.toResponses(dailyAttendanceRepository.findByWorkDateBetween(from, to));
        StringBuilder csv = new StringBuilder("employeeCode,employeeName,team,workDate,shift,plannedStart,plannedEnd,checkIn,checkOut,breakOut,breakIn,totalWorkingMinutes,lateMinutes,earlyLeaveMinutes,overtimeMinutes,status\n");
        for (AttendanceDtos.AttendanceResponse r : rows) {
            csv.append(safe(r.employeeCode())).append(',')
                    .append(safe(r.employeeName())).append(',')
                    .append(safe(r.teamCode())).append(' ')
                    .append(safe(r.teamName())).append(',')
                    .append(r.workDate()).append(',')
                    .append(safe(r.shiftCode())).append(' ')
                    .append(safe(r.shiftName())).append(',')
                    .append(safe(r.plannedStartTime())).append(',')
                    .append(safe(r.plannedEndTime())).append(',')
                    .append(safe(r.firstCheckIn())).append(',')
                    .append(safe(r.lastCheckOut())).append(',')
                    .append(safe(r.lastBreakOut())).append(',')
                    .append(safe(r.firstBreakIn())).append(',')
                    .append(r.totalWorkingMinutes()).append(',')
                    .append(r.lateMinutes()).append(',')
                    .append(r.earlyLeaveMinutes()).append(',')
                    .append(r.overtimeMinutes()).append(',')
                    .append(r.status()).append('\n');
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=monthly-attendance.csv")
                .contentType(new MediaType("text", "csv", StandardCharsets.UTF_8))
                .body(csv.toString().getBytes(StandardCharsets.UTF_8));
    }

    @GetMapping("/monthly/export-xlsx")
    public ResponseEntity<byte[]> exportMonthlyXlsx(@RequestParam String month,
                                                    @RequestParam(required = false) UUID teamId,
                                                    @RequestParam(required = false) UUID employeeId) throws Exception {
        YearMonth yearMonth = YearMonth.parse(month);
        LocalDate from = yearMonth.atDay(1);
        LocalDate to = yearMonth.atEndOfMonth();
        List<Employee> employees = resolveEmployees(employeeId, teamId);

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream output = new ByteArrayOutputStream()) {
            Map<String, CellStyle> styles = createStyles(workbook);
            Set<String> usedSheetNames = new HashSet<>();

            for (Employee employee : employees) {
                List<AttendanceDtos.AttendanceResponse> rows = calculationService.buildEmployeeCalendar(employee.getId(), from, to);
                Sheet sheet = workbook.createSheet(uniqueSheetName(employee, usedSheetNames));
                renderEmployeeSheet(workbook, sheet, styles, employee, rows, yearMonth);
            }

            if (employees.isEmpty()) {
                Sheet sheet = workbook.createSheet("Khong co du lieu");
                Row row = sheet.createRow(0);
                Cell cell = row.createCell(0);
                cell.setCellValue("Không có nhân viên phù hợp với điều kiện lọc.");
            }

            workbook.write(output);
            String filename = "bang-cong-thang-" + month + ".xlsx";
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .body(output.toByteArray());
        }
    }

    private List<Employee> resolveEmployees(UUID employeeId, UUID teamId) {
        if (employeeId != null) {
            return employeeRepository.findById(employeeId).map(List::of).orElseGet(List::of);
        }
        if (teamId != null) {
            List<UUID> employeeIds = teamMemberRepository.findByTeamId(teamId).stream().map(TeamMember::getEmployeeId).toList();
            return employeeRepository.findAllById(employeeIds).stream()
                    .sorted(Comparator.comparing(Employee::getEmployeeCode, Comparator.nullsLast(String::compareToIgnoreCase)))
                    .toList();
        }
        return employeeRepository.findAll().stream()
                .sorted(Comparator.comparing(Employee::getEmployeeCode, Comparator.nullsLast(String::compareToIgnoreCase)))
                .toList();
    }

    private void renderEmployeeSheet(Workbook workbook,
                                     Sheet sheet,
                                     Map<String, CellStyle> styles,
                                     Employee employee,
                                     List<AttendanceDtos.AttendanceResponse> rows,
                                     YearMonth month) {
        sheet.setDisplayGridlines(false);
        int rowIndex = 0;

        Row title = sheet.createRow(rowIndex++);
        title.setHeightInPoints(26);
        Cell titleCell = title.createCell(0);
        titleCell.setCellValue("BẢNG CÔNG THÁNG " + month.getMonthValue() + "/" + month.getYear());
        titleCell.setCellStyle(styles.get("title"));
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 16));

        Row employeeRow = sheet.createRow(rowIndex++);
        employeeRow.createCell(0).setCellValue("Nhân viên");
        employeeRow.getCell(0).setCellStyle(styles.get("label"));
        employeeRow.createCell(1).setCellValue(employee.getEmployeeCode() + " - " + employee.getFullName());
        employeeRow.getCell(1).setCellStyle(styles.get("normal"));
        employeeRow.createCell(3).setCellValue("Email");
        employeeRow.getCell(3).setCellStyle(styles.get("label"));
        employeeRow.createCell(4).setCellValue(nvl(employee.getEmail()));
        employeeRow.getCell(4).setCellStyle(styles.get("normal"));

        Row summary = sheet.createRow(rowIndex++);
        int totalWorking = rows.stream().mapToInt(r -> value(r.totalWorkingMinutes())).sum();
        int totalOt = rows.stream().mapToInt(r -> value(r.overtimeMinutes())).sum();
        int totalLate = rows.stream().filter(r -> !Boolean.TRUE.equals(r.weekend()) && !Boolean.TRUE.equals(r.holiday())).mapToInt(r -> value(r.lateMinutes())).sum();
        int totalEarly = rows.stream().filter(r -> !Boolean.TRUE.equals(r.weekend()) && !Boolean.TRUE.equals(r.holiday())).mapToInt(r -> value(r.earlyLeaveMinutes())).sum();
        int actualDays = (int) rows.stream().filter(r -> value(r.totalWorkingMinutes()) > 0).count();
        int leaveMinutes = rows.stream().mapToInt(r -> value(r.approvedLeaveMinutes())).sum();

        createSummaryCell(summary, 0, "Ngày có công", actualDays + " ngày", styles);
        createSummaryCell(summary, 2, "Tổng giờ làm", minutesToText(totalWorking), styles);
        createSummaryCell(summary, 4, "Tổng OT", minutesToText(totalOt), styles);
        createSummaryCell(summary, 6, "Đi muộn", minutesToText(totalLate), styles);
        createSummaryCell(summary, 8, "Về sớm", minutesToText(totalEarly), styles);
        createSummaryCell(summary, 10, "Phép đã duyệt", minutesToText(leaveMinutes), styles);

        rowIndex++;
        Row header = sheet.createRow(rowIndex++);
        String[] headers = {
                "Ngày", "Thứ", "Loại ngày", "Lịch/Ca", "Giờ làm chuẩn", "Nghỉ trưa",
                "Check in", "Check out", "Break out", "Break in", "Giờ làm",
                "Đi muộn", "Về sớm", "OT", "Phép duyệt", "Đơn đã duyệt", "Trạng thái"
        };
        for (int i = 0; i < headers.length; i++) {
            Cell cell = header.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(styles.get("header"));
        }

        for (AttendanceDtos.AttendanceResponse r : rows) {
            Row row = sheet.createRow(rowIndex++);
            boolean dayOff = Boolean.TRUE.equals(r.weekend()) || Boolean.TRUE.equals(r.holiday());
            CellStyle rowStyle = dayOff ? styles.get("dayOff") : styles.get("normalBorder");
            int c = 0;
            write(row, c++, formatDate(r.workDate()), rowStyle);
            write(row, c++, dayOfWeek(r.workDate()), rowStyle);
            write(row, c++, dayType(r), rowStyle);
            write(row, c++, concat(r.shiftCode(), r.shiftName()), rowStyle);
            write(row, c++, timeRange(r.plannedStartTime(), r.plannedEndTime()), rowStyle);
            write(row, c++, timeRange(r.plannedLunchStartTime(), r.plannedLunchEndTime()), rowStyle);
            write(row, c++, formatTime(r.firstCheckIn()), rowStyle);
            write(row, c++, formatTime(r.lastCheckOut()), rowStyle);
            write(row, c++, formatTime(r.lastBreakOut()), rowStyle);
            write(row, c++, formatTime(r.firstBreakIn()), rowStyle);
            write(row, c++, minutesToText(r.totalWorkingMinutes()), rowStyle);
            write(row, c++, dayOff ? "" : minutesToText(r.lateMinutes()), rowStyle);
            write(row, c++, dayOff ? "" : minutesToText(r.earlyLeaveMinutes()), rowStyle);
            write(row, c++, minutesToText(r.overtimeMinutes()), rowStyle);
            write(row, c++, minutesToText(r.approvedLeaveMinutes()), rowStyle);
            write(row, c++, nvl(r.approvedRequestTypes()), rowStyle);
            write(row, c++, statusLabel(r.status(), dayOff), rowStyle);
        }

        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
            sheet.setColumnWidth(i, Math.min(Math.max(sheet.getColumnWidth(i), 2800), 8000));
        }
        sheet.createFreezePane(0, 5);
    }

    private Map<String, CellStyle> createStyles(Workbook workbook) {
        Map<String, CellStyle> styles = new HashMap<>();
        Font titleFont = workbook.createFont();
        titleFont.setBold(true);
        titleFont.setFontHeightInPoints((short) 16);
        titleFont.setColor(IndexedColors.WHITE.getIndex());

        CellStyle title = workbook.createCellStyle();
        title.setFont(titleFont);
        title.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
        title.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        title.setAlignment(HorizontalAlignment.CENTER);
        title.setVerticalAlignment(VerticalAlignment.CENTER);
        styles.put("title", title);

        Font bold = workbook.createFont();
        bold.setBold(true);

        CellStyle label = workbook.createCellStyle();
        label.setFont(bold);
        label.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        label.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        label.setBorderBottom(BorderStyle.THIN);
        label.setBorderTop(BorderStyle.THIN);
        label.setBorderLeft(BorderStyle.THIN);
        label.setBorderRight(BorderStyle.THIN);
        styles.put("label", label);

        CellStyle header = workbook.createCellStyle();
        header.setFont(bold);
        header.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
        header.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        header.setAlignment(HorizontalAlignment.CENTER);
        header.setBorderBottom(BorderStyle.THIN);
        header.setBorderTop(BorderStyle.THIN);
        header.setBorderLeft(BorderStyle.THIN);
        header.setBorderRight(BorderStyle.THIN);
        styles.put("header", header);

        CellStyle normal = workbook.createCellStyle();
        styles.put("normal", normal);

        CellStyle normalBorder = workbook.createCellStyle();
        normalBorder.setBorderBottom(BorderStyle.THIN);
        normalBorder.setBorderTop(BorderStyle.THIN);
        normalBorder.setBorderLeft(BorderStyle.THIN);
        normalBorder.setBorderRight(BorderStyle.THIN);
        normalBorder.setVerticalAlignment(VerticalAlignment.CENTER);
        styles.put("normalBorder", normalBorder);

        CellStyle dayOff = workbook.createCellStyle();
        dayOff.cloneStyleFrom(normalBorder);
        dayOff.setFillForegroundColor(IndexedColors.LEMON_CHIFFON.getIndex());
        dayOff.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        styles.put("dayOff", dayOff);
        return styles;
    }

    private void createSummaryCell(Row row, int startCell, String label, String value, Map<String, CellStyle> styles) {
        Cell labelCell = row.createCell(startCell);
        labelCell.setCellValue(label);
        labelCell.setCellStyle(styles.get("label"));
        Cell valueCell = row.createCell(startCell + 1);
        valueCell.setCellValue(value);
        valueCell.setCellStyle(styles.get("normalBorder"));
    }

    private void write(Row row, int index, String value, CellStyle style) {
        Cell cell = row.createCell(index);
        cell.setCellValue(value == null ? "" : value);
        cell.setCellStyle(style);
    }

    private String uniqueSheetName(Employee employee, Set<String> usedNames) {
        String base = sanitizeSheetName(nvl(employee.getFullName()) + " " + nvl(employee.getEmployeeCode())).trim();
        if (base.isBlank()) base = "Nhan vien";
        base = limitSheetName(base);
        String candidate = base;
        int index = 2;
        while (usedNames.contains(candidate)) {
            String suffix = " " + index++;
            candidate = limitSheetName(base, suffix);
        }
        usedNames.add(candidate);
        return candidate;
    }

    private String sanitizeSheetName(String value) {
        return value.replaceAll("[\\\\/?*\\[\\]:]", " ").replaceAll("\\s+", " ");
    }

    private String limitSheetName(String value) {
        return value.length() <= 31 ? value : value.substring(0, 31).trim();
    }

    private String limitSheetName(String value, String suffix) {
        int max = Math.max(1, 31 - suffix.length());
        String prefix = value.length() <= max ? value : value.substring(0, max).trim();
        return prefix + suffix;
    }

    private String dayType(AttendanceDtos.AttendanceResponse row) {
        if (Boolean.TRUE.equals(row.holiday())) return "Nghỉ lễ" + (row.holidayName() == null ? "" : " - " + row.holidayName());
        if (Boolean.TRUE.equals(row.weekend())) return "Cuối tuần";
        return "Ngày làm việc";
    }

    private String statusLabel(AttendanceStatus status, boolean dayOff) {
        if (dayOff) return "";
        if (status == null) return "";
        return switch (status) {
            case NORMAL -> "Bình thường";
            case LATE -> "Đi muộn";
            case EARLY_LEAVE -> "Về sớm";
            case ABSENT -> "Vắng mặt";
            case MISSING_CHECK_IN -> "Thiếu check-in";
            case MISSING_CHECK_OUT -> "Thiếu check-out";
            case ON_LEAVE -> "Nghỉ phép";
            case REMOTE -> "Làm từ xa";
            case HOLIDAY -> "";
        };
    }

    private String dayOfWeek(LocalDate date) {
        if (date == null) return "";
        DayOfWeek day = date.getDayOfWeek();
        return switch (day) {
            case MONDAY -> "Thứ 2";
            case TUESDAY -> "Thứ 3";
            case WEDNESDAY -> "Thứ 4";
            case THURSDAY -> "Thứ 5";
            case FRIDAY -> "Thứ 6";
            case SATURDAY -> "Thứ 7";
            case SUNDAY -> "Chủ nhật";
        };
    }

    private String concat(String code, String name) {
        return List.of(nvl(code), nvl(name)).stream().filter(s -> !s.isBlank()).collect(Collectors.joining(" - "));
    }

    private String timeRange(LocalDateTime start, LocalDateTime end) {
        if (start == null && end == null) return "";
        return formatTime(start) + " - " + formatTime(end);
    }

    private String formatDate(LocalDate date) {
        return date == null ? "" : date.format(DATE_FORMAT);
    }

    private String formatTime(LocalDateTime value) {
        return value == null ? "" : value.format(TIME_FORMAT);
    }

    private String minutesToText(Integer minutes) {
        int value = value(minutes);
        int hours = value / 60;
        int mins = value % 60;
        return hours + "h" + String.format("%02d", mins);
    }

    private int value(Integer value) {
        return value == null ? 0 : value;
    }

    private String nvl(Object value) {
        return value == null ? "" : String.valueOf(value);
    }

    private String safe(Object value) {
        return value == null ? "" : String.valueOf(value).replace(",", " ");
    }
}
