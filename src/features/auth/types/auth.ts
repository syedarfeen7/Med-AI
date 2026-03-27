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
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'patient' | 'doctor';
  };
  token?: string;
}

export interface LoginResponse {
  message?: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'patient' | 'doctor';
  };
}

export interface LogoutResponse {
  message?: string;
  success?: boolean;
}

export interface VerifyEmailPayload {
  token: string;
}

export interface VerifyEmailResponse {
  message?: string;
  success?: boolean;
}
