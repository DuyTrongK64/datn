import { http } from './http';
import type { ChangePasswordRequest, LoginResponse, UpdateProfileRequest, UserProfile } from '../types';

type MaybeApiResponse<T> = T | { success: boolean; message: string; data: T };

function unwrap<T>(payload: MaybeApiResponse<T>): T {
  if (payload && typeof payload === 'object' && 'success' in payload && 'data' in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const res = await http.post<MaybeApiResponse<LoginResponse>>('/auth/login', { username, password });
  return unwrap(res.data);
}

export async function getMe(): Promise<UserProfile> {
  const res = await http.get<MaybeApiResponse<UserProfile>>('/auth/me');
  return unwrap(res.data);
}

export async function updateMyProfile(payload: UpdateProfileRequest): Promise<UserProfile> {
  const res = await http.put<MaybeApiResponse<UserProfile>>('/auth/me', payload);
  return unwrap(res.data);
}

export async function changeMyPassword(payload: ChangePasswordRequest): Promise<void> {
  await http.put('/auth/me/password', payload);
}
