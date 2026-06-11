export type TeamInfo = {
  id: string;
  code?: string;
  name?: string;
};

export type UserProfile = {
  id: string;
  username: string;
  email?: string;
  fullName?: string;
  employeeId?: string;
  employeeCode?: string;
  employeeName?: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
  departmentId?: string;
  departmentCode?: string;
  departmentName?: string;
  teams?: TeamInfo[];
  roles: string[];
};

export type UpdateProfileRequest = {
  fullName?: string;
  email?: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
};

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
};

export type DashboardResponse = {
  totalEmployees: number;
  checkedInToday: number;
  lateToday: number;
  absentToday: number;
  pendingRequests: number;
  totalDevices: number;
  onlineDevices: number;
};

export type BaseEntity = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
};

export type ReferenceKey = 'companies' | 'departments' | 'teams' | 'employees' | 'contractTypes' | 'shifts' | 'leaveTypes' | 'requestTypes';

export type FieldConfig = {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'time' | 'datetime-local' | 'checkbox' | 'select' | 'textarea' | 'hidden';
  options?: string[];
  required?: boolean;
  ref?: ReferenceKey;
  hidden?: boolean;
  defaultValue?: unknown;
  defaultRef?: ReferenceKey;
};

export type Employee = BaseEntity & {
  companyId?: string;
  employeeCode?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  departmentId?: string;
  status?: string;
  role?: string;
  roles?: string[];
  username?: string;
  accountStatus?: string;
  hasAccount?: boolean;
};

export type Team = BaseEntity & {
  departmentId?: string;
  code?: string;
  name?: string;
  leaderEmployeeId?: string;
};

export type TeamMember = BaseEntity & {
  teamId?: string;
  employeeId?: string;
  joinedDate?: string;
  leftDate?: string;
  leader?: boolean;
};

export type AttendanceDevice = BaseEntity & {
  companyId?: string;
  deviceCode?: string;
  deviceName?: string;
  deviceType?: string;
  location?: string;
  ipAddress?: string;
  active?: boolean;
  lastOnlineAt?: string;
};

export type Attendance = BaseEntity & {
  employeeId: string;
  employeeCode?: string;
  employeeName?: string;
  departmentId?: string;
  departmentCode?: string;
  departmentName?: string;
  teamId?: string;
  teamCode?: string;
  teamName?: string;
  shiftId?: string;
  shiftCode?: string;
  shiftName?: string;
  workDate: string;
  plannedStartTime?: string;
  plannedEndTime?: string;
  plannedLunchStartTime?: string;
  plannedLunchEndTime?: string;
  plannedWorkingMinutes?: number;
  firstCheckIn?: string;
  lastCheckOut?: string;
  firstBreakIn?: string;
  lastBreakOut?: string;
  totalWorkingMinutes: number;
  breakMinutes?: number;
  lateMinutes: number;
  earlyLeaveMinutes: number;
  overtimeMinutes: number;
  approvedLeaveMinutes?: number;
  approvedRequestTypes?: string;
  status: string;
  calculationStatus?: string;
  weekend?: boolean;
  holiday?: boolean;
  holidayName?: string;
  dayType?: 'WORKDAY' | 'WEEKEND' | 'HOLIDAY' | string;
};

export type AttendanceSummary = {
  employeeId: string;
  employeeCode?: string;
  employeeName?: string;
  departmentId?: string;
  departmentCode?: string;
  departmentName?: string;
  teamId?: string;
  teamCode?: string;
  teamName?: string;
  from: string;
  to: string;
  workingDays: number;
  actualWorkingDays: number;
  dayOffCount: number;
  absentDays: number;
  lateDays: number;
  earlyLeaveDays: number;
  missingCheckDays: number;
  totalWorkingMinutes: number;
  totalOvertimeMinutes: number;
  totalLateMinutes: number;
  totalEarlyLeaveMinutes: number;
  leaveUsedDays?: number;
  leaveRemainingDays?: number;
};


export type PunchHistory = {
  id: string;
  eventType: string;
  eventTime: string;
  deviceCode?: string;
  employeeIdentifier?: string;
  valid: boolean;
  errorMessage?: string;
};

export type SystemTimeSetting = {
  id?: string;
  useCustomTime: boolean;
  customDateTime?: string;
  realNow?: string;
  effectiveNow?: string;
  effectiveDate?: string;
  note?: string;
};

export type LeaveBalance = BaseEntity & {
  employeeId?: string;
  year?: number;
  leaveTypeId?: string;
  totalDays?: number;
  usedDays?: number;
  remainingDays?: number;
};
