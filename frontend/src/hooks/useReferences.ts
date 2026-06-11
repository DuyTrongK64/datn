import { useQuery } from '@tanstack/react-query';
import { http } from '../api/http';
import type { BaseEntity, ReferenceKey } from '../types';

const endpoints: Record<ReferenceKey, string> = {
  companies: '/lookups/companies',
  departments: '/lookups/departments',
  teams: '/lookups/teams',
  employees: '/lookups/employees',
  contractTypes: '/lookups/contract-types',
  shifts: '/lookups/shifts',
  leaveTypes: '/lookups/leave-types',
  requestTypes: '/lookups/request-types'
};

const safeReferenceKeys: ReferenceKey[] = ['companies', 'departments', 'teams', 'employees', 'contractTypes', 'shifts', 'leaveTypes', 'requestTypes'];

export function useReferences(keys: ReferenceKey[] = safeReferenceKeys) {
  const query = useQuery({
    queryKey: ['references', keys.join('|')],
    queryFn: async () => {
      const entries = await Promise.all(keys.map(async (key) => {
        try {
          const res = await http.get<BaseEntity[]>(endpoints[key]);
          return [key, res.data] as const;
        } catch {
          return [key, []] as const;
        }
      }));
      return Object.fromEntries(entries) as Partial<Record<ReferenceKey, BaseEntity[]>>;
    }
  });
  return query.data ?? {};
}

export function displayEntity(item?: BaseEntity) {
  if (!item) return '';
  const code = item.employeeCode ?? item.code ?? item.username ?? '';
  const name = item.fullName ?? item.name ?? item.deviceName ?? item.email ?? '';
  return [code, name].filter(Boolean).join(' - ') || String(item.id ?? '');
}

export function findDisplay(refs: Partial<Record<ReferenceKey, BaseEntity[]>>, ref: ReferenceKey, id: unknown) {
  if (!id) return '';
  const row = refs[ref]?.find((item) => String(item.id) === String(id));
  return row ? displayEntity(row) : String(id);
}
