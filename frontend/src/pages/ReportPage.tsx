import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { http } from '../api/http';
import type { AttendanceSummary, Employee, Team, TeamMember } from '../types';
import { EmployeeSearchFilter, type EmployeeSearchValue, employeeMatchesKeyword, filterEmployeesBySearch } from '../components/EmployeeSearchFilter';

function monthString(d: Date) { return d.toISOString().slice(0, 7); }
function startOfMonth(month: string) { return `${month}-01`; }
function endOfMonth(month: string) {
  const [year, m] = month.split('-').map(Number);
  return new Date(year, m, 0).toISOString().slice(0, 10);
}
function minutesToHourText(minutes?: number) {
  const value = minutes ?? 0;
  const h = Math.floor(value / 60);
  const m = value % 60;
  return `${h}h${String(m).padStart(2, '0')}`;
}
function summaryMatchesEmployeeKeyword(row: AttendanceSummary, keyword: string) {
  return employeeMatchesKeyword({ employeeCode: row.employeeCode, fullName: row.employeeName, name: row.employeeName }, keyword);
}

export function ReportPage() {
  const [month, setMonth] = useState(monthString(new Date()));
  const [employeeFilter, setEmployeeFilter] = useState<EmployeeSearchValue>({ teamId: '', keyword: '', employeeId: '' });
  const from = startOfMonth(month);
  const to = endOfMonth(month);

  const { data: employees = [] } = useQuery({ queryKey: ['employees'], queryFn: async () => (await http.get<Employee[]>('/employees')).data });
  const { data: teams = [] } = useQuery({ queryKey: ['teams'], queryFn: async () => (await http.get<Team[]>('/teams')).data });
  const { data: teamMembers = [] } = useQuery({ queryKey: ['team-members'], queryFn: async () => (await http.get<TeamMember[]>('/team-members')).data });

  const filteredEmployees = useMemo(
    () => filterEmployeesBySearch(employees, teamMembers, employeeFilter.teamId, employeeFilter.keyword),
    [employeeFilter.keyword, employeeFilter.teamId, employees, teamMembers]
  );
  const filteredEmployeeIds = useMemo(() => new Set(filteredEmployees.map((employee) => String(employee.id))), [filteredEmployees]);

  const summaryUrl = useMemo(() => {
    const params = new URLSearchParams({ from, to });
    if (employeeFilter.employeeId) params.set('employeeId', employeeFilter.employeeId);
    else if (employeeFilter.teamId) params.set('teamId', employeeFilter.teamId);
    return `/attendances/summary?${params.toString()}`;
  }, [employeeFilter.employeeId, employeeFilter.teamId, from, to]);

  const { data: summaries = [], isLoading } = useQuery({
    queryKey: ['report-summary', summaryUrl],
    queryFn: async () => (await http.get<AttendanceSummary[]>(summaryUrl)).data
  });

  const filteredSummaries = useMemo(() => {
    let rows = summaries;
    if (!employeeFilter.employeeId && employeeFilter.teamId) rows = rows.filter((row) => filteredEmployeeIds.has(String(row.employeeId)));
    if (employeeFilter.keyword.trim()) rows = rows.filter((row) => summaryMatchesEmployeeKeyword(row, employeeFilter.keyword));
    return rows;
  }, [employeeFilter.employeeId, employeeFilter.keyword, employeeFilter.teamId, filteredEmployeeIds, summaries]);

  const totalWorking = filteredSummaries.reduce((sum, row) => sum + (row.totalWorkingMinutes || 0), 0);
  const totalLate = filteredSummaries.reduce((sum, row) => sum + (row.totalLateMinutes || 0), 0);
  const totalOt = filteredSummaries.reduce((sum, row) => sum + (row.totalOvertimeMinutes || 0), 0);
  const totalActualDays = filteredSummaries.reduce((sum, row) => sum + (row.actualWorkingDays || 0), 0);

  async function downloadXlsx() {
    const params = new URLSearchParams({ month });
    if (employeeFilter.employeeId) params.set('employeeId', employeeFilter.employeeId);
    else if (employeeFilter.teamId) params.set('teamId', employeeFilter.teamId);
    const res = await http.get(`/reports/monthly/export-xlsx?${params.toString()}`, { responseType: 'blob' });
    const url = URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `bang-cong-thang-${month}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="report-page">
      <div className="page-hero report-hero">
        <div>
          <span className="eyebrow">Báo cáo vận hành</span>
          <h2>Báo cáo bảng công theo tháng</h2>
          <p>Xuất file Excel theo từng nhân viên. Mỗi nhân viên là một sheet riêng với tên sheet theo tên và mã nhân viên.</p>
        </div>
        <button type="button" className="primary-action" onClick={downloadXlsx}>Xuất Excel tháng</button>
      </div>

      <div className="card report-filter-card">
        <div className="filters report-filters month-report-filter">
          <label>Tháng báo cáo<input type="month" value={month} onChange={(e) => setMonth(e.target.value)} /></label>
        </div>
        <EmployeeSearchFilter
          value={employeeFilter}
          onChange={setEmployeeFilter}
          employees={employees}
          teams={teams}
          teamMembers={teamMembers}
          className="embedded-employee-filter no-card-shell"
        />
      </div>

      <div className="stats-grid report-stats">
        <div className="stat-card polished-stat"><span>Nhân viên trong báo cáo</span><strong>{filteredSummaries.length}</strong></div>
        <div className="stat-card polished-stat"><span>Tổng ngày có công</span><strong>{totalActualDays}</strong></div>
        <div className="stat-card polished-stat"><span>Tổng giờ làm</span><strong>{minutesToHourText(totalWorking)}</strong></div>
        <div className="stat-card polished-stat"><span>Tổng OT</span><strong>{minutesToHourText(totalOt)}</strong></div>
        <div className="stat-card polished-stat"><span>Tổng đi muộn</span><strong>{minutesToHourText(totalLate)}</strong></div>
      </div>

      <div className="card table-wrap report-table-card">
        <h3>Dữ liệu tổng hợp tháng {month}</h3>
        {isLoading ? <p>Đang tải...</p> : (
          <table>
            <thead><tr><th>Nhân viên</th><th>Phòng ban</th><th>Team</th><th>Ngày công</th><th>Vắng</th><th>Đi muộn</th><th>Về sớm</th><th>Thiếu chấm công</th><th>Giờ làm</th><th>OT</th></tr></thead>
            <tbody>{filteredSummaries.map((row) => <tr key={row.employeeId}>
              <td><strong>{row.employeeCode}</strong><br />{row.employeeName}</td>
              <td>{row.departmentCode ? `${row.departmentCode} - ${row.departmentName ?? ''}` : row.departmentName}</td>
              <td>{row.teamCode ? `${row.teamCode} - ${row.teamName ?? ''}` : row.teamName}</td>
              <td>{row.actualWorkingDays}/{row.workingDays}</td>
              <td>{row.absentDays}</td>
              <td>{row.lateDays}</td>
              <td>{row.earlyLeaveDays}</td>
              <td>{row.missingCheckDays}</td>
              <td>{minutesToHourText(row.totalWorkingMinutes)}</td>
              <td>{minutesToHourText(row.totalOvertimeMinutes)}</td>
            </tr>)}</tbody>
          </table>
        )}
      </div>
    </section>
  );
}
