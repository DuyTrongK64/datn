# Attendance Management System

Dự án MVP cho đồ án tốt nghiệp: website quản lý chấm công, lịch/ca làm việc, loại hợp đồng, đơn từ và thiết bị chấm công qua RESTful API.

## Công nghệ

- Backend: Java 21, Spring Boot 4.0.6, Spring Security, JWT, Spring Data JPA, Scheduler
- Database: PostgreSQL
- Frontend: React 19, TypeScript, Vite, React Router, TanStack Query, Axios
- Dev environment: Docker Compose cho PostgreSQL

## Tài khoản mẫu

| Role | Username | Password |
|---|---|---|
| Admin | `admin` | `admin123` |
| HR | `hr` | `hr123` |
| Leader | `leader` | `leader123` |
| Employee | `employee` | `employee123` |

Thiết bị mẫu:

```text
Device code: DEVICE_001
API key: device-secret-001
Employee identifier demo: EMP001
```

## Chạy database

```bash
docker compose up -d
```

Nếu máy đã có PostgreSQL local chiếm port 5432, đổi port trong `docker-compose.yml` thành `5433:5432`, rồi sửa `backend/src/main/resources/application.yml` thành `jdbc:postgresql://localhost:5433/attendance_db`.

## Chạy backend

Project này không kèm Maven Wrapper, hãy dùng Maven cài sẵn hoặc mở bằng IntelliJ/Eclipse.

```bash
cd backend
mvn spring-boot:run
```

Backend chạy tại:

```text
http://localhost:8080
```

## Chạy frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend chạy tại:

```text
http://localhost:5173
```

## Các thay đổi UI/nghiệp vụ chính

- Menu đã đổi thành thanh ngang cố định phía trên.
- Các chức năng được gom nhóm bằng dropdown khi di chuột: Nhân sự, Tổ chức, Hợp đồng & lịch, Chấm công, Báo cáo & bảo mật.
- Màn hình `Chấm công` có 4 nút: Check in, Check out, Break in, Break out.
- Bảng công hiển thị mã/tên nhân viên, team, lịch/ca thay vì UUID.
- Admin/HR có thể lọc bảng công theo team và nhân viên.
- Leader có thể lọc bảng công theo nhân viên trong team.
- `Ca làm việc` và `Lịch làm việc` được gộp thành `Lịch/Ca làm việc`, có thêm giờ nghỉ trưa.
- `Loại hợp đồng` liên kết với `Lịch/Ca làm việc mặc định`.
- `Hợp đồng nhân viên` được đổi nghĩa thành màn hình gán loại hợp đồng cho từng nhân viên.
- Hệ thống tự tính công lúc 02:00 sáng hằng ngày cho ngày hôm trước.
- Admin/HR có nút `Tính công thủ công` tại màn hình bảng công.

## Luồng demo chính

1. Đăng nhập bằng `admin/admin123`.
2. Vào **Hợp đồng & lịch → Lịch/Ca làm việc** để kiểm tra lịch `08:00 - 18:00`, nghỉ trưa `12:00 - 13:00`.
3. Vào **Hợp đồng & lịch → Loại hợp đồng** để kiểm tra loại hợp đồng đã gắn lịch mặc định.
4. Vào **Chấm công → Chấm công**.
5. Chọn `DEVICE_001`, API key `device-secret-001`, mã nhân viên `EMP001`.
6. Bấm `Check in`, `Break out`, `Break in`, `Check out`.
7. Vào **Chấm công → Bảng công** để xem kết quả tính công.
8. Có thể bấm **Tính công thủ công** để tính lại dữ liệu trong khoảng ngày đang lọc.

## Ghi chú thiết kế

- Thiết bị chấm công không tự quyết định công hợp lệ hay không. Thiết bị chỉ gửi log.
- Backend xác thực thiết bị bằng `deviceCode + apiKey`, xác thực nhân viên, lưu toàn bộ log gốc, chống trùng bằng `deviceId + sequenceNo`, sau đó tổng hợp thành một bản ghi `DailyAttendance`.
- Khi tổng hợp: `CHECK_IN` lấy lần đầu, `CHECK_OUT` lấy lần cuối, `BREAK_IN` lấy lần đầu, `BREAK_OUT` lấy lần cuối để hiển thị; tổng phút nghỉ vẫn được tính theo các cặp `BREAK_OUT → BREAK_IN`.
- Mật khẩu user, refresh token và API key thiết bị đều được hash trước khi lưu DB.
- Có AuditLog và LoginHistory để phục vụ phần bảo mật trong báo cáo.
