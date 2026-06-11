import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';

export function LoginPage() {
  const [username, setUsername] = useState('ADM001');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Đăng nhập thất bại. Kiểm tra lại mã nhân viên/mật khẩu.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={submit}>
        <h1>Attendance Management</h1>
        <p>Đăng nhập hệ thống chấm công</p>
        {error && <div className="alert error">{error}</div>}
        <label>Mã nhân viên</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Mật khẩu</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={submitting}>{submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>
        <div className="hint">
          Demo: ADM001/admin123, HR001/hr123, LEA001/leader123, EMP001/employee123
        </div>
      </form>
    </div>
  );
}
