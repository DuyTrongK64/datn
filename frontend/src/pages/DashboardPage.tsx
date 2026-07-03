import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { http } from '../api/http';
import { useAuth } from '../state/AuthContext';
import type { DashboardResponse, SystemTimeSetting } from '../types';
import { roleLabel, viLabel } from '../utils/labels';

type EventType = 'CHECK_IN' | 'CHECK_OUT' | 'BREAK_IN' | 'BREAK_OUT';

const punchButtons: Array<{ type: EventType; label: string; hint: string; className: string }> = [
  { type: 'CHECK_IN', label: 'Check in', hint: 'Bắt đầu làm việc', className: 'check-in' },
  { type: 'CHECK_OUT', label: 'Check out', hint: 'Kết thúc làm việc', className: 'check-out' },
  { type: 'BREAK_OUT', label: 'Break out', hint: 'Ra ngoài/nghỉ trưa', className: 'break-out' },
  { type: 'BREAK_IN', label: 'Break in', hint: 'Quay lại làm việc', className: 'break-in' }
];

function minutesToHourText(minutes?: number) {
  const value = minutes ?? 0;
  const h = Math.floor(value / 60);
  const m = value % 60;
  return `${h}h${String(m).padStart(2, '0')}`;
}

function dateTimeText(value?: string) {
  if (!value) return '--';
  return value.replace('T', ' ').slice(0, 16);
}

function dateText(value?: string) {
  if (!value) return '--';
  return value.slice(0, 10);
}

function statusText(value?: string) {
  if (!value) return '--';
  if (value === 'NO_DATA') return 'Chưa có dữ liệu';
  return viLabel(value);
}

function roleDashboardTitle(role?: string) {
  if (role === 'ADMIN') return 'Dashboard quản trị hệ thống';
  if (role === 'LEADER') return 'Dashboard leader theo team';
  return 'Dashboard cá nhân nhân viên';
}

