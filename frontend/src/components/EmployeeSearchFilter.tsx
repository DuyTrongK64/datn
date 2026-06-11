import { useMemo } from 'react';
import type { BaseEntity, TeamMember } from '../types';
import { codeName } from '../utils/format';

export type EmployeeSearchValue = {
  teamId: string;
  keyword: string;
  employeeId: string;
};

export type EmployeeSearchFilterProps = {
  value: EmployeeSearchValue;
  onChange: (next: EmployeeSearchValue) => void;
  employees: BaseEntity[];
  teams: BaseEntity[];
  teamMembers: TeamMember[];
  className?: string;
  compact?: boolean;
  showTeamSelect?: boolean;
  showEmployeeSelect?: boolean;
  teamLabel?: string;
  searchLabel?: string;
  employeeLabel?: string;
  searchPlaceholder?: string;
  allTeamsLabel?: string;
  allEmployeesLabel?: string;
  fixedTeamId?: string;
  teamSelectDisabled?: boolean;
  ignoreTeamMembershipFilter?: boolean;
};

export function employeeMatchesKeyword(employee: BaseEntity, keyword: string) {
  const normalized = keyword.trim().toLowerCase();
  if (!normalized) return true;
  return [
    employee.employeeCode,
    employee.code,
    employee.fullName,
    employee.name,
    employee.employeeName,
    employee.email,
    employee.phone
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .includes(normalized);
}

export function filterEmployeesBySearch(
  employees: BaseEntity[],
  teamMembers: TeamMember[],
  teamId: string,
  keyword: string
) {
  let rows = employees;
  if (teamId) {
    const employeeIds = new Set(
      teamMembers
        .filter((member) => !member.leftDate && String(member.teamId) === String(teamId))
        .map((member) => String(member.employeeId))
    );
    rows = rows.filter((employee) => employeeIds.has(String(employee.id)));
  }
  return rows.filter((employee) => employeeMatchesKeyword(employee, keyword));
}

export function employeeOptionLabel(employee: BaseEntity) {
  return codeName(
    String(employee.employeeCode ?? employee.code ?? ''),
    String(employee.fullName ?? employee.employeeName ?? employee.name ?? employee.email ?? ''),
    String(employee.id ?? '')
  );
}

export function EmployeeSearchFilter({
  value,
  onChange,
  employees,
  teams,
  teamMembers,
  className = '',
  compact = true,
  showTeamSelect = true,
  showEmployeeSelect = true,
  teamLabel = 'Team',
  searchLabel = 'Tìm nhân viên',
  employeeLabel = 'Nhân viên',
  searchPlaceholder = 'Nhập mã, tên, email hoặc SĐT',
  allTeamsLabel = 'Tất cả team',
  allEmployeesLabel = 'Tất cả nhân viên',
  fixedTeamId,
  teamSelectDisabled = false,
  ignoreTeamMembershipFilter = false
}: EmployeeSearchFilterProps) {
  const currentTeamId = fixedTeamId ?? value.teamId;
  const visibleEmployees = useMemo(
    () => filterEmployeesBySearch(employees, teamMembers, ignoreTeamMembershipFilter ? '' : currentTeamId, value.keyword),
    [currentTeamId, employees, ignoreTeamMembershipFilter, teamMembers, value.keyword]
  );

  const update = (next: Partial<EmployeeSearchValue>) => {
    onChange({ ...value, ...next });
  };

  return (
    <div className={`card filters employee-search-filter ${compact ? 'compact-filter' : ''} ${className}`.trim()}>
      {showTeamSelect && (
        <label>
          {teamLabel}
          <select
            value={currentTeamId}
            disabled={teamSelectDisabled || Boolean(fixedTeamId)}
            onChange={(e) => update({ teamId: e.target.value, employeeId: '' })}
          >
            {!fixedTeamId && <option value="">{allTeamsLabel}</option>}
            {teams.map((team) => (
              <option key={String(team.id)} value={String(team.id)}>
                {codeName(String(team.code ?? ''), String(team.name ?? ''), String(team.id ?? ''))}
              </option>
            ))}
          </select>
        </label>
      )}
      <label>
        {searchLabel}
        <input
          value={value.keyword}
          onChange={(e) => update({ keyword: e.target.value, employeeId: '' })}
          placeholder={searchPlaceholder}
        />
      </label>
      {showEmployeeSelect && (
        <label>
          {employeeLabel}
          <select value={value.employeeId} onChange={(e) => update({ employeeId: e.target.value })}>
            <option value="">{allEmployeesLabel}</option>
            {visibleEmployees.map((employee) => (
              <option key={String(employee.id)} value={String(employee.id)}>
                {employeeOptionLabel(employee)}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}
