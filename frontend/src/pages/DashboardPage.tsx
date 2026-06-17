import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { http } from '../api/http';
import { useAuth } from '../state/AuthContext';
import type { AttendanceSummary, DashboardResponse, LeaveBalance, SystemTimeSetting } from '../types';
import { CommunityFeed } from '../components/CommunityFeed';
import { roleLabel } from '../utils/labels';

type EventType = 'CHECK_IN' | 'CHECK_OUT' | 'BREAK_IN' | 'BREAK_OUT';

const punchButtons: Array<{ type: EventType; label: string; hint: string; className: string }> = [
  { type: 'CHECK_IN', label: 'Check in', hint: 'Bắt đầu làm việc', className: 'check-in' },
  { type: 'CHECK_OUT', label: 'Check out', hint: 'Kết thúc làm việc', className: 'check-out' },
  { type: 'BREAK_OUT', label: 'Break out', hint: 'Ra ngoài/nghỉ trưa', className: 'break-out' },
  { type: 'BREAK_IN', label: 'Break in', hint: 'Quay lại làm việc', className: 'break-in' }
];

function toDateTimeLocal(value?: string) {
  if (!value) return '';
  return value.slice(0, 16);
}

function todayRange(dateText?: string) {
  const today = dateText || new Date().toISOString().slice(0, 10);
  return { from: today, to: today };
}

function minutesToHourText(minutes?: number) {
  const value = minutes ?? 0;
  const h = Math.floor(value / 60);
  const m = value % 60;
  return `${h}h${String(m).padStart(2, '0')}`;
}

