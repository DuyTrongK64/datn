import { FormEvent, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { changeMyPassword, getMe, updateMyProfile } from '../api/authApi';
import { useAuth } from '../state/AuthContext';
import type { ChangePasswordRequest, UpdateProfileRequest } from '../types';
import { AppDatePicker } from '../components/AppDatePickers';
import { roleLabel } from '../utils/labels';
import './ProfilePage.css';

type ProfileForm = Required<Pick<UpdateProfileRequest, 'fullName' | 'email' | 'phone' | 'gender' | 'address'>> & {
  dateOfBirth: string;
};

const emptyPasswordForm: ChangePasswordRequest = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
};

function profileInitials(name?: string) {
  const parts = String(name || 'U').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return `${parts[0].slice(0, 1)}${parts[parts.length - 1].slice(0, 1)}`.toUpperCase();
}

export function ProfilePage() {
  const { user, setCurrentUser } = useAuth();
  const [profileForm, setProfileForm] = useState<ProfileForm>({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    address: ''
  });
  const [passwordForm, setPasswordForm] = useState<ChangePasswordRequest>(emptyPasswordForm);
  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    if (!user) return;

    setProfileForm({
      fullName: user.fullName || user.employeeName || '',
      email: user.email || '',
      phone: user.phone || '',
      gender: user.gender || '',
      dateOfBirth: user.dateOfBirth || '',
      address: user.address || ''
    });
  }, [user]);

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      const payload: UpdateProfileRequest = {
        fullName: profileForm.fullName.trim(),
        email: profileForm.email.trim(),
        phone: profileForm.phone.trim(),
        gender: profileForm.gender,
        dateOfBirth: profileForm.dateOfBirth || undefined,
        address: profileForm.address.trim()
      };
      return updateMyProfile(payload);
    },
    onSuccess: async (updated) => {
      setCurrentUser(updated);
      setProfileMessage('Cập nhật thông tin cá nhân thành công.');
      const fresh = await getMe();
      setCurrentUser(fresh);
    },
    onError: (error: any) => {
      setProfileMessage(error.response?.data?.message || error.message || 'Không thể cập nhật thông tin cá nhân.');
    }
  });

  const changePasswordMutation = useMutation({
    mutationFn: async () => changeMyPassword(passwordForm),
    onSuccess: () => {
      setPasswordForm(emptyPasswordForm);
      setPasswordMessage('Đổi mật khẩu thành công.');
    },
    onError: (error: any) => {
      setPasswordMessage(error.response?.data?.message || error.message || 'Không thể đổi mật khẩu.');
    }
  });

  function submitProfile(e: FormEvent) {
    e.preventDefault();
    setProfileMessage('');
    updateProfileMutation.mutate();
  }

  function submitPassword(e: FormEvent) {
    e.preventDefault();
    setPasswordMessage('');
    changePasswordMutation.mutate();
  }

  if (!user) {
    return (
      <section>
        <div className="card">
          <p>Đang tải thông tin người dùng...</p>
        </div>
      </section>
    );
  }

  const displayName = user.employeeName || user.fullName || user.username;

  return (
    <section className="profile-page">
      <div className="profile-hero card">
        <div className="profile-avatar-large">
          {profileInitials(displayName)}
        </div>

        <div>
          <span className="eyebrow">Hồ sơ cá nhân</span>
          <h2>{displayName}</h2>
          <p>
            {user.employeeCode ? `${user.employeeCode} · ` : ''}
            {user.departmentName || 'Chưa gắn phòng ban'}
            {user.teams && user.teams.length > 0 ? ` · ${user.teams.map((team) => team.name || team.code).join(', ')}` : ''}
          </p>
          <div className="profile-role-row">
            {user.roles.map((role) => (
              <span className="badge" key={role}>{roleLabel(role)}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-two profile-grid">
        <form className="card form-grid" onSubmit={submitProfile}>
          <h3>Thông tin cá nhân</h3>

          <label>
            Mã nhân viên
            <input disabled value={user.employeeCode || user.employeeId || ''} />
          </label>

          <label>
            Tài khoản đăng nhập
            <input disabled value={user.username || ''} />
          </label>

          <label>
            Họ tên <span className="required-mark">*</span>
            <input
              required
              value={profileForm.fullName}
              onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
            />
          </label>

          <label>
            Số điện thoại
            <input
              value={profileForm.phone}
              onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
            />
          </label>

          <label>
            Giới tính
            <select
              value={profileForm.gender}
              onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
            >
              <option value="">-- chọn --</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </label>

          <AppDatePicker
            label="Ngày sinh"
            value={profileForm.dateOfBirth}
            onChange={(value) => setProfileForm({ ...profileForm, dateOfBirth: value })}
          />

          <label>
            Địa chỉ
            <textarea
              value={profileForm.address}
              onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
            />
          </label>

          <button type="submit" disabled={updateProfileMutation.isPending}>
            {updateProfileMutation.isPending ? 'Đang lưu...' : 'Lưu thông tin'}
          </button>

          {profileMessage && (
            <p className={profileMessage.includes('thành công') ? 'success-text' : 'alert error'}>
              {profileMessage}
            </p>
          )}
        </form>

        <div className="profile-side-stack">
          <div className="card profile-summary-card">
            <h3>Thông tin công việc</h3>
            <div className="profile-info-list">
              <div>
                <span>Phòng ban</span>
                <strong>{user.departmentName || '--'}</strong>
              </div>
              <div>
                <span>Team</span>
                <strong>{user.teams && user.teams.length > 0 ? user.teams.map((team) => team.name || team.code).join(', ') : '--'}</strong>
              </div>
              <div>
                <span>Vai trò</span>
                <strong>{user.roles.map(roleLabel).join(', ')}</strong>
              </div>
            </div>
          </div>

          <form className="card form-grid" onSubmit={submitPassword}>
            <h3>Đổi mật khẩu</h3>

            <label>
              Mật khẩu hiện tại <span className="required-mark">*</span>
              <input
                required
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              />
            </label>

            <label>
              Mật khẩu mới <span className="required-mark">*</span>
              <input
                required
                type="password"
                minLength={6}
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              />
            </label>

            <label>
              Xác nhận mật khẩu mới <span className="required-mark">*</span>
              <input
                required
                type="password"
                minLength={6}
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              />
            </label>

            <button type="submit" disabled={changePasswordMutation.isPending}>
              {changePasswordMutation.isPending ? 'Đang đổi...' : 'Đổi mật khẩu'}
            </button>

            {passwordMessage && (
              <p className={passwordMessage.includes('thành công') ? 'success-text' : 'alert error'}>
                {passwordMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
