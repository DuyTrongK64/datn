import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';

export function LoginPage() {
  const [username, setUsername] = useState('NV001');
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
      await login(username.trim(), password);
      navigate('/dashboard');
    } catch (err) {
      setError('Đăng nhập thất bại. Kiểm tra lại mã nhân viên/mật khẩu hoặc CORS backend.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={submit}>
        <h1>TimeFlow</h1>
        <p>Đăng nhập hệ thống chấm công nội bộ</p>
        {error && <div className="alert error">{error}</div>}
        <label>Mã nhân viên</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Mật khẩu</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={submitting}>{submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>
        <div className="hint">
          Mock data v3: NV001/admin123, NV002/leader123, NV003/employee123
        </div>
      </form>
    </div>
  );
}
