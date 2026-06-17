import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { http } from '../api/http';
import { useAuth } from '../state/AuthContext';
import type { BaseEntity, Employee, LeaveBalance, SystemTimeSetting, Team, TeamMember } from '../types';
import { findDisplay, useReferences } from '../hooks/useReferences';
import { EmployeeSearchFilter, type EmployeeSearchValue, filterEmployeesBySearch } from '../components/EmployeeSearchFilter';
import { codeName } from '../utils/format';
import { viLabel } from '../utils/labels';

type RequestPageProps = {
  approvalMode?: boolean;
  initialType?: string;
};

const REQUEST_OPTIONS = [
  { code: 'LEAVE_REQUEST', label: 'Đơn xin nghỉ phép', group: 'Nghỉ phép' },
  { code: 'LATE_ARRIVAL', label: 'Đơn đi muộn', group: 'Nghỉ theo giờ' },
  { code: 'EARLY_LEAVE_REQUEST', label: 'Đơn về sớm', group: 'Nghỉ theo giờ' },
  { code: 'OUTSIDE_REQUEST', label: 'Đơn ra ngoài', group: 'Nghỉ theo giờ' },
  { code: 'TIME_OFF', label: 'Đơn nghỉ theo giờ', group: 'Nghỉ theo giờ' },
  { code: 'MISSING_CHECK_IN', label: 'Đơn bổ sung check-in', group: 'Bổ sung chấm công' },
  { code: 'MISSING_CHECK_OUT', label: 'Đơn bổ sung check-out', group: 'Bổ sung chấm công' },
  { code: 'REMOTE_WORK', label: 'Đơn làm remote', group: 'Khác' },
  { code: 'OVERTIME', label: 'Đơn làm thêm giờ', group: 'Khác' },
  { code: 'SHIFT_CHANGE', label: 'Đơn đổi ca', group: 'Khác' }
];

function browserToday() {
  return new Date().toISOString().slice(0, 10);
}

function monthStart(dateText: string) {
  return `${dateText.slice(0, 7)}-01`;
}

function effectiveDate(setting?: SystemTimeSetting) {
  return setting?.effectiveDate || setting?.effectiveNow?.slice(0, 10) || browserToday();
}

function requestTypeLabel(code?: string) {
  return REQUEST_OPTIONS.find((option) => option.code === code)?.label || viLabel(code);
}

function requestTypeById(refs: ReturnType<typeof useReferences>, id: unknown) {
  if (!id) return undefined;
  const row = refs.requestTypes?.find((item) => String(item.id) === String(id));
  return row?.code ? String(row.code) : undefined;
}

function durationInfo(startTime?: string, endTime?: string) {
  if (!startTime || !endTime) return { minutes: 0, hours: 0, days: 0 };
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);
  let start = sh * 60 + sm;
  let end = eh * 60 + em;
  if (end < start) end += 24 * 60;
  const minutes = Math.max(0, end - start);
  return {
    minutes,
    hours: Math.round((minutes / 60) * 100) / 100,
    days: Math.round((minutes / 480) * 100) / 100
  };
}

function requestOverlapsRange(request: BaseEntity, fromDate: string, toDate: string) {
  if (!fromDate && !toDate) return true;
  const start = String(request.targetDate ?? '');
  const end = String(request.endDate ?? request.targetDate ?? '');
  if (fromDate && end && end < fromDate) return false;
  if (toDate && start && start > toDate) return false;
  return true;
}

function statusLabel(status: string) {
  return viLabel(status);
}

