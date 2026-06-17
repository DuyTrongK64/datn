import { Link } from 'react-router-dom';
import { CommunityFeed } from '../components/CommunityFeed';
import { useAuth } from '../state/AuthContext';
import { roleLabel } from '../utils/labels';

export function CommunityPage() {
  const { user, hasRole } = useAuth();
  const isManager = hasRole('ADMIN') || hasRole('LEADER');

  return (
    <section className="community-home-page">
      <div className="social-home-hero">
        <div>
          <span className="eyebrow">Bảng tin nội bộ</span>
          <h2>Chào mừng {user?.employeeName || user?.fullName || user?.username}</h2>
          <p>
            Cập nhật thông tin trong ngày, chia sẻ kinh nghiệm làm việc, hỏi nhanh về chấm công và trao đổi với đồng nghiệp.
          </p>
        </div>
        <div className="social-hero-actions">
          <Link to="/device-simulator">Chấm công nhanh</Link>
          <Link className="secondary" to="/chat">Mở tin nhắn</Link>
          <button type="button" className="secondary hero-action-button" onClick={() => window.dispatchEvent(new Event('open-floating-chatbot'))}>Hỏi trợ lý</button>
        </div>
      </div>

      <div className="social-home-layout">
        <aside className="social-left-rail">
          <div className="card identity-card">
            <div className="avatar-circle large-avatar">{(user?.employeeName || user?.fullName || user?.username || '?').slice(0, 1).toUpperCase()}</div>
            <div>
              <strong>{user?.employeeCode ? `${user.employeeCode} - ${user.employeeName || user.fullName}` : user?.fullName || user?.username}</strong>
              <span>{user?.roles.map(roleLabel).join(', ')}</span>
              <small>{user?.departmentName || 'Chưa có phòng ban'}{user?.teams?.length ? ` · ${user.teams.map((team) => team.name).join(', ')}` : ''}</small>
            </div>
          </div>

          <div className="card quick-link-card">
            <h3>Lối tắt</h3>
            <Link to="/my-attendance">Bảng công của tôi</Link>
            <Link to="/requests/leave">Tạo đơn nghỉ phép</Link>
            <Link to="/requests/missing-check">Bổ sung chấm công</Link>
            {isManager && <Link to="/approvals">Phê duyệt đơn</Link>}
          </div>
        </aside>

        <main className="social-feed-column">
          <CommunityFeed />
        </main>

        <aside className="social-right-rail">
          <div className="card assistant-preview-card">
            <div className="assistant-icon">🤖</div>
            <h3>Trợ lý chấm công</h3>
            <p>Hỏi nhanh về quên chấm công, nghỉ phép, đi muộn, về sớm, OT hoặc quy trình duyệt đơn.</p>
            <button type="button" onClick={() => window.dispatchEvent(new Event('open-floating-chatbot'))}>Mở trợ lý</button>
          </div>

          <div className="card chat-preview-card">
            <h3>Trao đổi nội bộ</h3>
            <p>Chat trực tiếp với đồng nghiệp để xác nhận công việc, ca làm hoặc thông tin đơn từ.</p>
            <Link to="/chat">Vào tin nhắn</Link>
          </div>

          <div className="card policy-note-card">
            <h3>Gợi ý sử dụng</h3>
            <ul>
              <li>Check in khi bắt đầu làm việc.</li>
              <li>Tạo đơn nếu đi muộn, về sớm hoặc quên chấm công.</li>
              <li>Theo dõi bảng công thường xuyên để phát hiện sai lệch.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
