import { apiRequest } from '@/shared/api/client';

import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  VerifyEmailPayload,
  VerifyEmailResponse,
} from '@/features/auth/types/auth';

export function registerUser(payload: RegisterPayload) {
  return apiRequest<RegisterResponse>('/auth/signup', {
    method: 'POST',
    body: payload,
  });
}

export function loginUser(payload: LoginPayload) {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: payload,
  });
}

export function verifyEmail(payload: VerifyEmailPayload) {
  return apiRequest<VerifyEmailResponse>('/auth/verify/email', {
    method: 'POST',
    body: payload,
  });
}
