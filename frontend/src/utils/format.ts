export function formatDateTime(value?: string) {
  if (!value) return '';
  return value.replace('T', ' ').slice(0, 16);
}

export function employeeLabel(row: { employeeCode?: string; employeeName?: string; employeeId?: string }) {
  return [row.employeeCode, row.employeeName].filter(Boolean).join(' - ') || row.employeeId || '';
}

export function codeName(code?: string, name?: string, fallback?: string) {
  return [code, name].filter(Boolean).join(' - ') || fallback || '';
}
