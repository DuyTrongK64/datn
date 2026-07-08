import type { FieldConfig } from './types';

export type EntityPageConfig = {
  path: string;
  title: string;
  apiPath: string;
  fields: FieldConfig[];
  hiddenInMenu?: boolean;
  teamFilter?: boolean;
  employeeFilter?: boolean;
  pageNote?: string;
  readOnly?: boolean;
};

const defaultCompanyField: FieldConfig = {
  key: 'companyId',
  label: 'Công ty',
  ref: 'companies',
  hidden: true,
  defaultRef: 'companies'
};

export const companyFields: FieldConfig[] = [
  { key: 'code', label: 'Mã công ty', required: true },
  { key: 'name', label: 'Tên công ty', required: true },
  { key: 'address', label: 'Địa chỉ' },
  { key: 'phone', label: 'SĐT' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Trạng thái', type: 'select', options: ['ACTIVE', 'INACTIVE'], required: true }
];

export const entityPages: EntityPageConfig[] = [
  { path: 'companies', title: 'Công ty', apiPath: '/companies', hiddenInMenu: true, fields: companyFields },
  { path: 'departments', title: 'Phòng ban', apiPath: '/departments', fields: [
    defaultCompanyField,
    { key: 'code', label: 'Mã phòng ban', required: true },
    { key: 'name', label: 'Tên phòng ban', required: true },
    { key: 'parentId', label: 'Phòng ban cha', ref: 'departments' },
    { key: 'status', label: 'Trạng thái', type: 'select', options: ['ACTIVE', 'INACTIVE'], required: true, defaultValue: 'ACTIVE' }
  ]},
  { path: 'teams', title: 'Nhóm làm việc', apiPath: '/teams', fields: [
    { key: 'departmentId', label: 'Phòng ban', ref: 'departments', required: true },
    { key: 'code', label: 'Mã team', required: true },
    { key: 'name', label: 'Tên team', required: true },
    { key: 'leaderEmployeeId', label: 'Leader', ref: 'employees' },
    { key: 'status', label: 'Trạng thái', type: 'select', options: ['ACTIVE', 'INACTIVE'], required: true, defaultValue: 'ACTIVE' }
  ]},
  { path: 'employees', title: 'Danh sách nhân viên', apiPath: '/employees', employeeFilter: true, fields: [
    defaultCompanyField,
    { key: 'employeeCode', label: 'Mã nhân viên / tài khoản đăng nhập', required: true },
    { key: 'fullName', label: 'Họ tên', required: true },
    { key: 'role', label: 'Vai trò hệ thống', type: 'select', options: ['EMPLOYEE', 'LEADER', 'ADMIN'], required: true, defaultValue: 'EMPLOYEE' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'SĐT' },
    { key: 'gender', label: 'Giới tính' },
    { key: 'dateOfBirth', label: 'Ngày sinh', type: 'date' },
    { key: 'address', label: 'Địa chỉ' },
    { key: 'departmentId', label: 'Phòng ban', ref: 'departments', required: true },
    { key: 'hireDate', label: 'Ngày vào', type: 'date', required: true },
    { key: 'leaveDate', label: 'Ngày nghỉ', type: 'date' },
    { key: 'status', label: 'Trạng thái làm việc', type: 'select', options: ['WORKING', 'PROBATION', 'RESIGNED', 'SUSPENDED', 'MATERNITY_LEAVE', 'UNPAID_LEAVE'], required: true, defaultValue: 'WORKING' },
    { key: 'accountStatus', label: 'Trạng thái tài khoản', type: 'select', options: ['ACTIVE', 'LOCKED', 'DISABLED'], required: true, defaultValue: 'ACTIVE' },
    { key: 'initialPassword', label: 'Mật khẩu ban đầu / đặt lại mật khẩu' }
  ]},
  { path: 'shifts', title: 'Ca làm việc', apiPath: '/shifts', pageNote: 'Sau khi chọn giờ vào/ra và giờ nghỉ trưa, hệ thống sẽ tự tính Số phút nghỉ và Số phút làm chuẩn.', fields: [
    defaultCompanyField,
    { key: 'code', label: 'Mã lịch', required: true },
    { key: 'name', label: 'Tên lịch', required: true },
    { key: 'startTime', label: 'Giờ vào chuẩn', type: 'time', required: true },
    { key: 'endTime', label: 'Giờ ra chuẩn', type: 'time', required: true },
    { key: 'lunchStartTime', label: 'Bắt đầu nghỉ trưa', type: 'time', required: true },
    { key: 'lunchEndTime', label: 'Kết thúc nghỉ trưa', type: 'time', required: true },
    { key: 'lunchBreakMinutes', label: 'Số phút nghỉ', type: 'number', required: true, defaultValue: 60 },
    { key: 'workingMinutes', label: 'Số phút làm chuẩn', type: 'number', required: true, defaultValue: 480 },
    { key: 'minWorkingMinutesPerDay', label: 'Phút tối thiểu/ngày', type: 'number', required: true, defaultValue: 480 },
    { key: 'crossDay', label: 'Qua ngày', type: 'checkbox', defaultValue: false },
    { key: 'flexible', label: 'Linh hoạt', type: 'checkbox', defaultValue: false },
    { key: 'lateToleranceMinutes', label: 'Cho phép muộn/phút', type: 'number', required: true, defaultValue: 0 },
    { key: 'earlyLeaveToleranceMinutes', label: 'Cho phép về sớm/phút', type: 'number', required: true, defaultValue: 0 },
    { key: 'remoteAllowed', label: 'Cho remote', type: 'checkbox', defaultValue: false },
    { key: 'status', label: 'Trạng thái', type: 'select', options: ['ACTIVE', 'INACTIVE'], required: true, defaultValue: 'ACTIVE' }
  ]},
  { path: 'contract-types', title: 'Chính sách hợp đồng', apiPath: '/contract-types', pageNote: 'Giờ/ngày được tự tính từ Số phút làm chuẩn của Lịch/Ca làm việc mặc định.', fields: [
    { key: 'code', label: 'Mã loại hợp đồng', required: true },
    { key: 'name', label: 'Tên loại hợp đồng', required: true },
    { key: 'description', label: 'Mô tả', type: 'textarea' },
    { key: 'defaultShiftId', label: 'Lịch/Ca làm việc mặc định', ref: 'shifts', required: true },
    { key: 'defaultWorkingHoursPerDay', label: 'Giờ/ngày', type: 'number', required: true, defaultValue: 8 }
  ]},
  { path: 'employee-contracts', title: 'Gán loại hợp đồng cho nhân viên', apiPath: '/employee-contracts', teamFilter: true, fields: [
    { key: 'employeeId', label: 'Nhân viên', ref: 'employees', required: true },
    { key: 'contractTypeId', label: 'Loại hợp đồng', ref: 'contractTypes', required: true },
    { key: 'contractNo', label: 'Số hợp đồng/Ghi chú' },
    { key: 'startDate', label: 'Ngày bắt đầu', type: 'date', required: true },
    { key: 'endDate', label: 'Ngày kết thúc', type: 'date' },
    { key: 'salaryType', label: 'Loại lương', type: 'select', options: ['MONTHLY', 'HOURLY', 'DAILY'], required: true, defaultValue: 'MONTHLY' },
    { key: 'status', label: 'Trạng thái', type: 'select', options: ['DRAFT', 'ACTIVE', 'EXPIRED', 'TERMINATED'], required: true, defaultValue: 'ACTIVE' }
  ]},
  { path: 'holidays', title: 'Ngày nghỉ lễ', apiPath: '/holidays', pageNote: 'Ngày nghỉ lễ trong hệ thống luôn được tính là nghỉ có lương. Nếu nhân viên vẫn chấm công trong ngày này, thời gian làm sẽ được tính vào OT.', fields: [
    defaultCompanyField,
    { key: 'holidayDate', label: 'Ngày nghỉ lễ', type: 'date', required: true },
    { key: 'name', label: 'Tên ngày nghỉ lễ', required: true },
    { key: 'paid', label: 'Có lương', type: 'hidden', hidden: true, defaultValue: true }
  ]},
  { path: 'leave-balances', title: 'Quỹ phép nhân viên', apiPath: '/leave-balances', employeeFilter: true, readOnly: true, fields: [
    { key: 'employeeId', label: 'Nhân viên', ref: 'employees', required: true },
    { key: 'year', label: 'Năm', type: 'number', required: true, defaultValue: new Date().getFullYear() },
    { key: 'leaveTypeId', label: 'Loại nghỉ', ref: 'leaveTypes', required: true },
    { key: 'totalDays', label: 'Tổng phép', type: 'number', required: true, defaultValue: 12 },
    { key: 'usedDays', label: 'Đã dùng', type: 'number', required: true, defaultValue: 0 },
    { key: 'remainingDays', label: 'Còn lại', type: 'number', required: true, defaultValue: 12 }
  ]},
  { path: 'audit-logs', title: 'Nhật ký hệ thống', apiPath: '/audit-logs', hiddenInMenu: true, readOnly: true, fields: [
    { key: 'userId', label: 'User' },
    { key: 'action', label: 'Action' },
    { key: 'targetType', label: 'Target Type' },
    { key: 'targetId', label: 'Target' },
    { key: 'oldValue', label: 'Old', type: 'textarea' },
    { key: 'newValue', label: 'New', type: 'textarea' }
  ]},
  { path: 'login-histories', title: 'Lịch sử đăng nhập', apiPath: '/login-histories', hiddenInMenu: true, readOnly: true, fields: [
    { key: 'userId', label: 'User' },
    { key: 'username', label: 'Username' },
    { key: 'loginTime', label: 'Login time', type: 'datetime-local' },
    { key: 'success', label: 'Success', type: 'checkbox' },
    { key: 'failureReason', label: 'Failure reason' },
    { key: 'ipAddress', label: 'IP' }
  ]}
];
