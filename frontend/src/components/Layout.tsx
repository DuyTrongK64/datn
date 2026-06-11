import { useRef, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';
import { roleLabel } from '../utils/labels';

type MenuItem = { to: string; label: string; show: boolean };
type MenuGroup = { label: string; items: MenuItem[]; show?: boolean };

export function Layout() {
  const { user, logout, hasRole } = useAuth();
  const adminOrHr = hasRole('ADMIN', 'HR');
  const leader = hasRole('LEADER');
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
    { label: 'Tổng quan', items: [{ to: '/dashboard', label: 'Tổng quan vận hành', show: true }] },
    {
      label: 'Nhân sự',
      items: [
        { to: '/profile', label: 'Hồ sơ của tôi', show: true },
        { to: '/employees', label: 'Danh sách nhân viên', show: adminOrHr || leader }
      ]
    },
    {
      label: 'Cơ cấu',
      items: [
        { to: '/departments', label: 'Phòng ban', show: adminOrHr },
        { to: '/teams', label: 'Nhóm làm việc', show: adminOrHr || leader }
      ]
    },
    {
      label: 'Lịch & chính sách',
      items: [
        { to: '/shifts', label: 'Lịch làm việc', show: adminOrHr },
        { to: '/contract-types', label: 'Chính sách hợp đồng', show: adminOrHr },
        { to: '/employee-contracts', label: 'Hợp đồng nhân viên', show: adminOrHr },
        { to: '/holidays', label: 'Lịch nghỉ lễ', show: hasRole('ADMIN') },
        { to: '/schedules', label: 'Lịch cá nhân đặc biệt', show: adminOrHr }
      ]
    },
    {
      label: 'Chấm công',
      items: [
        { to: '/device-simulator', label: 'Chấm công nhanh', show: hasRole('ADMIN') || hasRole('EMPLOYEE') || leader || hasRole('HR') },
        { to: '/devices', label: 'Thiết bị chấm công', show: hasRole('ADMIN') },
        { to: '/attendances', label: 'Quản lý bảng công', show: adminOrHr || leader },
        { to: '/my-attendance', label: 'Bảng công của tôi', show: true }
      ]
    },
    {
      label: 'Đơn từ',
      items: [
        { to: '/requests', label: 'Tổng quan đơn từ', show: true },
        { to: '/requests/leave', label: 'Đơn xin nghỉ phép', show: true },
        { to: '/requests/late', label: 'Đơn đi muộn', show: true },
        { to: '/requests/early', label: 'Đơn về sớm', show: true },
        { to: '/requests/outside', label: 'Đơn ra ngoài', show: true },
        { to: '/requests/missing-check', label: 'Đơn bổ sung chấm công', show: true },
        { to: '/requests/remote', label: 'Đơn làm remote', show: true },
        { to: '/requests/overtime', label: 'Đơn làm thêm giờ', show: true },
        { to: '/requests/shift-change', label: 'Đơn đổi ca', show: true },
        { to: '/approvals', label: 'Xử lý phê duyệt', show: hasRole('ADMIN') || leader }
      ]
    },
    {
      label: 'Báo cáo',
      items: [
        { to: '/leave-balances', label: 'Quỹ phép nhân viên', show: adminOrHr || leader },
        { to: '/reports', label: 'Báo cáo bảng công', show: adminOrHr || leader }
      ]
    }
  ];

  return (
    <div className="app-shell horizontal-shell">
      <header className="main-header">
        <div className="brand-block">
          <div className="brand">TimeFlow</div>
          <span>Quản lý chấm công nội bộ</span>
        </div>
        <nav className="top-menu">
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
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
