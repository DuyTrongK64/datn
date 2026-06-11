const VI_LABELS: Record<string, string> = {
  ADMIN: 'Quản trị viên',
  HR: 'Nhân sự',
  LEADER: 'Trưởng nhóm',
  EMPLOYEE: 'Nhân viên',
  DEVICE: 'Thiết bị',

  ACTIVE: 'Hoạt động',
  INACTIVE: 'Ngừng sử dụng',
  LOCKED: 'Bị khóa',
  ENABLED: 'Đang bật',
  DISABLED: 'Đang tắt',

  WORKING: 'Đang làm việc',
  PROBATION: 'Thử việc',
  RESIGNED: 'Đã nghỉ việc',
  SUSPENDED: 'Tạm đình chỉ',
  MATERNITY_LEAVE: 'Nghỉ thai sản',
  UNPAID_LEAVE: 'Nghỉ không lương',

  DRAFT: 'Nháp',
  PENDING: 'Chờ duyệt',
  APPROVED: 'Đã duyệt',
  REJECTED: 'Từ chối',
  CANCELLED: 'Đã hủy',
  EXPIRED: 'Hết hạn',
  TERMINATED: 'Đã chấm dứt',

  NORMAL: 'Bình thường',
  LATE: 'Đi muộn',
  EARLY_LEAVE: 'Về sớm',
  ABSENT: 'Vắng mặt',
  MISSING_CHECK_IN: 'Thiếu check-in',
  MISSING_CHECK_OUT: 'Thiếu check-out',
  ON_LEAVE: 'Nghỉ phép',
  REMOTE: 'Làm từ xa',
  HOLIDAY: 'Nghỉ lễ',
  CALCULATED: 'Đã tính',
  NEED_RECALCULATE: 'Cần tính lại',

  CARD: 'Thẻ từ',
  FINGERPRINT: 'Vân tay',
  FACE_ID: 'Khuôn mặt',
  EMPLOYEE_CODE: 'Mã nhân viên',
  PIN_CODE: 'Mã PIN',

  WEB_SIMULATOR: 'Chấm công trên web',
  CARD_READER: 'Đầu đọc thẻ',
  MOBILE_APP: 'Ứng dụng di động',

  MONTHLY: 'Theo tháng',
  HOURLY: 'Theo giờ',
  DAILY: 'Theo ngày',

  DAY_OFF: 'Ngày nghỉ',
  LEAVE: 'Nghỉ phép',
  BUSINESS_TRIP: 'Công tác',
  SHIFT_CHANGE: 'Đổi ca',
  OVERTIME: 'Làm thêm giờ',
  REMOTE_WORK: 'Làm từ xa',
  LEAVE_REQUEST: 'Xin nghỉ phép',
  LATE_ARRIVAL: 'Đơn đi muộn',
  EARLY_LEAVE_REQUEST: 'Đơn về sớm',
  OUTSIDE_REQUEST: 'Đơn ra ngoài',
  TIME_OFF: 'Đơn nghỉ theo giờ',

  MANUAL: 'Nhập tay',
  IMPORT_EXCEL: 'Import Excel',
  AUTO_GENERATED: 'Tự động tạo',
  REQUEST_APPROVED: 'Từ đơn đã duyệt',

  ONLINE: 'Online',
  OFFLINE: 'Offline',
  ERROR: 'Lỗi',

  CHECK_IN: 'Check in',
  CHECK_OUT: 'Check out',
  BREAK_IN: 'Break in',
  BREAK_OUT: 'Break out',

  WORKDAY: 'Ngày làm',
  WEEKEND: 'Thứ 7 / Chủ nhật'
};

export function viLabel(value?: unknown) {
  if (value === null || value === undefined || value === '') return '';
  const text = String(value);
  return VI_LABELS[text] ?? text;
}

export function roleLabel(role?: string) {
  return viLabel(role);
}

export function optionLabel(option: string) {
  return viLabel(option);
}