function greeting(now?: string) {
  const hour = Number((now || new Date().toISOString()).slice(11, 13));
  if (hour < 11) return 'Chào buổi sáng';
  if (hour < 14) return 'Chào buổi trưa';
  if (hour < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
}

export function DashboardPage() {
  const queryClient = useQueryClient();
  const { user, hasRole } = useAuth();
  const isAdmin = hasRole('ADMIN');
  const isLeaderOnly = hasRole('LEADER') && !isAdmin;
  const [punchMessage, setPunchMessage] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => (await http.get<DashboardResponse>('/dashboard')).data
  });

  const { data: timeSetting } = useQuery({
    queryKey: ['system-time'],
    queryFn: async () => (await http.get<SystemTimeSetting>('/system-time')).data
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
      queryClient.invalidateQueries({ queryKey: ['attendances'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-calendar'] });
      queryClient.invalidateQueries({ queryKey: ['my-punch-history'] });
    },
    onError: (error: any) => setPunchMessage(error.response?.data?.message || error.message || 'Không thể chấm công.')
  });

  const roleTitle = roleDashboardTitle(data?.roleDashboard);
  const personalName = data?.personal?.employeeName || user?.employeeName || user?.fullName || user?.username;
  const effectiveNow = timeSetting?.effectiveNow || `${data?.today || ''}T00:00:00`;

  const quickLinks = useMemo(() => {
    if (isAdmin) {
      return [
        { to: '/attendances', label: 'Xem bảng công toàn công ty' },
        { to: '/requests', label: 'Quản lý đơn từ' },
        { to: '/employees', label: 'Quản lý nhân viên' },
        { to: '/approvals', label: 'Phê duyệt đơn' },
        { to: '/devices', label: 'Thiết bị chấm công' }
      ];
    }
    if (isLeaderOnly) {
      return [
        { to: '/attendances', label: 'Xem bảng công team' },
        { to: '/requests', label: 'Xem đơn từ team' },
        { to: '/employees', label: 'Xem nhân viên team' },
        { to: '/teams', label: 'Xem team phụ trách' },
        { to: '/leave-balances', label: 'Xem quỹ phép team' }
      ];
    }
    return [
      { to: '/device-simulator', label: 'Chấm công nhanh' },
      { to: '/my-attendance', label: 'Bảng công của tôi' },
      { to: '/requests/leave', label: 'Xin nghỉ phép' },
      { to: '/requests/missing-check', label: 'Bổ sung chấm công' },
      { to: '/requests', label: 'Đơn từ của tôi' }
    ];
  }, [isAdmin, isLeaderOnly]);

  if (isLoading) return <div className="card">Đang tải dashboard cá nhân...</div>;

  return (
    <section className="role-dashboard-page">
      <div className="role-dashboard-hero">
        <div>
          <span className="eyebrow">{roleTitle}</span>
          <h2>{greeting(effectiveNow)}, {personalName}</h2>
          <p>
            {user?.employeeCode || data?.personal?.employeeCode || 'Chưa có mã nhân viên'} · {user?.roles.map(roleLabel).join(', ')} · Phạm vi: <strong>{data?.scopeLabel}</strong> · Ngày {dateText(data?.today)}
          </p>
          {data?.personal?.teamNames?.length ? <p className="muted-line">Team: {data.personal.teamNames.join(', ')}</p> : null}
        </div>
        <div className="hero-status-card">
          <span>Trạng thái hôm nay</span>
          <strong>{statusText(data?.todayAttendance?.status)}</strong>
          <small>Check-in: {dateTimeText(data?.todayAttendance?.firstCheckIn)} · Check-out: {dateTimeText(data?.todayAttendance?.lastCheckOut)}</small>
        </div>
      </div>

      <div className="role-kpi-grid">
        <div className="stat-card polished-stat">
          <span>{isAdmin ? 'Tổng nhân viên' : isLeaderOnly ? 'Nhân viên trong team' : 'Phạm vi cá nhân'}</span>
          <strong>{data?.totalEmployees ?? 0}</strong>
          <small>{data?.scopeLabel}</small>
        </div>
        <div className="stat-card polished-stat">
          <span>Đã check-in hôm nay</span>
          <strong>{data?.checkedInToday ?? 0}</strong>
          <small>Trong phạm vi được xem</small>
        </div>
        <div className="stat-card polished-stat">
          <span>Đi muộn hôm nay</span>
          <strong>{data?.lateToday ?? 0}</strong>
          <small>Theo kết quả tính công</small>
        </div>
        <div className="stat-card polished-stat">
          <span>Vắng/chưa có công</span>
          <strong>{data?.absentToday ?? 0}</strong>
          <small>Theo bảng công ngày</small>
        </div>
        <div className="stat-card polished-stat">
          <span>Đơn chờ duyệt</span>
          <strong>{data?.pendingRequests ?? 0}</strong>
          <small>{isLeaderOnly ? 'Leader chỉ xem, không phê duyệt' : 'Theo phạm vi quyền'}</small>
        </div>
        {isAdmin && <div className="stat-card polished-stat">
          <span>Thiết bị online</span>
          <strong>{data?.onlineDevices ?? 0}/{data?.totalDevices ?? 0}</strong>
          <small>Trạng thái kỹ thuật gần nhất</small>
        </div>}
      </div>

      <div className="dashboard-grid role-dashboard-main-grid">
        <div className="card quick-punch-card">
          <div className="section-title-row">
            <div>
              <h3>Chấm công nhanh của tôi</h3>
              <p>Thao tác này chỉ áp dụng cho tài khoản đang đăng nhập.</p>
            </div>
            <span className="badge">{dateTimeText(timeSetting?.effectiveNow)}</span>
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
          <h3>Lối tắt theo vai trò</h3>
          <div className="shortcut-grid">
            {quickLinks.map((link) => <Link key={link.to} to={link.to}>{link.label}</Link>)}
          </div>
          {isLeaderOnly && <p className="inline-note">Leader hiện chỉ có quyền xem dữ liệu team mình. Các thao tác thêm, sửa, xóa, duyệt đơn đã được khóa ở cả giao diện và backend.</p>}
        </div>
      </div>

      <div className="dashboard-grid role-dashboard-main-grid">
        <div className="card">
          <h3>{isLeaderOnly ? 'Tổng quan các team phụ trách' : isAdmin ? 'Tổng quan team/phòng ban' : 'Thông tin cá nhân hôm nay'}</h3>
          {data?.teams?.length ? (
            <div className="team-dashboard-list">
              {data.teams.map((team) => (
                <div className="team-dashboard-card" key={team.teamId}>
                  <div>
                    <strong>{team.teamCode ? `${team.teamCode} - ${team.teamName}` : team.teamName}</strong>
                    <span>{team.memberCount} thành viên</span>
                  </div>
                  <div className="team-dashboard-metrics">
                    <span>Check-in <b>{team.checkedInToday}</b></span>
                    <span>Muộn <b>{team.lateToday}</b></span>
                    <span>Vắng <b>{team.absentToday}</b></span>
                    <span>Đơn chờ <b>{team.pendingRequests}</b></span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="personal-today-card">
              <p><strong>Công hôm nay:</strong> {minutesToHourText(data?.todayAttendance?.totalWorkingMinutes)}</p>
              <p><strong>OT hôm nay:</strong> {minutesToHourText(data?.todayAttendance?.overtimeMinutes)}</p>
              <p><strong>Đi muộn:</strong> {data?.todayAttendance?.lateMinutes ?? 0} phút</p>
              <p><strong>Phép còn lại:</strong> {data?.leaveBalance?.remainingDays ?? '--'} ngày</p>
            </div>
          )}
        </div>

        <div className="card">
          <h3>{isLeaderOnly ? 'Nhân viên trong team' : isAdmin ? 'Nhân viên nổi bật trong phạm vi' : 'Thông tin của tôi'}</h3>
          <div className="mini-table-list">
            {data?.employees?.map((employee) => (
              <div className="mini-table-row" key={employee.employeeId}>
                <div>
                  <strong>{employee.employeeCode} - {employee.employeeName}</strong>
                  <span>{employee.departmentName || '--'}{employee.teamName ? ` · ${employee.teamName}` : ''}</span>
                </div>
                <span className="badge">{statusText(employee.todayStatus)}</span>
              </div>
            ))}
            {!data?.employees?.length && <p className="hint">Chưa có nhân viên trong phạm vi xem.</p>}
          </div>
        </div>
      </div>

      <div className="card table-wrap wide">
        <div className="section-title-row">
          <div>
            <h3>{isLeaderOnly ? 'Đơn từ gần đây của team' : isAdmin ? 'Đơn từ gần đây trong hệ thống' : 'Đơn từ gần đây của tôi'}</h3>
            <p>{isLeaderOnly ? 'Chỉ hiển thị đơn của nhân viên thuộc team leader phụ trách.' : 'Theo phạm vi dữ liệu hiện tại.'}</p>
          </div>
          <Link className="secondary button-like" to="/requests">Xem tất cả</Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nhân viên</th>
              <th>Loại đơn</th>
              <th>Ngày</th>
              <th>Trạng thái</th>
              <th>Lý do</th>
            </tr>
          </thead>
          <tbody>
            {data?.recentRequests?.map((request) => (
              <tr key={request.id}>
                <td>{request.employeeCode ? `${request.employeeCode} - ${request.employeeName}` : request.employeeName}</td>
                <td>{request.requestTypeName || viLabel(request.requestTypeCode)}</td>
                <td>{dateText(request.targetDate)}{request.endDate ? ` → ${dateText(request.endDate)}` : ''}</td>
                <td><span className="badge">{statusText(request.status)}</span></td>
                <td>{request.reason || ''}</td>
              </tr>
            ))}
            {!data?.recentRequests?.length && <tr><td colSpan={5}>Chưa có đơn từ trong phạm vi hiển thị.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}