export function RequestPage({ approvalMode = false, initialType }: RequestPageProps) {
  const { user, hasRole } = useAuth();
  const managedViewer = hasRole('ADMIN', 'LEADER');
  const canCreateForOthers = hasRole('ADMIN');
  const canApproveRequests = hasRole('ADMIN', 'LEADER');
  const refs = useReferences(['employees', 'requestTypes']);
  const queryClient = useQueryClient();
  const defaultType = initialType || 'LEAVE_REQUEST';
  const { data: timeSetting } = useQuery({
    queryKey: ['system-time'],
    queryFn: async () => (await http.get<SystemTimeSetting>('/system-time')).data
  });
  const [form, setForm] = useState({
    employeeId: user?.employeeId ?? '',
    requestTypeCode: defaultType,
    targetDate: browserToday(),
    endDate: '',
    startTime: '08:00',
    endTime: '18:00',
    reason: ''
  });
  const [statusFilter, setStatusFilter] = useState(approvalMode ? 'PENDING' : '');
  const [typeFilter, setTypeFilter] = useState(initialType || '');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState<EmployeeSearchValue>({ teamId: '', keyword: '', employeeId: '' });

  useEffect(() => {
    if (!timeSetting) return;
    const today = effectiveDate(timeSetting);
    setForm((prev) => ({ ...prev, targetDate: today }));
    if (approvalMode && !fromDate && !toDate) {
      setFromDate(monthStart(today));
      setToDate(today);
    }
  }, [approvalMode, fromDate, timeSetting, toDate]);

  useEffect(() => {
    if (initialType) {
      setForm((prev) => ({ ...prev, requestTypeCode: initialType }));
      setTypeFilter(initialType);
    }
  }, [initialType]);

  const { data: employees = [] } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => (await http.get<Employee[]>('/employees')).data,
    enabled: managedViewer
  });

  const { data: teams = [] } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => (await http.get<Team[]>('/teams')).data,
    enabled: managedViewer
  });

  const { data: teamMembers = [] } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => (await http.get<TeamMember[]>('/team-members')).data,
    enabled: managedViewer
  });

  const filteredEmployees = useMemo(
    () => filterEmployeesBySearch(employees, teamMembers, employeeFilter.teamId, employeeFilter.keyword),
    [employeeFilter.keyword, employeeFilter.teamId, employees, teamMembers]
  );

  const filteredEmployeeIds = useMemo(() => new Set(filteredEmployees.map((employee) => String(employee.id))), [filteredEmployees]);

  const { data: leaveBalances = [] } = useQuery({
    queryKey: ['leave-balances', form.employeeId],
    queryFn: async () => (await http.get<LeaveBalance[]>(`/leave-balances/employee/${form.employeeId}`)).data,
    enabled: Boolean(form.employeeId)
  });

  const { data: requests = [] } = useQuery({
    queryKey: ['requests', approvalMode, statusFilter],
    queryFn: async () => {
      const statusQuery = approvalMode && statusFilter ? `?status=${statusFilter}` : '';
      return (await http.get<BaseEntity[]>(`/requests${statusQuery}`)).data;
    }
  });

  const displayedRequests = useMemo(() => {
    return requests.filter((request) => {
      if (!managedViewer && String(request.employeeId) !== String(user?.employeeId)) return false;
      if (managedViewer) {
        if (employeeFilter.employeeId && String(request.employeeId) !== String(employeeFilter.employeeId)) return false;
        if (!employeeFilter.employeeId && (employeeFilter.teamId || employeeFilter.keyword.trim()) && !filteredEmployeeIds.has(String(request.employeeId))) return false;
      }
      if (!approvalMode && statusFilter && String(request.status) !== statusFilter) return false;
      if (!requestOverlapsRange(request, fromDate, toDate)) return false;
      const typeCode = requestTypeById(refs, request.requestTypeId);
      if (typeFilter && typeCode !== typeFilter) return false;
      return true;
    });
  }, [managedViewer, approvalMode, employeeFilter.employeeId, employeeFilter.keyword, employeeFilter.teamId, filteredEmployeeIds, fromDate, refs, requests, statusFilter, toDate, typeFilter, user?.employeeId]);

  const pendingDisplayedRequests = useMemo(
    () => displayedRequests.filter((request) => String(request.status) === 'PENDING'),
    [displayedRequests]
  );

  const requestStats = useMemo(() => ({
    total: displayedRequests.length,
    pending: displayedRequests.filter((request) => request.status === 'PENDING').length,
    approved: displayedRequests.filter((request) => request.status === 'APPROVED').length,
    rejected: displayedRequests.filter((request) => request.status === 'REJECTED').length
  }), [displayedRequests]);

  const createMutation = useMutation({
    mutationFn: async () => (await http.post('/requests', { ...form, endDate: form.endDate || null })).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      setForm((prev) => ({ ...prev, reason: '' }));
    }
  });

  const actionMutation = useMutation({
    mutationFn: async ({ id, action }: { id: string; action: 'approve' | 'reject' }) => {
      if (!canApproveRequests) throw new Error('Bạn không có quyền phê duyệt đơn từ');
      const comment = action === 'approve' ? 'Đã phê duyệt trên hệ thống' : 'Đã từ chối trên hệ thống';
      return (await http.post(`/requests/${id}/${action}`, { comment })).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      queryClient.invalidateQueries({ queryKey: ['attendances'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-summary'] });
      queryClient.invalidateQueries({ queryKey: ['leave-balances'] });
    }
  });

  const approveAllMutation = useMutation({
    mutationFn: async () => {
      if (!canApproveRequests) throw new Error('Bạn không có quyền phê duyệt đơn từ');
      await Promise.all(
        pendingDisplayedRequests.map((request) => http.post(`/requests/${request.id}/approve`, { comment: 'Phê duyệt tất cả trên hệ thống' }))
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      queryClient.invalidateQueries({ queryKey: ['attendances'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-summary'] });
      queryClient.invalidateQueries({ queryKey: ['leave-balances'] });
    }
  });

  function submit(e: FormEvent) {
    e.preventDefault();
    createMutation.mutate();
  }

  const selectedOption = REQUEST_OPTIONS.find((option) => option.code === form.requestTypeCode);
  const isFullLeave = form.requestTypeCode === 'LEAVE_REQUEST';
  const isPartialLeave = ['LATE_ARRIVAL', 'EARLY_LEAVE_REQUEST', 'OUTSIDE_REQUEST', 'TIME_OFF'].includes(form.requestTypeCode);
  const isMissingCheck = ['MISSING_CHECK_IN', 'MISSING_CHECK_OUT'].includes(form.requestTypeCode);
  const annualBalance = leaveBalances[0];
  const canCreateForm = !approvalMode && Boolean(initialType);
  const duration = durationInfo(form.startTime, form.endTime);

  return (
    <section>
      <h2>{approvalMode ? 'Phê duyệt đơn từ' : initialType ? selectedOption?.label : 'Tổng hợp đơn từ'}</h2>

      <div className="request-stat-grid">
        <div className="request-stat-card"><span>Tổng đơn</span><strong>{requestStats.total}</strong></div>
        <div className="request-stat-card"><span>Chờ duyệt</span><strong>{requestStats.pending}</strong></div>
        <div className="request-stat-card"><span>Đã duyệt</span><strong>{requestStats.approved}</strong></div>
        <div className="request-stat-card"><span>Từ chối</span><strong>{requestStats.rejected}</strong></div>
        {annualBalance && <div className="request-stat-card leave-balance-card">
          <span>Phép năm còn lại</span>
          <strong>{annualBalance.remainingDays ?? 0} ngày</strong>
          <small>Đã dùng {annualBalance.usedDays ?? 0}/{annualBalance.totalDays ?? 0} ngày</small>
        </div>}
      </div>

      {managedViewer && !initialType && (
        <EmployeeSearchFilter
          value={employeeFilter}
          onChange={setEmployeeFilter}
          employees={employees}
          teams={teams}
          teamMembers={teamMembers}
        />
      )}

      <div className={canCreateForm ? 'grid-two request-grid' : 'request-grid single-request-list'}>
        {canCreateForm && <form className="card form-grid" onSubmit={submit}>
          <h3>{initialType ? selectedOption?.label : 'Tạo đơn từ'}</h3>
          {canCreateForOthers ? (
            <label>Nhân viên <span className="required-mark">*</span><select required value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })}>
              <option value="">-- chọn nhân viên --</option>
              {employees.map((employee) => <option key={String(employee.id)} value={String(employee.id)}>{codeName(String(employee.employeeCode ?? ''), String(employee.fullName ?? ''))}</option>)}
            </select></label>
          ) : (
            <label>Nhân viên<input disabled value={codeName(user?.employeeCode, user?.employeeName || user?.fullName, user?.employeeId)} /></label>
          )}
          <label>Loại đơn <span className="required-mark">*</span><select required value={form.requestTypeCode} onChange={(e) => setForm({ ...form, requestTypeCode: e.target.value })}>
            {REQUEST_OPTIONS.map((x) => <option key={x.code} value={x.code}>{x.label}</option>)}
          </select></label>
          <label>Ngày bắt đầu <span className="required-mark">*</span><input required type="date" value={form.targetDate} onChange={(e) => setForm({ ...form, targetDate: e.target.value })} /></label>
          {isFullLeave && <label>Ngày kết thúc<input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} /></label>}
          {(isPartialLeave || isMissingCheck || form.requestTypeCode === 'OVERTIME') && <>
            {form.requestTypeCode === 'MISSING_CHECK_OUT' ? (
              <label>Giờ check-out <span className="required-mark">*</span><input required type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} /></label>
            ) : (
              <label>{form.requestTypeCode === 'MISSING_CHECK_IN' ? 'Giờ check-in' : 'Giờ bắt đầu'} <span className="required-mark">*</span><input required type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} /></label>
            )}
            {!isMissingCheck && <label>Giờ kết thúc <span className="required-mark">*</span><input required type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} /></label>}
          </>}
          {isPartialLeave && <div className="inline-note">Sau khi được duyệt, hệ thống sẽ trừ <strong>{duration.hours} giờ phép</strong> khỏi quỹ phép còn lại, quy đổi tương đương <strong>{duration.days} ngày</strong> theo chuẩn 8 giờ = 1 ngày.</div>}
          {isFullLeave && <div className="inline-note">Đơn nghỉ phép cả ngày sẽ trừ phép năm sau khi được phê duyệt. Ngày nghỉ cuối tuần không bị trừ phép.</div>}
          <label>Lý do <span className="required-mark">*</span><textarea required value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} /></label>
          <button disabled={createMutation.isPending}>{createMutation.isPending ? 'Đang tạo...' : 'Tạo đơn'}</button>
        </form>}

        <div className="card table-wrap wide">
          <div className="filters request-filters">
            <label>Trạng thái đơn<select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">Tất cả</option>
              <option value="PENDING">Chờ duyệt</option>
              <option value="APPROVED">Đã duyệt</option>
              <option value="REJECTED">Từ chối</option>
            </select></label>
            {!initialType && <label>Loại đơn<select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">Tất cả loại đơn</option>
              {REQUEST_OPTIONS.map((x) => <option key={x.code} value={x.code}>{x.label}</option>)}
            </select></label>}
            <label>Từ ngày<input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} /></label>
            <label>Đến ngày<input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} /></label>
            {approvalMode && canApproveRequests && <div className="filter-actions">
              <button
                type="button"
                onClick={() => approveAllMutation.mutate()}
                disabled={pendingDisplayedRequests.length === 0 || approveAllMutation.isPending || actionMutation.isPending || !canApproveRequests}
              >
                {approveAllMutation.isPending ? 'Đang duyệt...' : `Phê duyệt tất cả (${pendingDisplayedRequests.length})`}
              </button>
            </div>}
          </div>
          <table>
            <thead><tr><th>Nhân viên</th><th>Loại đơn</th><th>Ngày</th><th>Giờ</th><th>Lý do</th><th>Trạng thái</th>{approvalMode && <th>Thao tác</th>}</tr></thead>
            <tbody>{displayedRequests.map((r) => {
              const typeCode = requestTypeById(refs, r.requestTypeId);
              const isPending = String(r.status) === 'PENDING';
              return <tr key={r.id as string}>
                <td>{findDisplay(refs, 'employees', r.employeeId)}</td>
                <td>{requestTypeLabel(typeCode)}</td>
                <td>{String(r.targetDate ?? '')}{r.endDate ? ` → ${String(r.endDate)}` : ''}</td>
                <td>{String(r.startTime ?? '')}{r.endTime ? ` - ${String(r.endTime)}` : ''}</td>
                <td>{String(r.reason ?? '')}</td>
                <td><span className="badge">{statusLabel(String(r.status ?? ''))}</span></td>
                {approvalMode && <td>
                  {isPending && canApproveRequests ? <>
                    <button className="small" disabled={actionMutation.isPending || approveAllMutation.isPending || !canApproveRequests} onClick={() => actionMutation.mutate({ id: r.id as string, action: 'approve' })}>Duyệt</button>
                    <button className="small danger" disabled={actionMutation.isPending || approveAllMutation.isPending || !canApproveRequests} onClick={() => actionMutation.mutate({ id: r.id as string, action: 'reject' })}>Từ chối</button>
                  </> : <span className="hint">Đã xử lý</span>}
                </td>}
              </tr>;
            })}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
