import { apiRequest } from "@/shared/api/client";

import type {
  ForgotPasswordResponse,
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  RegisterPayload,
  RegisterResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  VerifyEmailPayload,
  VerifyEmailResponse,
} from "@/features/auth/types/auth";

export function registerUser(payload: RegisterPayload) {
  return apiRequest<RegisterResponse>("/auth/signup", {
    method: "POST",
    body: payload,
  });
}

export function loginUser(payload: LoginPayload) {
  return apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function logoutUser() {
  return apiRequest<LogoutResponse>("/auth/logout", {
    method: "POST",
  });
}

export function verifyEmail(payload: VerifyEmailPayload) {
  return apiRequest<VerifyEmailResponse>("/auth/verify/email", {
    method: "POST",
    body: payload,
  });
}

export function forgotPassword(payload: ForgotPasswordPayload) {
  return apiRequest<ForgotPasswordResponse>("/auth/forgot/password", {
    method: "POST",
    body: payload,
  });
}

export function resetPassword(token: string, payload: ResetPasswordPayload) {
  return apiRequest<ResetPasswordResponse>(
    `/auth/reset/password?token=${encodeURIComponent(token)}`,
    {
      method: "POST",
      body: payload,
    },
  );
}
