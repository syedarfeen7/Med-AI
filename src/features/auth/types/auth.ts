export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'patient' | 'doctor';
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'patient' | 'doctor';
}

export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface RegisterResponse {
  message?: string;
  user?: AuthUser;
  token?: string;
}

export interface LoginResponse {
  message?: string;
  accessToken?: string;
  token?: string;
  user?: AuthUser;
}

export interface LogoutResponse {
  message?: string;
  success?: boolean;
}

export interface RefreshTokenResponse {
  message?: string;
  accessToken?: string;
  token?: string;
}

export interface VerifyEmailPayload {
  token: string;
}
export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  password: string;
  confirmPassword: string;
}

export interface VerifyEmailResponse {
  message?: string;
  success?: boolean;
}

export interface ForgotPasswordResponse {
  message?: string;
  success?: boolean;
}

export interface ResetPasswordResponse {
  message?: string;
  success?: boolean;
}
