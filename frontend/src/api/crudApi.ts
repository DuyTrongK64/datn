import { http } from './http';

export async function listEntities<T>(path: string): Promise<T[]> {
  const res = await http.get<T[]>(path);
  return res.data;
}

export async function createEntity<T>(path: string, data: Partial<T>): Promise<T> {
  const res = await http.post<T>(path, data);
  return res.data;
}

export async function updateEntity<T>(path: string, id: string, data: Partial<T>): Promise<T> {
  const res = await http.put<T>(`${path}/${id}`, data);
  return res.data;
}

export async function deleteEntity(path: string, id: string): Promise<void> {
  await http.delete(`${path}/${id}`);
}