export function DashboardPage() {
  const queryClient = useQueryClient();
  const { user, hasRole } = useAuth();
  const isAdmin = hasRole('ADMIN');
  const isLeader = hasRole('LEADER') && !isAdmin;
  const [useCustomTime, setUseCustomTime] = useState(false);
  const [customDateTime, setCustomDateTime] = useState('');
  const [note, setNote] = useState('');
  const [punchMessage, setPunchMessage] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => (await http.get<DashboardResponse>('/dashboard')).data
  });
  const { data: timeSetting } = useQuery({
    queryKey: ['system-time'],
    queryFn: async () => (await http.get<SystemTimeSetting>('/system-time')).data
  });

  const effectiveToday = timeSetting?.effectiveDate || timeSetting?.effectiveNow?.slice(0, 10) || new Date().toISOString().slice(0, 10);
  const { from, to } = todayRange(effectiveToday);

  const { data: mySummaryRows = [] } = useQuery({
    queryKey: ['dashboard-my-summary', user?.employeeId, from, to],
    queryFn: async () => (await http.get<AttendanceSummary[]>(`/attendances/employee/${user?.employeeId}/summary?from=${from}&to=${to}`)).data,
    enabled: Boolean(user?.employeeId)
  });

  const { data: myLeaveBalances = [] } = useQuery({
    queryKey: ['dashboard-my-leave', user?.employeeId],
    queryFn: async () => (await http.get<LeaveBalance[]>(`/leave-balances/employee/${user?.employeeId}`)).data,
    enabled: Boolean(user?.employeeId)
  });

  const mySummary = mySummaryRows[0];
  const annualLeave = myLeaveBalances[0];

  useEffect(() => {
    if (!timeSetting) return;
    setUseCustomTime(Boolean(timeSetting.useCustomTime));
    setCustomDateTime(toDateTimeLocal(timeSetting.customDateTime || timeSetting.effectiveNow));
    setNote(timeSetting.note || '');
  }, [timeSetting]);

  const updateTimeMutation = useMutation({
    mutationFn: async () => (await http.put<SystemTimeSetting>('/system-time', {
      useCustomTime,
      customDateTime: customDateTime ? `${customDateTime}:00` : null,
      note
    })).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system-time'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['attendances'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-summary'] });
      queryClient.invalidateQueries({ queryKey: ['my-punch-history'] });
    }
  });

  const punchMutation = useMutation({
    mutationFn: async (eventType: EventType) => {
      if (!user?.employeeCode) throw new Error('Tài khoản hiện tại chưa gắn mã nhân viên để chấm công.');
      return (await http.post('/devices/my-punch', { eventType })).data;
    },
    onSuccess: (_data, eventType) => {
      const button = punchButtons.find((item) => item.type === eventType);
      setPunchMessage(`${button?.label || 'Chấm công'} thành công.`);
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-my-summary'] });
      queryClient.invalidateQueries({ queryKey: ['my-punch-history'] });
      queryClient.invalidateQueries({ queryKey: ['attendances'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-calendar'] });
    },
    onError: (error: any) => setPunchMessage(error.response?.data?.message || error.message || 'Không thể chấm công.')
  });

  const greeting = useMemo(() => {
    const hour = Number((timeSetting?.effectiveNow || new Date().toISOString()).slice(11, 13));
    if (hour < 11) return 'Chào buổi sáng';
    if (hour < 14) return 'Chào buổi trưa';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  }, [timeSetting?.effectiveNow]);

  if (isLoading) return <div className="card">Đang tải trang cá nhân...</div>;

  return (
    <section className="dashboard-page personalized-home">
      <div className="home-hero">
        <div>
          <span className="eyebrow">Trang bắt đầu cá nhân</span>
          <h2>{greeting}, {user?.employeeName || user?.fullName || user?.username}</h2>
          <p>{user?.employeeCode} · {user?.roles.map(roleLabel).join(', ')} · {user?.departmentName || 'Chưa có phòng ban'}{user?.teams?.length ? ` · ${user.teams.map((team) => team.name).join(', ')}` : ''}</p>
        </div>
        <div className="home-hero-actions">
          <Link className="secondary" to="/my-attendance">Xem bảng công</Link>
          <Link className="secondary" to="/requests">Xem đơn từ</Link>
          <Link to="/community">Bảng tin</Link>
        </div>
      </div>

      <div className="home-kpi-grid">
        <div className="stat-card polished-stat"><span>Công hôm nay</span><strong>{minutesToHourText(mySummary?.totalWorkingMinutes)}</strong><small>Thời gian làm được tính trong ngày</small></div>
        <div className="stat-card polished-stat"><span>OT hôm nay</span><strong>{minutesToHourText(mySummary?.totalOvertimeMinutes)}</strong><small>Tính cả ngày nghỉ nếu có</small></div>
        <div className="stat-card polished-stat"><span>Phép còn lại</span><strong>{annualLeave?.remainingDays ?? '--'}</strong><small>Quy đổi 8 giờ = 1 ngày phép</small></div>
        <div className="stat-card polished-stat"><span>Đơn chờ duyệt</span><strong>{data?.pendingRequests ?? 0}</strong><small>{isLeader || isAdmin ? 'Đơn cần xử lý theo quyền' : 'Đơn trong hệ thống'}</small></div>
      </div>

      <div className="dashboard-grid home-main-grid">
        <div className="card quick-punch-card">
          <div className="section-title-row">
            <div>
              <h3>Chấm công nhanh</h3>
              <p>Dùng cho thao tác hằng ngày. Hệ thống tự lấy giờ thực tế hoặc giờ demo.</p>
            </div>
            <span className="badge">{timeSetting?.effectiveNow?.replace('T', ' ').slice(0, 16) || '--'}</span>
          </div>
          <div className="punch-grid dashboard-punch-grid">
            {punchButtons.map((button) => (
              <button key={button.type} type="button" className={`punch-button ${button.className}`} onClick={() => punchMutation.mutate(button.type)} disabled={punchMutation.isPending || !user?.employeeCode}>
                {button.label}
                <span>{button.hint}</span>
              </button>
            ))}
          </div>
          {punchMessage && <p className={punchMessage.includes('thành công') ? 'success-text' : 'alert error'}>{punchMessage}</p>}
        </div>

        <div className="card personal-shortcuts">
          <h3>Lối tắt của tôi</h3>
          <div className="shortcut-grid">
            <Link to="/device-simulator">Chấm công</Link>
            <Link to="/requests/leave">Xin nghỉ phép</Link>
            <Link to="/requests/missing-check">Bổ sung công</Link>
            <button type="button" onClick={() => window.dispatchEvent(new Event('open-floating-chatbot'))}>Hỏi trợ lý</button>
            {(isAdmin || isLeader) && <Link to="/approvals">Duyệt đơn</Link>}
            {isAdmin && <Link to="/employees">Quản lý nhân viên</Link>}
          </div>
        </div>
      </div>

      <div className="dashboard-grid home-main-grid">
        <div className="card community-preview-card">
          <div className="section-title-row">
            <div>
              <h3>Bảng tin mới nhất</h3>
              <p>Cập nhật chia sẻ nội bộ và trao đổi giữa các thành viên.</p>
            </div>
            <Link className="secondary" to="/community">Xem tất cả</Link>
          </div>
          <CommunityFeed compact />
        </div>

        <div className="card system-time-card demo-tool-card">
          <div className="system-time-title-row">
            <div>
              <h3>Công cụ mô phỏng thời gian</h3>
              <p>Thời gian hiệu lực: <strong>{timeSetting?.effectiveNow?.replace('T', ' ').slice(0, 16) || '--'}</strong></p>
            </div>
            <span className={`badge ${timeSetting?.useCustomTime ? 'warning-badge' : ''}`}>{timeSetting?.useCustomTime ? 'Giờ demo' : 'Giờ thực tế'}</span>
          </div>
          {isAdmin ? <div className="filters system-time-form">
            <label className="checkbox-row"><input type="checkbox" checked={useCustomTime} onChange={(e) => setUseCustomTime(e.target.checked)} /> Sử dụng giờ demo</label>
            <label>Ngày giờ demo<input type="datetime-local" value={customDateTime} onChange={(e) => setCustomDateTime(e.target.value)} disabled={!useCustomTime} /></label>
            <label>Ghi chú<input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ví dụ: Demo ngày bảo vệ đồ án" /></label>
            <button type="button" onClick={() => updateTimeMutation.mutate()} disabled={updateTimeMutation.isPending}>{updateTimeMutation.isPending ? 'Đang lưu...' : 'Lưu thiết lập'}</button>
          </div> : <p className="hint">Chỉ Admin được thay đổi thời gian demo. Các thao tác nghiệp vụ vẫn dùng thời gian đang hiệu lực.</p>}
        </div>
      </div>
    </section>
  );
}
