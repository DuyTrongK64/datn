import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { http } from '../api/http';
import { useAuth } from '../state/AuthContext';
import type { PunchHistory, SystemTimeSetting } from '../types';
import { AppDatePicker, AppDateTimePicker } from '../components/AppDatePickers';
import { viLabel } from '../utils/labels';

type EventType = 'CHECK_IN' | 'CHECK_OUT' | 'BREAK_IN' | 'BREAK_OUT';

type SystemTimePayload = {
  useCustomTime: boolean;
  customDateTime: string | null;
  note: string;
};

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

function dateTimeText(value?: string) {
  if (!value) return '--';
  return value.replace('T', ' ').slice(0, 16);
}

function dateTimeInputValue(value?: string) {
  if (!value) return '';
  return value.slice(0, 16);
}

export function DeviceSimulatorPage() {
  const queryClient = useQueryClient();
  const { user, hasRole } = useAuth();
  const isAdmin = hasRole('ADMIN');

  const [message, setMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [timeForm, setTimeForm] = useState({
    useCustomTime: false,
    customDateTime: '',
    note: ''
  });

  const { data: timeSetting } = useQuery({
    queryKey: ['system-time'],
    queryFn: async () => (await http.get<SystemTimeSetting>('/system-time')).data
  });

  const effectiveDate =
    timeSetting?.effectiveDate ||
    (timeSetting?.effectiveNow ? dateText(timeSetting.effectiveNow) : '');

  useEffect(() => {
    if (!selectedDate && effectiveDate) {
      setSelectedDate(effectiveDate);
    }
  }, [effectiveDate, selectedDate]);

  useEffect(() => {
    if (!timeSetting) return;

    setTimeForm({
      useCustomTime: Boolean(timeSetting.useCustomTime),
      customDateTime: dateTimeInputValue(timeSetting.customDateTime || timeSetting.effectiveNow),
      note: timeSetting.note || ''
    });
  }, [
    timeSetting?.id,
    timeSetting?.useCustomTime,
    timeSetting?.customDateTime,
    timeSetting?.effectiveNow,
    timeSetting?.note
  ]);

  const isToday = Boolean(effectiveDate && selectedDate === effectiveDate);
  const isPastDate = Boolean(effectiveDate && selectedDate < effectiveDate);
  const isFutureDate = Boolean(effectiveDate && selectedDate > effectiveDate);

  const { data: history = [], isLoading } = useQuery({
    queryKey: ['my-punch-history', selectedDate],
    queryFn: async () =>
      (await http.get<PunchHistory[]>(`/devices/my-today-events?date=${selectedDate}`)).data,
    enabled: Boolean(selectedDate)
  });

  const punchMutation = useMutation({
    mutationFn: async (eventType: EventType) => {
      if (!user?.employeeCode) {
        throw new Error('Tài khoản hiện tại chưa gắn mã nhân viên để chấm công.');
      }

      return (await http.post('/devices/my-punch', { eventType })).data;
    },
    onSuccess: (_data, eventType) => {
      const button = buttons.find((item) => item.type === eventType);

      setMessage(`${button?.label || 'Chấm công'} thành công.`);

      queryClient.invalidateQueries({ queryKey: ['my-punch-history'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['attendances'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-calendar'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-summary'] });
    },
    onError: (error: any) => {
      setMessage(error.response?.data?.message || error.message || 'Không thể gửi chấm công.');
    }
  });

  const timeMutation = useMutation({
    mutationFn: async (payload: SystemTimePayload) =>
      (await http.put<SystemTimeSetting>('/system-time', payload)).data,
    onSuccess: (data) => {
      const nextEffectiveDate =
        data.effectiveDate ||
        (data.effectiveNow ? dateText(data.effectiveNow) : '');

      setTimeForm({
        useCustomTime: Boolean(data.useCustomTime),
        customDateTime: dateTimeInputValue(data.customDateTime || data.effectiveNow),
        note: data.note || ''
      });

      if (nextEffectiveDate) {
        setSelectedDate(nextEffectiveDate);
      }

      queryClient.invalidateQueries({ queryKey: ['system-time'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['attendances'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-summary'] });
      queryClient.invalidateQueries({ queryKey: ['my-punch-history'] });

      setMessage('Cập nhật giờ hệ thống thành công.');
    },
    onError: (error: any) => {
      setMessage(error.response?.data?.message || error.message || 'Không thể cập nhật giờ hệ thống.');
    }
  });

  const canPunch = isToday && Boolean(user?.employeeCode) && !punchMutation.isPending;

  function saveDemoTime() {
    timeMutation.mutate({
      useCustomTime: timeForm.useCustomTime,
      customDateTime: timeForm.useCustomTime && timeForm.customDateTime
        ? timeForm.customDateTime
        : null,
      note: timeForm.note || (timeForm.useCustomTime ? 'Giờ giả lập phục vụ demo' : 'Dùng giờ thực tế')
    });
  }

  function disableDemoTime() {
    timeMutation.mutate({
      useCustomTime: false,
      customDateTime: null,
      note: 'Dùng giờ thực tế'
    });
  }

  return (
    <section className="punch-page">
      <div className="page-hero punch-hero">
        <div>
          <span className="eyebrow">Chấm công</span>
          <h2>Chấm công trong ngày</h2>
          <p>
            Nhấn một trong bốn nút bên dưới để ghi nhận log chấm công.
            Khi chọn ngày trong quá khứ, hệ thống chỉ hiển thị lịch sử và khóa thao tác chấm công.
          </p>
        </div>

        <span className={`badge ${timeSetting?.useCustomTime ? 'warning-badge' : ''}`}>
          {dateTimeText(timeSetting?.effectiveNow)}
        </span>
      </div>

      <div className="grid-two punch-layout">
        <div className="punch-left-stack">
          <div className="card form-grid punch-action-card">
            <div className="section-title-row">
              <div>
                <h3>Thao tác chấm công</h3>
                <p>
                  Mã nhân viên: <strong>{user?.employeeCode || 'Chưa gắn mã'}</strong>
                </p>
              </div>
            </div>

            <AppDatePicker
              label="Ngày xem log"
              value={selectedDate}
              onChange={(value) => {
                setSelectedDate(value);
                setMessage('');
              }}
            />

            {isPastDate && (
              <p className="hint">
                Bạn đang xem lịch sử ngày cũ, các nút chấm công đã bị khóa.
              </p>
            )}

            {isFutureDate && (
              <p className="hint">
                Không thể chấm công cho ngày tương lai.
              </p>
            )}

            {!user?.employeeCode && (
              <p className="alert error">
                Tài khoản hiện tại chưa gắn mã nhân viên nên không thể chấm công.
              </p>
            )}

            <div className="punch-grid">
              {buttons.map((button) => (
                <button
                  key={button.type}
                  type="button"
                  className={`punch-button ${button.className}`}
                  onClick={() => punchMutation.mutate(button.type)}
                  disabled={!canPunch}
                >
                  {button.label}
                  <span>{button.hint}</span>
                </button>
              ))}
            </div>

            {message && (
              <p className={message.includes('thành công') ? 'success-text' : 'alert error'}>
                {message}
              </p>
            )}

            <p className="hint">
              Khi demo với hội đồng, admin có thể đổi giờ hệ thống bằng khối Giờ giả lập demo bên dưới.
              API key chỉ dùng cho thiết bị chấm công thật gửi dữ liệu qua API.
            </p>
          </div>

          {isAdmin && (
            <div className="card system-time-card">
              <div className="section-title-row">
                <div>
                  <h3>Giờ giả lập demo</h3>
                  <p>Dùng để demo chấm công, đơn từ và bảng công theo ngày mong muốn.</p>
                </div>

                <span className={`badge ${timeSetting?.useCustomTime ? 'warning-badge' : ''}`}>
                  {timeSetting?.useCustomTime ? 'Đang giả lập' : 'Giờ thực tế'}
                </span>
              </div>

              <div className="form-grid compact-filter">
                <label className="checkbox-line">
                  <input
                    type="checkbox"
                    checked={timeForm.useCustomTime}
                    onChange={(e) =>
                      setTimeForm((prev) => ({
                        ...prev,
                        useCustomTime: e.target.checked
                      }))
                    }
                  />
                  Bật giờ giả lập
                </label>

                <AppDateTimePicker
                  label="Thời gian demo"
                  value={timeForm.customDateTime}
                  disabled={!timeForm.useCustomTime}
                  onChange={(value) =>
                    setTimeForm((prev) => ({
                      ...prev,
                      customDateTime: value
                    }))
                  }
                />

                <label>
                  Ghi chú
                  <input
                    value={timeForm.note}
                    onChange={(e) =>
                      setTimeForm((prev) => ({
                        ...prev,
                        note: e.target.value
                      }))
                    }
                    placeholder="Ví dụ: Demo ngày 08/07"
                  />
                </label>

                <div className="filter-actions">
                  <button
                    type="button"
                    onClick={saveDemoTime}
                    disabled={
                      timeMutation.isPending ||
                      (timeForm.useCustomTime && !timeForm.customDateTime)
                    }
                  >
                    {timeMutation.isPending ? 'Đang lưu...' : 'Lưu giờ demo'}
                  </button>

                  <button
                    type="button"
                    className="secondary"
                    onClick={disableDemoTime}
                    disabled={timeMutation.isPending}
                  >
                    Tắt giả lập
                  </button>
                </div>

                <p className="hint">
                  Hiện tại: <strong>{dateTimeText(timeSetting?.effectiveNow)}</strong>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="card punch-history-card">
          <div className="section-title-row">
            <div>
              <h3>{isToday ? 'Lịch sử chấm công hôm nay' : 'Lịch sử chấm công'}</h3>
              <p>Danh sách log của ngày {selectedDate || '--'}.</p>
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
                {isLoading ? (
                  <tr>
                    <td colSpan={4}>Đang tải lịch sử...</td>
                  </tr>
                ) : (
                  history.map((event) => (
                    <tr key={event.id}>
                      <td>
                        <strong>{timeText(event.eventTime)}</strong>
                      </td>
                      <td>{viLabel(event.eventType)}</td>
                      <td>{event.deviceCode || 'DEVICE_001'}</td>
                      <td>
                        {event.valid ? (
                          <span className="badge success-badge">Hợp lệ</span>
                        ) : (
                          <span className="badge danger-badge">Không hợp lệ</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}

                {!isLoading && history.length === 0 && (
                  <tr>
                    <td colSpan={4}>Ngày này chưa có log chấm công.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}