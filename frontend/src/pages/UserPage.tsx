import { FormEvent, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { http } from '../api/http';
import type { BaseEntity, Employee, Team, TeamMember } from '../types';
import { EmployeeSearchFilter, type EmployeeSearchValue, filterEmployeesBySearch } from '../components/EmployeeSearchFilter';
import { codeName } from '../utils/format';
import { roleLabel, viLabel } from '../utils/labels';

const roleOptions = ['ADMIN', 'HR', 'LEADER', 'EMPLOYEE'];

export function UserPage() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ username: '', password: '123456', email: '', fullName: '', employeeId: '', roles: ['EMPLOYEE'] });
  const [employeeFilter, setEmployeeFilter] = useState<EmployeeSearchValue>({ teamId: '', keyword: '', employeeId: '' });
  const { data: users = [] } = useQuery({ queryKey: ['users'], queryFn: async () => (await http.get<BaseEntity[]>('/users')).data });
  const { data: employees = [] } = useQuery({ queryKey: ['employees'], queryFn: async () => (await http.get<Employee[]>('/employees')).data });
  const { data: teams = [] } = useQuery({ queryKey: ['teams'], queryFn: async () => (await http.get<Team[]>('/teams')).data });
  const { data: teamMembers = [] } = useQuery({ queryKey: ['team-members'], queryFn: async () => (await http.get<TeamMember[]>('/team-members')).data });

  const filteredEmployees = useMemo(
    () => filterEmployeesBySearch(employees, teamMembers, employeeFilter.teamId, employeeFilter.keyword),
    [employeeFilter.keyword, employeeFilter.teamId, employees, teamMembers]
  );

  const filteredEmployeeIds = useMemo(() => new Set(filteredEmployees.map((employee) => String(employee.id))), [filteredEmployees]);

  const visibleUsers = useMemo(() => {
    const hasEmployeeFilter = Boolean(employeeFilter.teamId || employeeFilter.keyword.trim() || employeeFilter.employeeId);
    if (!hasEmployeeFilter) return users;
    return users.filter((user) => {
      const userEmployeeId = String(user.employeeId ?? '');
      if (!userEmployeeId) return false;
      if (employeeFilter.employeeId) return userEmployeeId === String(employeeFilter.employeeId);
      return filteredEmployeeIds.has(userEmployeeId);
    });
  }, [employeeFilter.employeeId, employeeFilter.keyword, employeeFilter.teamId, filteredEmployeeIds, users]);

  const createMutation = useMutation({
    mutationFn: async () => (await http.post('/users', { ...form, employeeId: form.employeeId || null })).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setForm({ username: '', password: '123456', email: '', fullName: '', employeeId: '', roles: ['EMPLOYEE'] });
    }
  });

  function submit(e: FormEvent) {
    e.preventDefault();
    createMutation.mutate();
  }

  function toggleRole(role: string) {
    setForm((prev) => ({
      ...prev,
      roles: prev.roles.includes(role) ? prev.roles.filter((r) => r !== role) : [...prev.roles, role]
    }));
  }

  return (
    <section>
      <h2>Danh sách tài khoản</h2>
      <EmployeeSearchFilter
        value={employeeFilter}
        onChange={setEmployeeFilter}
        employees={employees}
        teams={teams}
        teamMembers={teamMembers}
      />
      <div className="grid-two">
        <form className="card form-grid" onSubmit={submit}>
          <h3>Tạo tài khoản</h3>
          <label>Username<span className="required-mark"> *</span><input required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></label>
          <label>Password<span className="required-mark"> *</span><input required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
          <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label>Họ tên<span className="required-mark"> *</span><input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} /></label>
          <label>Nhân viên<select value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })}>
            <option value="">-- không gán --</option>
            {filteredEmployees.map((employee) => <option key={String(employee.id)} value={String(employee.id)}>{codeName(String(employee.employeeCode ?? ''), String(employee.fullName ?? ''))}</option>)}
          </select></label>
          <div className="role-box">
            <strong>Vai trò</strong>
            {roleOptions.map((role) => <label className="checkbox" key={role}><input type="checkbox" checked={form.roles.includes(role)} onChange={() => toggleRole(role)} /> {roleLabel(role)}</label>)}
          </div>
          <button>Tạo tài khoản</button>
        </form>
        <div className="card table-wrap">
          <h3>Danh sách tài khoản</h3>
          <table>
            <thead><tr><th>Username</th><th>Họ tên</th><th>Email</th><th>Nhân viên</th><th>Trạng thái</th><th>Vai trò</th></tr></thead>
            <tbody>{visibleUsers.map((u) => <tr key={u.id as string}>
              <td>{String(u.username ?? '')}</td><td>{String(u.fullName ?? '')}</td><td>{String(u.email ?? '')}</td>
              <td>{codeName(String(u.employeeCode ?? ''), String(u.employeeName ?? ''), String(u.employeeId ?? ''))}</td><td>{viLabel(u.status)}</td><td>{Array.isArray(u.roles) ? u.roles.map((role) => roleLabel(String(role))).join(', ') : ''}</td>
            </tr>)}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
