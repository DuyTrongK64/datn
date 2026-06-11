import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { changeMyPassword, getMe, updateMyProfile } from '../api/authApi';
import { useAuth } from '../state/AuthContext';
import { roleLabel } from '../utils/labels';
import { codeName } from '../utils/format';
import type { ChangePasswordRequest, UpdateProfileRequest } from '../types';

function errorMessage(error: unknown, fallback: string) {
  return (error as any)?.response?.data?.message || fallback;
}

export function ProfilePage() {
  const { user, setCurrentUser } = useAuth();
  const [form, setForm] = useState<UpdateProfileRequest>({});
  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordForm, setPasswordForm] = useState<ChangePasswordRequest>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    setForm({
      fullName: user?.fullName ?? user?.employeeName ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      gender: user?.gender ?? '',
      dateOfBirth: user?.dateOfBirth ?? '',
      address: user?.address ?? ''
    });
  }, [user]);

  const updateMutation = useMutation({
    mutationFn: updateMyProfile,
    onMutate: () => setProfileMessage(''),
    onSuccess: async (updated) => {
      setCurrentUser(updated);
      setProfileMessage('Đã cập nhật thông tin cá nhân.');
      try {
        const freshUser = await getMe();
        setCurrentUser(freshUser);
      } catch {
        // Đã cập nhật thành công, bỏ qua lỗi làm mới hồ sơ nếu có.
      }
    }
  });

  const passwordMutation = useMutation({
    mutationFn: changeMyPassword,
    onMutate: () => setPasswordMessage(''),
    onSuccess: () => {
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordMessage('Đã đổi mật khẩu thành công.');
    }
  });

  function update<K extends keyof UpdateProfileRequest>(key: K, value: UpdateProfileRequest[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updatePassword<K extends keyof ChangePasswordRequest>(key: K, value: ChangePasswordRequest[K]) {
    setPasswordForm((prev) => ({ ...prev, [key]: value }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    updateMutation.mutate({
      ...form,
      fullName: form.fullName?.trim(),
      email: form.email?.trim(),
      phone: form.phone?.trim(),
      gender: form.gender?.trim(),
      address: form.address?.trim(),
      dateOfBirth: form.dateOfBirth || undefined
    });
  }

  function submitPassword(e: FormEvent) {
    e.preventDefault();
    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage('Xác nhận mật khẩu mới không khớp.');
      return;
    }
    passwordMutation.mutate(passwordForm);
  }

  const passwordMessageIsError = passwordMessage.includes('không') || passwordMessage.includes('phải') || passwordMessage.includes('khớp');

  const teamText = useMemo(() => user?.teams?.length
    ? user.teams.map((team) => codeName(team.code, team.name, team.id)).join(', ')
    : '--', [user?.teams]);

  return (
    <section className="profile-page">
      <div className="page-hero profile-hero">
        <div>
          <span className="eyebrow">Tài khoản cá nhân</span>
          <h2>Hồ sơ của tôi</h2>
          <p>Cập nhật thông tin liên hệ, đổi mật khẩu và xem phòng ban/nhóm làm việc của bạn.</p>
        </div>
        <span className="badge">{user?.employeeCode || user?.username}</span>
      </div>

      <div className="grid-two profile-edit-grid">
        <div className="profile-left-stack">
          <form className="card form-grid profile-form-card" onSubmit={submit}>
            <div className="section-title-row">
              <div>
                <h3>Thông tin cá nhân</h3>
                <p>Nhân viên được tự cập nhật thông tin cá nhân, không được tự thay đổi vai trò/quyền hệ thống.</p>
              </div>
            </div>
            <label>Họ tên <span className="required-mark">*</span>
              <input required value={form.fullName ?? ''} onChange={(e) => update('fullName', e.target.value)} />
            </label>
            <label>Email
              <input type="email" value={form.email ?? ''} onChange={(e) => update('email', e.target.value)} />
            </label>
            <label>SĐT
              <input value={form.phone ?? ''} onChange={(e) => update('phone', e.target.value)} />
            </label>
            <label>Giới tính
              <select value={form.gender ?? ''} onChange={(e) => update('gender', e.target.value)}>
                <option value="">-- chọn --</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </label>
            <label>Ngày sinh
              <input type="date" value={form.dateOfBirth ?? ''} onChange={(e) => update('dateOfBirth', e.target.value)} />
            </label>
            <label>Địa chỉ
              <textarea value={form.address ?? ''} onChange={(e) => update('address', e.target.value)} />
            </label>
            <div className="form-actions">
              <button type="submit" disabled={updateMutation.isPending}>{updateMutation.isPending ? 'Đang lưu...' : 'Lưu thông tin'}</button>
            </div>
            {profileMessage && <p className="success-text">{profileMessage}</p>}
            {updateMutation.isError && <p className="alert error">{errorMessage(updateMutation.error, 'Không thể cập nhật thông tin cá nhân.')}</p>}
          </form>

          <form className="card form-grid password-form-card" onSubmit={submitPassword}>
            <div className="section-title-row">
              <div>
                <h3>Đổi mật khẩu</h3>
                <p>Mật khẩu mới cần có ít nhất 6 ký tự.</p>
              </div>
            </div>
            <label>Mật khẩu hiện tại <span className="required-mark">*</span>
              <input required type="password" autoComplete="current-password" value={passwordForm.currentPassword} onChange={(e) => updatePassword('currentPassword', e.target.value)} />
            </label>
            <label>Mật khẩu mới <span className="required-mark">*</span>
              <input required type="password" minLength={6} autoComplete="new-password" value={passwordForm.newPassword} onChange={(e) => updatePassword('newPassword', e.target.value)} />
            </label>
            <label>Nhập lại mật khẩu mới <span className="required-mark">*</span>
              <input required type="password" minLength={6} autoComplete="new-password" value={passwordForm.confirmPassword} onChange={(e) => updatePassword('confirmPassword', e.target.value)} />
            </label>
            <div className="form-actions">
              <button type="submit" disabled={passwordMutation.isPending}>{passwordMutation.isPending ? 'Đang đổi...' : 'Đổi mật khẩu'}</button>
            </div>
            {passwordMessage && <p className={passwordMessageIsError ? 'alert error' : 'success-text'}>{passwordMessage}</p>}
            {passwordMutation.isError && <p className="alert error">{errorMessage(passwordMutation.error, 'Không thể đổi mật khẩu.')}</p>}
          </form>
        </div>

        <div className="card profile-card profile-summary-card">
          <div className="profile-avatar-block">
            <div className="profile-avatar">{(user?.employeeName || user?.fullName || user?.username || 'U').slice(0, 1).toUpperCase()}</div>
            <div>
              <h3>{user?.employeeName || user?.fullName || user?.username}</h3>
              <p>{codeName(user?.employeeCode, user?.employeeName || user?.fullName, user?.employeeId)}</p>
            </div>
          </div>

          <div className="profile-info-list">
            <div><span>Username</span><strong>{user?.username || '--'}</strong></div>
            <div><span>Email</span><strong>{user?.email || '--'}</strong></div>
            <div><span>SĐT</span><strong>{user?.phone || '--'}</strong></div>
            <div><span>Giới tính</span><strong>{user?.gender || '--'}</strong></div>
            <div><span>Ngày sinh</span><strong>{user?.dateOfBirth || '--'}</strong></div>
            <div><span>Phòng ban</span><strong>{codeName(user?.departmentCode, user?.departmentName, user?.departmentId)}</strong></div>
            <div><span>Nhóm làm việc</span><strong>{teamText}</strong></div>
            <div><span>Vai trò</span><strong>{user?.roles.map(roleLabel).join(', ') || '--'}</strong></div>
            <div className="full-row"><span>Địa chỉ</span><strong>{user?.address || '--'}</strong></div>
          </div>
          <p className="hint">Phòng ban và nhóm làm việc được lấy từ dữ liệu nhân sự. Nhân viên chỉ được xem, không tự chỉnh các thông tin tổ chức này.</p>
        </div>
      </div>
    </section>
  );
}
