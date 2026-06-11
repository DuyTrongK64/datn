import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { http } from '../api/http';
import { useAuth } from '../state/AuthContext';
import type { DashboardResponse, SystemTimeSetting } from '../types';

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

export function DashboardPage() {
  const queryClient = useQueryClient();
  const { user, hasRole } = useAuth();
  const isAdmin = hasRole('ADMIN');
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => (await http.get<DashboardResponse>('/dashboard')).data
  });
  const { data: timeSetting } = useQuery({
    queryKey: ['system-time'],
    queryFn: async () => (await http.get<SystemTimeSetting>('/system-time')).data
  });
  const [useCustomTime, setUseCustomTime] = useState(false);
  const [customDateTime, setCustomDateTime] = useState('');
  const [note, setNote] = useState('');
  const [punchMessage, setPunchMessage] = useState('');

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
      setPunchMessage(`${button?.label || 'Chấm công'} thành công lúc ${timeSetting?.effectiveNow?.replace('T', ' ').slice(0, 16) || 'hiện tại'}.`);
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['my-punch-history'] });
      queryClient.invalidateQueries({ queryKey: ['attendances'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-calendar'] });
    },
    onError: (error: any) => setPunchMessage(error.response?.data?.message || error.message || 'Không thể chấm công.')
  });

  if (isLoading) return <div className="card">Đang tải tổng quan...</div>;

  const items = [
    ['Tổng nhân viên', data?.totalEmployees, 'Nhân sự đang được quản lý'],
    ['Đã check-in hôm nay', data?.checkedInToday, 'Dữ liệu từ thiết bị/chấm công nhanh'],
    ['Đi muộn hôm nay', data?.lateToday, 'Không tính cuối tuần/ngày lễ'],
    ['Vắng hôm nay', data?.absentToday, 'Cần kiểm tra đơn từ hoặc bổ sung công'],
    ['Đơn chờ duyệt', data?.pendingRequests, 'Cần Leader/Admin xử lý'],
    ['Thiết bị online', `${data?.onlineDevices ?? 0}/${data?.totalDevices ?? 0}`, 'Trạng thái thiết bị chấm công']
  ];

  return (
    <section className="dashboard-page">
      <div className="page-hero dashboard-hero">
        <div>
          <span className="eyebrow">Tổng quan hệ thống</span>
          <h2>Tình hình chấm công hôm nay</h2>
          <p>Theo dõi nhanh tình trạng nhân sự, thiết bị, đơn từ và dữ liệu bảng công trong ngày.</p>
        </div>
        <span className={`badge ${timeSetting?.useCustomTime ? 'warning-badge' : ''}`}>
          {timeSetting?.useCustomTime ? 'Đang dùng giờ demo' : 'Đang dùng giờ thực tế'}
        </span>
      </div>

      <div className="stats-grid dashboard-stats">
        {items.map(([label, value, description]) => (
          <div className="stat-card polished-stat" key={label as string}>
            <span>{label}</span>
            <strong>{value ?? 0}</strong>
            <small>{description}</small>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card quick-punch-card">
          <div className="section-title-row">
            <div>
              <h3>Chấm công nhanh</h3>
              <p>Thực hiện chấm công ngay trên trang tổng quan. Dữ liệu sẽ dùng giờ thực tế hoặc giờ demo theo thiết lập hệ thống.</p>
            </div>
            <span className="badge">{user?.employeeCode || 'Chưa gắn mã NV'}</span>
          </div>
          <div className="inline-note">Thời gian hiệu lực: <strong>{timeSetting?.effectiveNow?.replace('T', ' ').slice(0, 16) || '--'}</strong></div>
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
          </div> : <p className="hint">Chỉ Admin được thay đổi thời gian demo.</p>}
          <p className="hint">Khi bật giờ demo, các thao tác chấm công, tạo đơn, phê duyệt và dashboard sẽ dùng thời gian đã thiết lập.</p>
        </div>
      </div>
    </section>
  );
}
