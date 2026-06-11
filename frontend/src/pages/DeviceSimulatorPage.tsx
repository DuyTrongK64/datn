import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { http } from '../api/http';
import { useAuth } from '../state/AuthContext';
import type { PunchHistory, SystemTimeSetting } from '../types';
import { viLabel } from '../utils/labels';

type EventType = 'CHECK_IN' | 'CHECK_OUT' | 'BREAK_IN' | 'BREAK_OUT';

const buttons: Array<{ type: EventType; label: string; hint: string; className: string }> = [
  { type: 'CHECK_IN', label: 'Check in', hint: 'Bắt đầu làm việc', className: 'check-in' },
  { type: 'CHECK_OUT', label: 'Check out', hint: 'Kết thúc làm việc', className: 'check-out' },
  { type: 'BREAK_OUT', label: 'Break out', hint: 'Ra ngoài/nghỉ trưa', className: 'break-out' },
  { type: 'BREAK_IN', label: 'Break in', hint: 'Quay lại làm việc', className: 'break-in' }
];

function timeText(value?: string) {
  if (!value) return '--';
  return value.replace('T', ' ').slice(11, 16);
}

function dateText(value?: string) {
  if (!value) return '--';
  return value.replace('T', ' ').slice(0, 10);
}

export function DeviceSimulatorPage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const { data: timeSetting } = useQuery({
    queryKey: ['system-time'],
    queryFn: async () => (await http.get<SystemTimeSetting>('/system-time')).data
  });
  const { data: history = [], isLoading } = useQuery({
    queryKey: ['my-punch-history', timeSetting?.effectiveDate],
    queryFn: async () => (await http.get<PunchHistory[]>('/devices/my-today-events')).data
  });

  const punchMutation = useMutation({
    mutationFn: async (eventType: EventType) => {
      if (!user?.employeeCode) throw new Error('Tài khoản hiện tại chưa gắn mã nhân viên để chấm công.');
      return (await http.post('/devices/my-punch', { eventType })).data;
    },
    onSuccess: (_data, eventType) => {
      const button = buttons.find((item) => item.type === eventType);
      setMessage(`${button?.label || 'Chấm công'} thành công.`);
      queryClient.invalidateQueries({ queryKey: ['my-punch-history'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['attendances'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-calendar'] });
    },
    onError: (error: any) => setMessage(error.response?.data?.message || error.message || 'Không thể gửi chấm công.')
  });

  return (
    <section className="punch-page">
      <div className="page-hero punch-hero">
        <div>
          <span className="eyebrow">Chấm công</span>
          <h2>Chấm công trong ngày</h2>
          <p>Nhấn một trong bốn nút bên dưới để ghi nhận log chấm công. Hệ thống tự dùng giờ thực tế hoặc giờ demo đã thiết lập.</p>
        </div>
        <span className={`badge ${timeSetting?.useCustomTime ? 'warning-badge' : ''}`}>
          {timeSetting?.effectiveNow?.replace('T', ' ').slice(0, 16) || '--'}
        </span>
      </div>

      <div className="grid-two punch-layout">
        <div className="card form-grid punch-action-card">
          <div className="section-title-row">
            <div>
              <h3>Thao tác chấm công</h3>
              <p>Mã nhân viên: <strong>{user?.employeeCode || 'Chưa gắn mã'}</strong></p>
            </div>
          </div>
          <div className="punch-grid">
            {buttons.map((button) => (
              <button key={button.type} type="button" className={`punch-button ${button.className}`} onClick={() => punchMutation.mutate(button.type)} disabled={punchMutation.isPending || !user?.employeeCode}>
                {button.label}
                <span>{button.hint}</span>
              </button>
            ))}
          </div>
          {message && <p className={message.includes('thành công') ? 'success-text' : 'alert error'}>{message}</p>}
          <p className="hint">Khi demo với hội đồng, bạn có thể đổi thời gian hệ thống ở trang Tổng quan. API key chỉ dùng cho thiết bị chấm công thật gửi dữ liệu qua API.</p>
        </div>

        <div className="card punch-history-card">
          <div className="section-title-row">
            <div>
              <h3>Lịch sử chấm công hôm nay</h3>
              <p>Danh sách log của ngày {timeSetting?.effectiveDate || dateText(timeSetting?.effectiveNow)}.</p>
            </div>
            <span className="badge">{history.length} log</span>
          </div>
          <div className="table-wrap">
            <table className="compact-table">
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Loại chấm công</th>
                  <th>Thiết bị</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? <tr><td colSpan={4}>Đang tải lịch sử...</td></tr> : history.map((event) => (
                  <tr key={event.id}>
                    <td><strong>{timeText(event.eventTime)}</strong></td>
                    <td>{viLabel(event.eventType)}</td>
                    <td>{event.deviceCode || 'DEVICE_001'}</td>
                    <td>{event.valid ? <span className="badge success-badge">Hợp lệ</span> : <span className="badge danger-badge">Không hợp lệ</span>}</td>
                  </tr>
                ))}
                {!isLoading && history.length === 0 && <tr><td colSpan={4}>Hôm nay chưa có log chấm công.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
