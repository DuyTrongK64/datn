import { useRef, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';
import { roleLabel } from '../utils/labels';
import { FloatingChatbot } from './FloatingChatbot';

type MenuItem = { to: string; label: string; show: boolean };
type MenuGroup = { label: string; items: MenuItem[] };

export function Layout() {
  const { user, logout, hasRole } = useAuth();
  const isAdmin = hasRole('ADMIN');
  const isLeader = hasRole('LEADER');
  const canViewTeamScope = isAdmin || isLeader;
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);

  function openMenu(label: string) {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenGroup(label);
  }

  function scheduleClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 260);
  }

  function closeNow() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenGroup(null);
  }

  const groups: MenuGroup[] = [
    {
      label: 'Trang chủ',
      items: [
        { to: '/dashboard', label: 'Dashboard cá nhân', show: true }
      ]
    },
    {
      label: 'Chấm công',
      items: [
        { to: '/device-simulator', label: 'Mô phỏng máy chấm công', show: true },
        { to: '/my-attendance', label: 'Bảng công của tôi', show: true },
        { to: '/attendances', label: isLeader && !isAdmin ? 'Bảng công team tôi' : 'Bảng công nhân viên', show: canViewTeamScope },
        { to: '/devices', label: 'Thiết bị chấm công', show: isAdmin }
      ]
    },
    {
      label: 'Đơn từ',
      items: [
        { to: '/requests', label: isLeader && !isAdmin ? 'Đơn từ team tôi' : 'Tổng hợp đơn từ', show: true },
        { to: '/requests/leave', label: 'Đơn nghỉ phép', show: true },
        { to: '/requests/late', label: 'Đơn đi muộn', show: true },
        { to: '/requests/early', label: 'Đơn về sớm', show: true },
        { to: '/requests/outside', label: 'Đơn ra ngoài', show: true },
        { to: '/requests/missing-check', label: 'Bổ sung chấm công', show: true },
        { to: '/requests/remote', label: 'Làm remote', show: true },
        { to: '/requests/overtime', label: 'Làm thêm giờ', show: true },
        { to: '/requests/shift-change', label: 'Đổi ca', show: true },
        { to: '/approvals', label: 'Phê duyệt đơn', show: isAdmin }
      ]
    },
    {
      label: 'Nhân sự',
      items: [
        { to: '/employees', label: isLeader && !isAdmin ? 'Nhân viên team tôi' : 'Danh sách nhân viên', show: canViewTeamScope },
        { to: '/teams', label: isLeader && !isAdmin ? 'Team tôi phụ trách' : 'Nhóm làm việc', show: canViewTeamScope },
        { to: '/departments', label: 'Phòng ban', show: isAdmin },
        { to: '/leave-balances', label: 'Quỹ phép nhân viên', show: canViewTeamScope }
      ]
    },
    {
      label: 'Cấu hình',
      items: [
        { to: '/shifts', label: 'Ca làm việc', show: isAdmin },
        { to: '/contract-types', label: 'Chính sách hợp đồng', show: isAdmin },
        { to: '/employee-contracts', label: 'Hợp đồng nhân viên', show: isAdmin },
        { to: '/holidays', label: 'Ngày nghỉ lễ', show: isAdmin }
      ]
    }
  ];

  return (
    <div className="app-shell horizontal-shell">
      <header className="main-header product-topbar">
        <div className="brand-block">
          <div className="brand">TimeFlow</div>
          <span>Dashboard chấm công & nhân sự</span>
        </div>

        <nav className="top-menu" aria-label="Menu chính">
          {groups.map((group) => {
            const visibleItems = group.items.filter((item) => item.show);
            if (visibleItems.length === 0) return null;
            const isOpen = openGroup === group.label;

            return (
              <div
                className={`menu-group ${isOpen ? 'open' : ''}`}
                key={group.label}
                onMouseEnter={() => openMenu(group.label)}
                onMouseLeave={scheduleClose}
              >
                <button type="button" className="menu-trigger" onFocus={() => openMenu(group.label)}>
                  {group.label}
                </button>
                <div className="menu-bridge" />
                <div className="menu-dropdown" onMouseEnter={() => openMenu(group.label)}>
                  {visibleItems.map((item) => (
                    <NavLink key={item.to} to={item.to} onClick={closeNow} className={({ isActive }) => (isActive ? 'active' : '')}>
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="user-inline">
          <div>
            <strong>{user?.employeeCode ? `${user.employeeCode} - ${user.employeeName || user.fullName}` : user?.fullName || user?.username}</strong>
            <span>{user?.roles.map(roleLabel).join(', ')}</span>
          </div>
          <button className="secondary logout-button" onClick={logout}>Đăng xuất</button>
        </div>
      </header>

      <main className="main app-main-content">
        <Outlet />
      </main>

      <FloatingChatbot />
    </div>
  );
}
