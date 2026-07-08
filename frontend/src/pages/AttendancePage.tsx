import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { http } from '../api/http';
import { useAuth } from '../state/AuthContext';
import type { Attendance, AttendanceSummary, Employee, Team, TeamMember, SystemTimeSetting } from '../types';
import { AppDatePicker, AppMonthPicker } from '../components/AppDatePickers';
import { codeName, employeeLabel, formatDateTime } from '../utils/format';
import { viLabel } from '../utils/labels';
import { formatLeaveDayHours } from '../utils/leaveFormat';

function dateString(d: Date) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function monthString(d: Date) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

function dateFromText(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function addDays(d: Date, days: number) {
  const next = new Date(d);
  next.setDate(next.getDate() + days);
  return next;
}

function startOfWeek(d: Date) {
  const next = new Date(d);
  const day = next.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  next.setDate(next.getDate() + diff);
  return next;
}

function startOfMonth(month: string) {
  return `${month}-01`;
}

function endOfMonth(month: string) {
  const [year, monthNumber] = month.split('-').map(Number);
  return dateString(new Date(year, monthNumber, 0));
}

function isSameDateRange(from: string, to: string) {
  return from === to;
}

function minutesToHourText(minutes?: number) {
  const value = minutes ?? 0;
  const h = Math.floor(value / 60);
  const m = value % 60;
  return `${h}h${String(m).padStart(2, '0')}`;
}

function shortTime(value?: string) {
  if (!value) return '';
  return value.replace('T', ' ').slice(11, 16);
}

function dayNumber(value: string) {
  return Number(value.slice(8, 10));
}

function matchesEmployeeKeyword(
  row: {
    employeeCode?: string;
    employeeName?: string;
    fullName?: string;
    email?: string;
    phone?: string;
  },
  keyword: string
) {
  const normalized = keyword.trim().toLowerCase();

  if (!normalized) return true;

  return [row.employeeCode, row.employeeName, row.fullName, row.email, row.phone]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .includes(normalized);
}

export function AttendancePage({ onlyMe = false }: { onlyMe?: boolean }) {
  const queryClient = useQueryClient();
  const { user, hasRole } = useAuth();
  const isAdmin = hasRole('ADMIN');
  const leader = hasRole('LEADER');

  const browserToday = dateString(new Date());
  const browserMonth = monthString(new Date());

  const [from, setFrom] = useState(browserToday);
  const [to, setTo] = useState(browserToday);
  const [month, setMonth] = useState(browserMonth);
  const [employeeId, setEmployeeId] = useState('');
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [teamId, setTeamId] = useState('');
  const [detailEmployee, setDetailEmployee] = useState<AttendanceSummary | null>(null);
  const [detailMonth, setDetailMonth] = useState(browserMonth);

  const { data: employees = [] } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => (await http.get<Employee[]>('/employees')).data,
    enabled: !onlyMe && (isAdmin || leader)
  });

  const { data: teams = [] } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => (await http.get<Team[]>('/teams')).data,
    enabled: !onlyMe && (isAdmin || leader)
  });

  const { data: teamMembers = [] } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => (await http.get<TeamMember[]>('/team-members')).data,
    enabled: !onlyMe && (isAdmin || leader)
  });

  const { data: timeSetting } = useQuery({
    queryKey: ['system-time'],
    queryFn: async () => (await http.get<SystemTimeSetting>('/system-time')).data
  });

  const today = timeSetting?.effectiveDate || timeSetting?.effectiveNow?.slice(0, 10) || browserToday;
  const currentMonth = today.slice(0, 7);

  useEffect(() => {
    if (!timeSetting?.effectiveDate && !timeSetting?.effectiveNow) return;

    if (from === browserToday && to === browserToday) {
      setFrom(today);
      setTo(today);
    }

    if (month === browserMonth) {
      setMonth(currentMonth);
    }

    if (detailMonth === browserMonth) {
      setDetailMonth(currentMonth);
    }
  }, [
    browserMonth,
    browserToday,
    currentMonth,
    detailMonth,
    from,
    month,
    timeSetting?.effectiveDate,
    timeSetting?.effectiveNow,
    to,
    today
  ]);

  const leaderTeamIds = useMemo(() => {
    if (!leader) return [];
    return teams.map((team) => String(team.id));
  }, [leader, teams]);

  const visibleTeams = useMemo(() => {
    if (isAdmin) return teams;
    if (leader) return teams;
    return [];
  }, [isAdmin, leader, teams]);

  useEffect(() => {
    if (!onlyMe && leader && !isAdmin && !teamId && visibleTeams.length > 0) {
      setTeamId(String(visibleTeams[0].id));
    }
  }, [isAdmin, leader, onlyMe, teamId, visibleTeams]);

  const visibleEmployees = useMemo(() => {
    if (onlyMe) return [];

    let ids: string[] | null = null;

    if (teamId) {
      ids = teamMembers
        .filter((member) => String(member.teamId) === teamId)
        .map((member) => String(member.employeeId));
    } else if (leader && leaderTeamIds.length > 0 && !isAdmin) {
      ids = teamMembers
        .filter((member) => leaderTeamIds.includes(String(member.teamId)))
        .map((member) => String(member.employeeId));
    }

    if (!ids) return employees;

    const idSet = new Set(ids);
    return employees.filter((employee) => idSet.has(String(employee.id)));
  }, [isAdmin, employees, leader, leaderTeamIds, onlyMe, teamId, teamMembers]);

  const visibleEmployeesForSelect = useMemo(() => {
    return visibleEmployees.filter((employee) =>
      matchesEmployeeKeyword(
        {
          employeeCode: employee.employeeCode,
          fullName: employee.fullName,
          email: employee.email,
          phone: employee.phone
        },
        employeeSearch
      )
    );
  }, [employeeSearch, visibleEmployees]);

  const personalEndpoint = useMemo(() => {
    if (!onlyMe || !user?.employeeId) return '';
    return `/attendances/employee/${user.employeeId}/calendar?from=${startOfMonth(month)}&to=${endOfMonth(month)}`;
  }, [month, onlyMe, user?.employeeId]);

  const listEndpoint = useMemo(() => {
    if (onlyMe || !isSameDateRange(from, to)) return '';

    const params = new URLSearchParams({ from, to });

    if (employeeId) params.set('employeeId', employeeId);
    else if (teamId) params.set('teamId', teamId);

    return `/attendances?${params.toString()}`;
  }, [employeeId, from, onlyMe, teamId, to]);

  const summaryEndpoint = useMemo(() => {
    if (onlyMe || isSameDateRange(from, to)) return '';

    const params = new URLSearchParams({ from, to });

    if (employeeId) params.set('employeeId', employeeId);
    else if (teamId) params.set('teamId', teamId);

    return `/attendances/summary?${params.toString()}`;
  }, [employeeId, from, onlyMe, teamId, to]);

  const detailEndpoint = useMemo(() => {
    if (!detailEmployee?.employeeId) return '';
    return `/attendances/employee/${detailEmployee.employeeId}/calendar?from=${startOfMonth(detailMonth)}&to=${endOfMonth(detailMonth)}`;
  }, [detailEmployee?.employeeId, detailMonth]);

  const personalSummaryEndpoint = useMemo(() => {
    if (!onlyMe || !user?.employeeId) return '';

    const params = new URLSearchParams({
      from: startOfMonth(month),
      to: endOfMonth(month)
    });

    return `/attendances/employee/${user.employeeId}/summary?${params.toString()}`;
  }, [month, onlyMe, user?.employeeId]);

  const detailSummaryEndpoint = useMemo(() => {
    if (!detailEmployee?.employeeId) return '';

    const params = new URLSearchParams({
      from: startOfMonth(detailMonth),
      to: endOfMonth(detailMonth)
    });

    return `/attendances/employee/${detailEmployee.employeeId}/summary?${params.toString()}`;
  }, [detailEmployee?.employeeId, detailMonth]);

  const { data: personalRows = [], isLoading: personalLoading } = useQuery({
    queryKey: ['attendances', personalEndpoint],
    queryFn: async () => (await http.get<Attendance[]>(personalEndpoint)).data,
    enabled: Boolean(personalEndpoint)
  });

  const { data: dailyRows = [], isLoading: dailyLoading } = useQuery({
    queryKey: ['attendances', listEndpoint],
    queryFn: async () => (await http.get<Attendance[]>(listEndpoint)).data,
    enabled: Boolean(listEndpoint)
  });

  const { data: summaryRows = [], isLoading: summaryLoading } = useQuery({
    queryKey: ['attendance-summary', summaryEndpoint],
    queryFn: async () => (await http.get<AttendanceSummary[]>(summaryEndpoint)).data,
    enabled: Boolean(summaryEndpoint)
  });

  const { data: detailRows = [], isLoading: detailLoading } = useQuery({
    queryKey: ['attendance-detail-calendar', detailEndpoint],
    queryFn: async () => (await http.get<Attendance[]>(detailEndpoint)).data,
    enabled: Boolean(detailEndpoint)
  });

  const { data: personalSummaryRows = [] } = useQuery({
    queryKey: ['attendance-month-summary', personalSummaryEndpoint],
    queryFn: async () => (await http.get<AttendanceSummary[]>(personalSummaryEndpoint)).data,
    enabled: Boolean(personalSummaryEndpoint)
  });

  const { data: detailSummaryRows = [] } = useQuery({
    queryKey: ['attendance-detail-month-summary', detailSummaryEndpoint],
    queryFn: async () => (await http.get<AttendanceSummary[]>(detailSummaryEndpoint)).data,
    enabled: Boolean(detailSummaryEndpoint)
  });

  const filteredDailyRows = useMemo(
    () => dailyRows.filter((row) => matchesEmployeeKeyword(row, employeeSearch)),
    [dailyRows, employeeSearch]
  );

  const filteredSummaryRows = useMemo(
    () => summaryRows.filter((row) => matchesEmployeeKeyword(row, employeeSearch)),
    [summaryRows, employeeSearch]
  );

  const recalcMutation = useMutation({
    mutationFn: async () => (
      await http.post('/attendances/recalculate-range', {
        from,
        to,
        employeeId: employeeId || null,
        teamId: employeeId ? null : teamId || null
      })
    ).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendances'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-summary'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-detail-calendar'] });
    }
  });

  function openEmployeeMonth(row: AttendanceSummary) {
    setDetailEmployee(row);
    setDetailMonth(from.slice(0, 7));
  }

  function setSingleDate(date: string) {
    setFrom(date);
    setTo(date);
  }

  function setRange(nextFrom: string, nextTo: string) {
    setFrom(nextFrom);
    setTo(nextTo);
  }

  function enableRangeMode() {
    if (from === to) {
      setTo(endOfMonth(from.slice(0, 7)));
    }
  }

  if (onlyMe) {
    return (
      <section>
        <h2>Bảng công của tôi</h2>

        <div className="card filters month-toolbar">
          <AppMonthPicker
            label="Tháng hiện tại / tháng cần xem"
            value={month}
            onChange={setMonth}
          />

          <MonthSummaryPanel summary={personalSummaryRows[0]} />

          <div className="legend-inline">
            <span><i className="legend-box workday" /> Ngày làm</span>
            <span><i className="legend-box weekend" /> Thứ 7 / Chủ nhật</span>
            <span><i className="legend-box holiday" /> Nghỉ lễ</span>
          </div>
        </div>

        <MonthlyCalendar
          rows={personalRows}
          month={month}
          loading={personalLoading}
          todayValue={today}
        />
      </section>
    );
  }

  const rangeMode = !isSameDateRange(from, to);

  return (
    <section>
      <h2>Quản lý bảng công</h2>

      <div className="card attendance-filter-card">
        <div className="date-shortcuts">
          <button
            type="button"
            className="secondary"
            onClick={() => setSingleDate(today)}
          >
            Hôm nay
          </button>

          <button
            type="button"
            className="secondary"
            onClick={() => setSingleDate(dateString(addDays(dateFromText(today), -1)))}
          >
            Hôm qua
          </button>

          <button
            type="button"
            className="secondary"
            onClick={() => setRange(dateString(startOfWeek(dateFromText(today))), today)}
          >
            Tuần này
          </button>

          <button
            type="button"
            className="secondary"
            onClick={() => setRange(startOfMonth(currentMonth), today)}
          >
            Tháng này
          </button>
        </div>

        <div className="filters">
          <div className="segmented-control">
            <button
              type="button"
              className={!rangeMode ? 'active' : ''}
              onClick={() => setTo(from)}
            >
              Xem 1 ngày
            </button>

            <button
              type="button"
              className={rangeMode ? 'active' : ''}
              onClick={enableRangeMode}
            >
              Xem khoảng ngày
            </button>
          </div>

          {!rangeMode ? (
            <AppDatePicker
              label="Ngày cần xem"
              value={from}
              onChange={setSingleDate}
            />
          ) : (
            <>
              <AppDatePicker
                label="Từ ngày"
                value={from}
                onChange={setFrom}
              />

              <AppDatePicker
                label="Đến ngày"
                value={to}
                onChange={setTo}
              />
            </>
          )}

          {isAdmin && (
            <label>
              Team
              <select
                value={teamId}
                onChange={(e) => {
                  setTeamId(e.target.value);
                  setEmployeeId('');
                }}
              >
                <option value="">Tất cả team</option>
                {visibleTeams.map((team) => (
                  <option key={String(team.id)} value={String(team.id)}>
                    {codeName(String(team.code ?? ''), String(team.name ?? ''))}
                  </option>
                ))}
              </select>
            </label>
          )}

          {(isAdmin || leader) && (
            <label>
              Tìm nhân viên
              <input
                value={employeeSearch}
                onChange={(e) => setEmployeeSearch(e.target.value)}
                placeholder="Nhập mã hoặc tên"
              />
            </label>
          )}

          {(isAdmin || leader) && (
            <label>
              Nhân viên
              <select
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              >
                <option value="">
                  {leader && !isAdmin ? 'Tất cả nhân viên trong team' : 'Tất cả nhân viên'}
                </option>

                {visibleEmployeesForSelect.map((employee) => (
                  <option key={String(employee.id)} value={String(employee.id)}>
                    {codeName(String(employee.employeeCode ?? ''), String(employee.fullName ?? ''))}
                  </option>
                ))}
              </select>
            </label>
          )}

          {isAdmin && (
            <button
              type="button"
              onClick={() => recalcMutation.mutate()}
              disabled={recalcMutation.isPending}
            >
              {recalcMutation.isPending ? 'Đang tính...' : 'Tính công thủ công'}
            </button>
          )}
        </div>
      </div>

      {rangeMode ? (
        <SummaryTable
          rows={filteredSummaryRows}
          loading={summaryLoading}
          onOpen={openEmployeeMonth}
        />
      ) : (
        <DailyTable
          rows={filteredDailyRows}
          loading={dailyLoading}
        />
      )}

      {detailEmployee && (
        <div className="modal-backdrop" onClick={() => setDetailEmployee(null)}>
          <div className="modal-card wide-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title-row">
              <div>
                <h3>{employeeLabel(detailEmployee)}</h3>
                <p>Bảng công theo tháng của nhân viên</p>
              </div>

              <button className="secondary" onClick={() => setDetailEmployee(null)}>
                Đóng
              </button>
            </div>

            <div className="filters compact-filter month-toolbar">
              <AppMonthPicker
                label="Tháng"
                value={detailMonth}
                onChange={setDetailMonth}
              />

              <MonthSummaryPanel summary={detailSummaryRows[0]} />
            </div>

            <MonthlyCalendar
              rows={detailRows}
              month={detailMonth}
              loading={detailLoading}
              compact
              todayValue={today}
            />
          </div>
        </div>
      )}
    </section>
  );
}

