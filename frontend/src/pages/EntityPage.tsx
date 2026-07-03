import { FormEvent, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEntity,
  deleteEntity,
  listEntities,
  updateEntity,
} from "../api/crudApi";
import { useAuth } from "../state/AuthContext";
import type {
  BaseEntity,
  FieldConfig,
  ReferenceKey,
  TeamMember,
} from "../types";
import type { EntityPageConfig } from "../entityPages";
import {
  displayEntity,
  findDisplay,
  useReferences,
} from "../hooks/useReferences";
import { codeName } from "../utils/format";
import {
  EmployeeSearchFilter,
  type EmployeeSearchValue,
  filterEmployeesBySearch,
} from "../components/EmployeeSearchFilter";
import { optionLabel, viLabel } from "../utils/labels";

function defaultValueFor(field: FieldConfig) {
  if (field.defaultValue !== undefined) return field.defaultValue;
  if (field.type === "checkbox") return false;
  return "";
}

function emptyForm(fields: FieldConfig[]): BaseEntity {
  const result: BaseEntity = {};
  fields.forEach((field) => {
    result[field.key] = defaultValueFor(field);
  });
  return result;
}

export function EntityPage({ config }: { config: EntityPageConfig }) {
  const queryClient = useQueryClient();
  const refs = useReferences();
  const { hasRole } = useAuth();
  const isTeamPage = config.path === "teams";
  const isEmployeePage = config.path === "employees";
  const leaderViewOnly = hasRole("LEADER") && !hasRole("ADMIN");
  const canManageTeamMembers = hasRole("ADMIN");
  const isReadOnly = Boolean(config.readOnly) || leaderViewOnly;
  const [editing, setEditing] = useState<BaseEntity | null>(null);
  const [form, setForm] = useState<BaseEntity>(() => emptyForm(config.fields));
  const [employeeFilter, setEmployeeFilter] = useState<EmployeeSearchValue>({
    teamId: "",
    keyword: "",
    employeeId: "",
  });
  const [selectedTeam, setSelectedTeam] = useState<BaseEntity | null>(null);
  const [memberEmployeeId, setMemberEmployeeId] = useState("");
  const [memberDialogOpen, setMemberDialogOpen] = useState(false);
  const { data = [], isLoading } = useQuery({
    queryKey: [config.apiPath],
    queryFn: () => listEntities<BaseEntity>(config.apiPath),
  });

  const { data: teamMembers = [] } = useQuery({
    queryKey: ["team-members-for-contract-filter"],
    queryFn: () => listEntities<TeamMember>("/team-members"),
    enabled: Boolean(
      config.teamFilter ||
      config.employeeFilter ||
      isTeamPage ||
      isEmployeePage,
    ),
  });

  const shouldShowEmployeeFilter = Boolean(
    config.teamFilter || config.employeeFilter || isEmployeePage,
  );

  const filteredEmployees = useMemo(() => {
    if (!shouldShowEmployeeFilter) return refs.employees ?? [];
    return filterEmployeesBySearch(
      refs.employees ?? [],
      teamMembers,
      employeeFilter.teamId,
      employeeFilter.keyword,
    );
  }, [
    employeeFilter.keyword,
    employeeFilter.teamId,
    refs.employees,
    shouldShowEmployeeFilter,
    teamMembers,
  ]);

  const filteredEmployeeIds = useMemo(
    () => new Set(filteredEmployees.map((employee) => String(employee.id))),
    [filteredEmployees],
  );

  const effectiveRefs = useMemo(() => {
    if (!shouldShowEmployeeFilter) return refs;
    return { ...refs, employees: filteredEmployees };
  }, [filteredEmployees, refs, shouldShowEmployeeFilter]);

  const visibleData = useMemo(() => {
    let rows = data;
    if (
      shouldShowEmployeeFilter &&
      (employeeFilter.teamId || employeeFilter.keyword.trim())
    ) {
      rows = rows.filter((row) =>
        filteredEmployeeIds.has(
          String(isEmployeePage ? row.id : (row.employeeId ?? "")),
        ),
      );
    }
    if (shouldShowEmployeeFilter && employeeFilter.employeeId) {
      rows = rows.filter(
        (row) =>
          String(isEmployeePage ? row.id : (row.employeeId ?? "")) ===
          String(employeeFilter.employeeId),
      );
    }
    return rows;
  }, [
    data,
    employeeFilter.employeeId,
    employeeFilter.keyword,
    employeeFilter.teamId,
    filteredEmployeeIds,
    isEmployeePage,
    shouldShowEmployeeFilter,
  ]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = normalizePayload(form, config.fields, refs);
      if (editing?.id) return updateEntity(config.apiPath, editing.id, payload);
      return createEntity(config.apiPath, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [config.apiPath] });
      queryClient.invalidateQueries({ queryKey: ["references"] });
      queryClient.invalidateQueries({
        queryKey: ["team-members-for-contract-filter"],
      });
      setEditing(null);
      setForm(emptyForm(config.fields));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteEntity(config.apiPath, id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [config.apiPath] }),
  });

  const addTeamMemberMutation = useMutation({
    mutationFn: async (employeeIds: string[]) =>
      Promise.all(
        employeeIds.map((employeeId) =>
          createEntity("/team-members", {
            teamId: selectedTeam?.id,
            employeeId,
            joinedDate: new Date().toISOString().slice(0, 10),
            leader: false,
          }),
        ),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["team-members-for-contract-filter"],
      });
      queryClient.invalidateQueries({ queryKey: ["references"] });
      setMemberEmployeeId("");
      setMemberDialogOpen(false);
    },
  });

  const removeTeamMemberMutation = useMutation({
    mutationFn: (id: string) => deleteEntity("/team-members", id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["team-members-for-contract-filter"],
      }),
  });

  const visibleFields = useMemo(
    () =>
      config.fields.filter((field) => !field.hidden && field.type !== "hidden"),
    [config.fields],
  );
  const columns = useMemo(
    () =>
      visibleFields
        .filter((field) => !field.key.toLowerCase().includes("password"))
        .slice(0, 9),
    [visibleFields],
  );
  const selectedTeamMembers = useMemo(() => {
    if (!selectedTeam?.id) return [];
    return teamMembers.filter(
      (member) => String(member.teamId) === String(selectedTeam.id),
    );
  }, [selectedTeam?.id, teamMembers]);
  const selectedTeamEmployeeIds = useMemo(
    () =>
      new Set(selectedTeamMembers.map((member) => String(member.employeeId))),
    [selectedTeamMembers],
  );
  const availableTeamEmployees = useMemo(() => {
    return (refs.employees ?? []).filter(
      (employee) => !selectedTeamEmployeeIds.has(String(employee.id)),
    );
  }, [refs.employees, selectedTeamEmployeeIds]);

  useEffect(() => {
    if (!selectedTeam?.id) return;
    const freshTeam = data.find(
      (row) => String(row.id) === String(selectedTeam.id),
    );
    if (freshTeam) setSelectedTeam(freshTeam);
  }, [data, selectedTeam?.id]);

  function startEdit(row: BaseEntity) {
    setEditing(row);
    setForm({ ...emptyForm(config.fields), ...row });
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    saveMutation.mutate();
  }

  return (
    <section>
      <h2>{config.title}</h2>
      {shouldShowEmployeeFilter && (
        <EmployeeSearchFilter
          value={employeeFilter}
          onChange={(next) => {
            setEmployeeFilter(next);
            setForm((prev) => ({ ...prev, employeeId: next.employeeId || "" }));
          }}
          employees={refs.employees ?? []}
          teams={refs.teams ?? []}
          teamMembers={teamMembers}
        />
      )}
      <div className={isReadOnly ? "grid-one" : "grid-two"}>
        {!isReadOnly && <form className="card form-grid" onSubmit={submit}>
          <h3>{editing ? "Cập nhật" : "Tạo mới"}</h3>
          {visibleFields.map((field) =>
            renderField(field, form, setForm, effectiveRefs),
          )}
          <div className="form-actions">
            <button type="submit">{editing ? "Lưu" : "Tạo"}</button>
            {editing && (
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  setEditing(null);
                  setForm(emptyForm(config.fields));
                }}
              >
                Hủy
              </button>
            )}
          </div>
        </form>}
        <div className={`card table-wrap ${isReadOnly ? "wide" : ""}`.trim()}>
          <h3>Danh sách</h3>
          {isLoading ? (
            <p>Đang tải...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  {columns.map((c) => (
                    <th key={c.key}>{c.label}</th>
                  ))}
                  {!isReadOnly && <th>Thao tác</th>}
                </tr>
              </thead>
              <tbody>
                {visibleData.map((row) => (
                  <tr
                    key={row.id as string}
                    className={isTeamPage ? "clickable-row" : ""}
                    onClick={() => isTeamPage && setSelectedTeam(row)}
                  >
                    {columns.map((c) => (
                      <td key={c.key}>{formatCell(c, row[c.key], refs)}</td>
                    ))}
                    {!isReadOnly && <td
                      className="actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button className="small" onClick={() => startEdit(row)}>
                        Sửa
                      </button>
                      <button
                        className="small danger"
                        onClick={() => row.id && deleteMutation.mutate(row.id)}
                      >
                        Xóa
                      </button>
                    </td>}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {isTeamPage && selectedTeam && (
        <TeamMemberPanel
          team={selectedTeam}
          members={selectedTeamMembers}
          employees={refs.employees ?? []}
          availableEmployees={availableTeamEmployees}
          teams={refs.teams ?? []}
          teamMembers={teamMembers}
          memberEmployeeId={memberEmployeeId}
          setMemberEmployeeId={setMemberEmployeeId}
          dialogOpen={memberDialogOpen}
          setDialogOpen={setMemberDialogOpen}
          canManage={canManageTeamMembers}
          onAdd={(employeeIds) => employeeIds.length > 0 && addTeamMemberMutation.mutate(employeeIds)}
          onRemove={(id) => removeTeamMemberMutation.mutate(id)}
          saving={
            addTeamMemberMutation.isPending ||
            removeTeamMemberMutation.isPending
          }
        />
      )}
    </section>
  );
}

function RequiredMark({ required }: { required?: boolean }) {
  return required ? <span className="required-mark"> *</span> : null;
}

function renderField(
  field: FieldConfig,
  form: BaseEntity,
  setForm: (v: BaseEntity) => void,
  refs: ReturnType<typeof useReferences>,
) {
  const value = form[field.key] ?? "";
  const update = (next: unknown) => setForm({ ...form, [field.key]: next });
  if (field.ref) {
    const options = refs[field.ref] ?? [];
    return (
      <label key={field.key}>
        {field.label}
        <RequiredMark required={field.required} />
        <select
          required={field.required}
          value={String(value)}
          onChange={(e) => update(e.target.value)}
        >
          <option value="">-- chọn --</option>
          {options.map((opt) => (
            <option key={String(opt.id)} value={String(opt.id)}>
              {displayEntity(opt)}
            </option>
          ))}
        </select>
      </label>
    );
  }
  return (
    <label key={field.key}>
      {field.label}
      <RequiredMark required={field.required} />
      {field.type === "select" ? (
        <select
          required={field.required}
          value={String(value)}
          onChange={(e) => update(e.target.value)}
        >
          <option value="">-- chọn --</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {optionLabel(opt)}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          required={field.required}
          value={String(value)}
          onChange={(e) => update(e.target.value)}
        />
      ) : field.type === "checkbox" ? (
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => update(e.target.checked)}
        />
      ) : (
        <input
          required={field.required}
          type={field.type ?? "text"}
          value={String(value)}
          onChange={(e) =>
            update(
              field.type === "number" ? Number(e.target.value) : e.target.value,
            )
          }
        />
      )}
    </label>
  );
}

function normalizePayload(
  form: BaseEntity,
  fields: FieldConfig[],
  refs: Partial<Record<ReferenceKey, BaseEntity[]>>,
) {
  const payload: BaseEntity = {};
  fields.forEach((field) => {
    let value = form[field.key];
    if (
      (value === "" || value === undefined || value === null) &&
      field.defaultValue !== undefined
    ) {
      value = field.defaultValue;
    }
    if (
      (value === "" || value === undefined || value === null) &&
      field.defaultRef
    ) {
      value = refs[field.defaultRef]?.[0]?.id ?? null;
    }
    if (["id", "createdAt", "updatedAt"].includes(field.key)) return;
    if (value === "") payload[field.key] = null;
    else payload[field.key] = value;
  });
  return payload;
}

function formatCell(
  field: FieldConfig,
  value: unknown,
  refs: ReturnType<typeof useReferences>,
) {
  if (value === null || value === undefined) return "";
  if (field.ref) return findDisplay(refs, field.ref, value);
  if (typeof value === "boolean") return value ? "Có" : "Không";
  if (
    field.type === "select" ||
    field.key.toLowerCase().includes("status") ||
    field.key.toLowerCase().endsWith("type")
  )
    return viLabel(value);
  if (typeof value === "string" && value.includes("T"))
    return value.replace("T", " ").slice(0, 16);
  if (typeof value === "string" && value.length > 36)
    return value.slice(0, 36) + "...";
  return String(value);
}

function TeamMemberPanel({
  team,
  members,
  employees,
  availableEmployees,
  teams,
  teamMembers,
  memberEmployeeId,
  setMemberEmployeeId,
  dialogOpen,
  setDialogOpen,
  canManage,
  onAdd,
  onRemove,
  saving,
}: {
  team: BaseEntity;
  members: TeamMember[];
  employees: BaseEntity[];
  availableEmployees: BaseEntity[];
  teams: BaseEntity[];
  teamMembers: TeamMember[];
  memberEmployeeId: string;
  setMemberEmployeeId: (value: string) => void;
  dialogOpen: boolean;
  setDialogOpen: (value: boolean) => void;
  canManage: boolean;
  onAdd: (employeeIds: string[]) => void;
  onRemove: (id: string) => void;
  saving: boolean;
}) {
  const employeeById = useMemo(
    () => new Map(employees.map((employee) => [String(employee.id), employee])),
    [employees],
  );
  const [dialogFilter, setDialogFilter] = useState<EmployeeSearchValue>({
    teamId: '',
    keyword: '',
    employeeId: memberEmployeeId,
  });
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<Set<string>>(
    () => new Set(),
  );

  useEffect(() => {
    setDialogFilter({ teamId: '', keyword: '', employeeId: memberEmployeeId });
    setSelectedEmployeeIds(new Set());
  }, [memberEmployeeId, team.id]);

  const candidateEmployees = useMemo(() => {
    let rows = filterEmployeesBySearch(
      availableEmployees,
      teamMembers,
      dialogFilter.teamId,
      dialogFilter.keyword,
    );
    if (dialogFilter.employeeId) {
      rows = rows.filter(
        (employee) => String(employee.id) === String(dialogFilter.employeeId),
      );
    }
    return rows;
  }, [availableEmployees, dialogFilter.employeeId, dialogFilter.keyword, dialogFilter.teamId, teamMembers]);

  function toggleEmployee(employeeId: string, checked: boolean) {
    setSelectedEmployeeIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(employeeId);
      else next.delete(employeeId);
      return next;
    });
    setMemberEmployeeId(checked ? employeeId : '');
  }

  function selectAllVisible(checked: boolean) {
    setSelectedEmployeeIds((prev) => {
      const next = new Set(prev);
      candidateEmployees.forEach((employee) => {
        const id = String(employee.id);
        if (checked) next.add(id);
        else next.delete(id);
      });
      return next;
    });
  }

  const selectedCount = selectedEmployeeIds.size;

  return (
    <div className="card table-wrap team-member-card">
      <div className="team-member-header">
        <div>
          <h3>
            Thành viên hiện tại của team{' '}
            {codeName(String(team.code ?? ''), String(team.name ?? ''))}
          </h3>
          <span>{members.length} thành viên</span>
        </div>
        {canManage && (
          <button type="button" onClick={() => setDialogOpen(true)}>
            Thêm thành viên
          </button>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Mã nhân viên</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Vai trò trong team</th>
            <th>Ngày vào team</th>
            {canManage && <th>Thao tác</th>}
          </tr>
        </thead>
        <tbody>
          {members.map((member) => {
            const employee = employeeById.get(String(member.employeeId));
            return (
              <tr key={String(member.id)}>
                <td>{String(employee?.employeeCode ?? '')}</td>
                <td>{String(employee?.fullName ?? member.employeeId ?? '')}</td>
                <td>{String(employee?.email ?? '')}</td>
                <td>{member.leader ? 'Leader' : 'Thành viên'}</td>
                <td>{String(member.joinedDate ?? '')}</td>
                {canManage && (
                  <td>
                    <button
                      type="button"
                      className="small danger"
                      disabled={saving}
                      onClick={() => member.id && onRemove(String(member.id))}
                    >
                      Xóa khỏi team
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
          {members.length === 0 && (
            <tr>
              <td colSpan={canManage ? 6 : 5}>Team này chưa có thành viên.</td>
            </tr>
          )}
        </tbody>
      </table>

      {dialogOpen && (
        <div className="modal-backdrop">
          <div className="modal-card wide-modal team-member-dialog">
            <div className="modal-title-row">
              <div>
                <h3>Thêm thành viên vào team</h3>
                <p>
                  Chọn một hoặc nhiều nhân viên. Nếu nhân viên đang thuộc team khác,
                  hệ thống sẽ tự chuyển nhân viên sang team này.
                </p>
              </div>
              <button type="button" className="secondary" onClick={() => setDialogOpen(false)}>
                Đóng
              </button>
            </div>

            <EmployeeSearchFilter
              value={dialogFilter}
              onChange={(next) => {
                setDialogFilter(next);
                if (next.employeeId) setSelectedEmployeeIds(new Set([next.employeeId]));
              }}
              employees={availableEmployees}
              teams={teams}
              teamMembers={teamMembers}
              allEmployeesLabel="Chọn nhân viên"
              className="team-dialog-filter"
            />

            <div className="team-dialog-toolbar">
              <span>Đã chọn {selectedCount} nhân viên</span>
              <div className="form-actions">
                <button
                  type="button"
                  className="secondary"
                  onClick={() => selectAllVisible(true)}
                  disabled={candidateEmployees.length === 0}
                >
                  Chọn tất cả đang hiển thị
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setSelectedEmployeeIds(new Set())}
                  disabled={selectedCount === 0}
                >
                  Bỏ chọn
                </button>
                <button
                  type="button"
                  onClick={() => onAdd(Array.from(selectedEmployeeIds))}
                  disabled={selectedCount === 0 || saving}
                >
                  {saving ? 'Đang thêm...' : `Thêm ${selectedCount} nhân viên`}
                </button>
              </div>
            </div>

            <div className="table-wrap dialog-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={candidateEmployees.length > 0 && candidateEmployees.every((employee) => selectedEmployeeIds.has(String(employee.id)))}
                        onChange={(e) => selectAllVisible(e.target.checked)}
                      />
                    </th>
                    <th>Mã nhân viên</th>
                    <th>Họ tên</th>
                    <th>Email</th>
                    <th>SĐT</th>
                  </tr>
                </thead>
                <tbody>
                  {candidateEmployees.map((employee) => {
                    const id = String(employee.id);
                    return (
                      <tr key={id} className="clickable-row" onClick={() => toggleEmployee(id, !selectedEmployeeIds.has(id))}>
                        <td onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selectedEmployeeIds.has(id)}
                            onChange={(e) => toggleEmployee(id, e.target.checked)}
                          />
                        </td>
                        <td>{String(employee.employeeCode ?? employee.code ?? '')}</td>
                        <td>{String(employee.fullName ?? employee.employeeName ?? employee.name ?? '')}</td>
                        <td>{String(employee.email ?? '')}</td>
                        <td>{String(employee.phone ?? '')}</td>
                      </tr>
                    );
                  })}
                  {candidateEmployees.length === 0 && (
                    <tr>
                      <td colSpan={5}>Không có nhân viên phù hợp với bộ lọc.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
