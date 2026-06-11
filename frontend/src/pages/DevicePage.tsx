import { FormEvent, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { http } from '../api/http';
import type { AttendanceDevice } from '../types';
import { useReferences } from '../hooks/useReferences';
import { optionLabel, viLabel } from '../utils/labels';

type DeviceForm = {
  companyId: string;
  deviceCode: string;
  deviceName: string;
  deviceType: string;
  location: string;
  ipAddress: string;
  apiKey: string;
  active: boolean;
};

const defaultForm: DeviceForm = {
  companyId: '',
  deviceCode: '',
  deviceName: '',
  deviceType: 'WEB_SIMULATOR',
  location: '',
  ipAddress: '',
  apiKey: '',
  active: true
};

function RequiredMark() { return <span className="required-mark"> *</span>; }

export function DevicePage() {
  const queryClient = useQueryClient();
  const refs = useReferences(['companies']);
  const [editing, setEditing] = useState<AttendanceDevice | null>(null);
  const [form, setForm] = useState<DeviceForm>(defaultForm);
  const { data: devices = [], isLoading } = useQuery({
    queryKey: ['devices'],
    queryFn: async () => (await http.get<AttendanceDevice[]>('/devices')).data
  });

  const defaultCompanyId = useMemo(() => String((refs.companies ?? [])[0]?.id ?? devices[0]?.companyId ?? ''), [devices, refs.companies]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = { ...form, companyId: form.companyId || defaultCompanyId || null, apiKey: form.apiKey || null };
      if (editing?.id) return (await http.put(`/devices/${editing.id}`, payload)).data;
      return (await http.post('/devices', payload)).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      setEditing(null);
      setForm(defaultForm);
    }
  });

  function submit(e: FormEvent) {
    e.preventDefault();
    saveMutation.mutate();
  }

  function startEdit(device: AttendanceDevice) {
    setEditing(device);
    setForm({
      companyId: String(device.companyId ?? ''),
      deviceCode: String(device.deviceCode ?? ''),
      deviceName: String(device.deviceName ?? ''),
      deviceType: String(device.deviceType ?? 'WEB_SIMULATOR'),
      location: String(device.location ?? ''),
      ipAddress: String(device.ipAddress ?? ''),
      apiKey: '',
      active: Boolean(device.active)
    });
  }

  return (
    <section>
      <h2>Quản lý thiết bị chấm công</h2>
      <div className="grid-two">
        <form className="card form-grid" onSubmit={submit}>
          <h3>{editing ? 'Cập nhật thiết bị' : 'Thêm thiết bị'}</h3>
          <p className="hint">API key chỉ dùng cho thiết bị chấm công thật gửi dữ liệu qua API. Người dùng chấm công trên web không cần biết API key này. Khi sửa, bỏ trống nếu không muốn đổi.</p>
          <label>Mã thiết bị<RequiredMark /><input required value={form.deviceCode} onChange={(e) => setForm({ ...form, deviceCode: e.target.value })} /></label>
          <label>Tên thiết bị<RequiredMark /><input required value={form.deviceName} onChange={(e) => setForm({ ...form, deviceName: e.target.value })} /></label>
          <label>Loại thiết bị<RequiredMark /><select required value={form.deviceType} onChange={(e) => setForm({ ...form, deviceType: e.target.value })}>
            {['FINGERPRINT', 'FACE_ID', 'CARD_READER', 'MOBILE_APP', 'WEB_SIMULATOR'].map((x) => <option key={x} value={x}>{optionLabel(x)}</option>)}
          </select></label>
          <label>Vị trí<input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></label>
          <label>IP<input value={form.ipAddress} onChange={(e) => setForm({ ...form, ipAddress: e.target.value })} /></label>
          <label>API key thiết bị thật{!editing && <RequiredMark />}<input required={!editing} value={form.apiKey} onChange={(e) => setForm({ ...form, apiKey: e.target.value })} /></label>
          <label className="checkbox"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Hoạt động</label>
          <button>{editing ? 'Lưu' : 'Tạo thiết bị'}</button>
        </form>

        <div className="card table-wrap">
          <h3>Danh sách thiết bị</h3>
          {isLoading ? <p>Đang tải...</p> : <table>
            <thead><tr><th>Mã</th><th>Tên</th><th>Loại</th><th>Vị trí</th><th>Online cuối</th><th>Active</th><th></th></tr></thead>
            <tbody>{devices.map((d) => <tr key={d.id}>
              <td>{d.deviceCode}</td><td>{d.deviceName}</td><td>{viLabel(d.deviceType)}</td><td>{d.location ?? ''}</td><td>{d.lastOnlineAt ?? ''}</td><td>{d.active ? 'Hoạt động' : 'Ngừng sử dụng'}</td>
              <td><button className="small" onClick={() => startEdit(d)}>Sửa</button></td>
            </tr>)}</tbody>
          </table>}
        </div>
      </div>
    </section>
  );
}