function DailyTable({ rows, loading }: { rows: Attendance[]; loading: boolean }) {
  return (
    <div className="card table-wrap">
      <h3>Bảng công ngày đang chọn</h3>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nhân viên</th>
              <th>Team</th>
              <th>Loại ngày</th>
              <th>Lịch/Ca</th>
              <th>Giờ chuẩn</th>
              <th>Check-in</th>
              <th>Break out</th>
              <th>Break in</th>
              <th>Check-out</th>
              <th>Phút làm</th>
              <th>Nghỉ</th>
              <th>Muộn</th>
              <th>Về sớm</th>
              <th>OT</th>
              <th>Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id ?? `${row.employeeId}-${row.workDate}`}
                className={row.holiday ? 'holiday-row' : row.weekend ? 'weekend-row' : ''}
              >
                <td>{employeeLabel(row)}</td>
                <td>{codeName(row.teamCode, row.teamName)}</td>
                <td>{dayTypeLabel(row)}</td>
                <td>{codeName(row.shiftCode, row.shiftName)}</td>
                <td>{formatDateTime(row.plannedStartTime)} - {formatDateTime(row.plannedEndTime)}</td>
                <td>{formatDateTime(row.firstCheckIn)}</td>
                <td>{formatDateTime(row.lastBreakOut)}</td>
                <td>{formatDateTime(row.firstBreakIn)}</td>
                <td>{formatDateTime(row.lastCheckOut)}</td>
                <td>{row.totalWorkingMinutes}</td>
                <td>{row.breakMinutes ?? 0}</td>
                <td>{row.weekend || row.holiday ? '-' : row.lateMinutes}</td>
                <td>{row.weekend || row.holiday ? '-' : row.earlyLeaveMinutes}</td>
                <td>{row.overtimeMinutes}</td>
                <td>
                  {row.weekend || row.holiday ? (
                    <span className="muted-text">-</span>
                  ) : (
                    <span className="badge">{viLabel(row.status)}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function MonthSummaryPanel({ summary }: { summary?: AttendanceSummary }) {
  return (
    <div className="month-summary-panel">
      <span>Ngày có công: <strong>{summary?.actualWorkingDays ?? 0}</strong></span>
      <span>Vắng: <strong>{summary?.absentDays ?? 0}</strong></span>
      <span>Đi muộn: <strong>{summary?.lateDays ?? 0}</strong></span>
      <span>Giờ làm: <strong>{minutesToHourText(summary?.totalWorkingMinutes)}</strong></span>
      <span>OT: <strong>{minutesToHourText(summary?.totalOvertimeMinutes)}</strong></span>
      <span>Phép đã dùng: <strong>{formatLeaveDayHours(summary?.leaveUsedDays)}</strong></span>
      <span>Phép còn lại: <strong>{formatLeaveDayHours(summary?.leaveRemainingDays)}</strong></span>
    </div>
  );
}

function SummaryTable({
  rows,
  loading,
  onOpen
}: {
  rows: AttendanceSummary[];
  loading: boolean;
  onOpen: (row: AttendanceSummary) => void;
}) {
  return (
    <div className="card table-wrap">
      <h3>Tổng hợp theo nhân viên</h3>
      <p className="hint">Click vào một nhân viên để xem bảng công theo tháng.</p>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nhân viên</th>
              <th>Team</th>
              <th>Ngày chuẩn</th>
              <th>Ngày nghỉ</th>
              <th>Ngày có công</th>
              <th>Vắng</th>
              <th>Đi muộn</th>
              <th>Về sớm</th>
              <th>Thiếu check</th>
              <th>Tổng giờ làm</th>
              <th>Tổng OT</th>
              <th>Tổng muộn</th>
              <th>Tổng về sớm</th>
              <th>Phép đã dùng</th>
              <th>Phép còn</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.employeeId}
                className="clickable-row"
                onClick={() => onOpen(row)}
              >
                <td>{employeeLabel(row)}</td>
                <td>{codeName(row.teamCode, row.teamName)}</td>
                <td>{row.workingDays}</td>
                <td>{row.dayOffCount}</td>
                <td>{row.actualWorkingDays}</td>
                <td>{row.absentDays}</td>
                <td>{row.lateDays}</td>
                <td>{row.earlyLeaveDays}</td>
                <td>{row.missingCheckDays}</td>
                <td>{minutesToHourText(row.totalWorkingMinutes)}</td>
                <td>{minutesToHourText(row.totalOvertimeMinutes)}</td>
                <td>{row.totalLateMinutes} phút</td>
                <td>{row.totalEarlyLeaveMinutes} phút</td>
                <td>{formatLeaveDayHours(row.leaveUsedDays)}</td>
                <td>{formatLeaveDayHours(row.leaveRemainingDays)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function MonthlyCalendar({
  rows,
  month,
  loading,
  compact = false,
  todayValue
}: {
  rows: Attendance[];
  month: string;
  loading: boolean;
  compact?: boolean;
  todayValue?: string;
}) {
  const rowMap = useMemo(
    () => new Map(rows.map((row) => [row.workDate, row])),
    [rows]
  );

  const highlightToday = todayValue || dateString(new Date());

  const days = useMemo(() => {
    const [year, monthNumber] = month.split('-').map(Number);
    const lastDay = new Date(year, monthNumber, 0).getDate();
    const firstDay = new Date(year, monthNumber - 1, 1).getDay();
    const leadingBlank = firstDay === 0 ? 6 : firstDay - 1;
    const cells: Array<{ date?: string; row?: Attendance }> = [];

    for (let i = 0; i < leadingBlank; i++) {
      cells.push({});
    }

    for (let day = 1; day <= lastDay; day++) {
      const date = `${month}-${String(day).padStart(2, '0')}`;
      cells.push({
        date,
        row: rowMap.get(date)
      });
    }

    return cells;
  }, [month, rowMap]);

  if (loading) {
    return (
      <div className="card">
        <p>Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="card attendance-calendar-card">
      <div className="calendar-weekdays">
        <span>Thứ 2</span>
        <span>Thứ 3</span>
        <span>Thứ 4</span>
        <span>Thứ 5</span>
        <span>Thứ 6</span>
        <span>Thứ 7</span>
        <span>Chủ nhật</span>
      </div>

      <div className={`attendance-calendar ${compact ? 'compact-calendar' : ''}`}>
        {days.map((cell, index) => {
          if (!cell.date) {
            return <div key={`blank-${index}`} className="calendar-day blank" />;
          }

          const row = cell.row;
          const isFuture = cell.date > highlightToday;
          const isDayOff = Boolean(row?.holiday || row?.weekend);
          const hasPlannedShift = Boolean(row?.plannedStartTime && row?.plannedEndTime);
          const dayClass = row?.holiday ? 'holiday-day' : row?.weekend ? 'weekend-day' : 'workday';
          const todayClass = cell.date === highlightToday ? 'today-day' : '';

          return (
            <div
              key={cell.date}
              className={`calendar-day ${dayClass} ${todayClass}`}
            >
              <div className="calendar-day-head">
                <strong>{dayNumber(cell.date)}</strong>
                <span>{row ? dayTypeLabel(row) : ''}</span>
              </div>

              {row?.holidayName && (
                <div className="holiday-name">{row.holidayName}</div>
              )}

              <div className="calendar-lines">
                {isFuture ? (
                  <>
                    {!isDayOff && hasPlannedShift && (
                      <>
                        <span>
                          Lịch: {shortTime(row?.plannedStartTime)} - {shortTime(row?.plannedEndTime)}
                        </span>
                        <span>
                          Nghỉ trưa: {shortTime(row?.plannedLunchStartTime) || '--'} - {shortTime(row?.plannedLunchEndTime) || '--'}
                        </span>
                        <span>
                          Thời gian chuẩn: {minutesToHourText(row?.plannedWorkingMinutes)}
                        </span>
                      </>
                    )}
                  </>
                ) : isDayOff ? (
                  <>
                    <span>
                      Máy chấm công: {shortTime(row?.firstCheckIn) || '--'} - {shortTime(row?.lastCheckOut) || '--'}
                    </span>
                    <span>
                      Nghỉ giữa giờ: {shortTime(row?.lastBreakOut) || '--'} - {shortTime(row?.firstBreakIn) || '--'}
                    </span>
                    <span>
                      Thời gian làm: {minutesToHourText(row?.totalWorkingMinutes)}
                    </span>
                    <span>
                      OT ngày nghỉ: {minutesToHourText(row?.overtimeMinutes)}
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      Lịch: {shortTime(row?.plannedStartTime)} - {shortTime(row?.plannedEndTime)}
                    </span>
                    <span>
                      Vào/Ra: {shortTime(row?.firstCheckIn)} - {shortTime(row?.lastCheckOut)}
                    </span>
                    <span>
                      Nghỉ: {shortTime(row?.lastBreakOut)} - {shortTime(row?.firstBreakIn)}
                    </span>
                    <span>
                      Làm: {minutesToHourText(row?.totalWorkingMinutes)}
                    </span>
                    <span>
                      Muộn: {row?.lateMinutes ?? 0}p · Sớm: {row?.earlyLeaveMinutes ?? 0}p
                    </span>
                    <span>
                      OT: {minutesToHourText(row?.overtimeMinutes)}
                    </span>
                  </>
                )}

                {!isFuture && row?.approvedRequestTypes && (
                  <span className="request-line">
                    Đơn trong ngày: {row.approvedRequestTypes}
                  </span>
                )}

                {!isFuture && Boolean(row?.approvedLeaveMinutes) && (
                  <span className="request-line">
                    Phép tính vào công: {minutesToHourText(row?.approvedLeaveMinutes)}
                  </span>
                )}
              </div>

              {!isFuture && !isDayOff && row?.status && (
                <span className="badge mini-badge">{viLabel(row.status)}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function dayTypeLabel(row: Pick<Attendance, 'holiday' | 'weekend' | 'holidayName'>) {
  if (row.holiday) {
    return row.holidayName ? `Nghỉ lễ: ${row.holidayName}` : 'Nghỉ lễ';
  }

  if (row.weekend) {
    return 'Thứ 7 / Chủ nhật';
  }

  return 'Ngày làm';
}
