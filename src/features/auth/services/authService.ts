import { apiRequest } from '@/shared/api/client';

import type { RegisterPayload, RegisterResponse } from '@/features/auth/types/auth';

export function registerUser(payload: RegisterPayload) {
  return apiRequest<RegisterResponse>('/auth/signup', {
    method: 'POST',
    body: payload,
  });
}
