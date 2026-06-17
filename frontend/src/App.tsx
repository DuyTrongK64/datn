import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { EntityPage } from './pages/EntityPage';
import { DevicePage } from './pages/DevicePage';
import { DeviceSimulatorPage } from './pages/DeviceSimulatorPage';
import { AttendancePage } from './pages/AttendancePage';
import { RequestPage } from './pages/RequestPage';
import { CommunityPage } from './pages/CommunityPage';
import { ChatPage } from './pages/ChatPage';
import { entityPages } from './entityPages';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/community" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="devices" element={<DevicePage />} />
        <Route path="device-simulator" element={<DeviceSimulatorPage />} />
        <Route path="attendances" element={<AttendancePage />} />
        <Route path="my-attendance" element={<AttendancePage onlyMe />} />
        <Route path="requests" element={<RequestPage />} />
        <Route path="requests/leave" element={<RequestPage initialType="LEAVE_REQUEST" />} />
        <Route path="requests/late" element={<RequestPage initialType="LATE_ARRIVAL" />} />
        <Route path="requests/early" element={<RequestPage initialType="EARLY_LEAVE_REQUEST" />} />
        <Route path="requests/outside" element={<RequestPage initialType="OUTSIDE_REQUEST" />} />
        <Route path="requests/missing-check" element={<RequestPage initialType="MISSING_CHECK_IN" />} />
        <Route path="requests/remote" element={<RequestPage initialType="REMOTE_WORK" />} />
        <Route path="requests/overtime" element={<RequestPage initialType="OVERTIME" />} />
        <Route path="requests/shift-change" element={<RequestPage initialType="SHIFT_CHANGE" />} />
        <Route path="approvals" element={<RequestPage approvalMode />} />
        {entityPages.map((page) => (
          <Route key={page.path} path={page.path} element={<EntityPage config={page} />} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/community" replace />} />
    </Routes>
  );
}
