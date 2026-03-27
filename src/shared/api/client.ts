import axios, { AxiosError, type AxiosRequestConfig } from "axios";

import {
  clearStoredAuthState,
  readStoredAuthState,
  updateStoredAccessToken,
} from "@/features/auth/lib/authStorage";
import type { RefreshTokenResponse } from "@/features/auth/types/auth";

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

type RequestOptions = Omit<AxiosRequestConfig, "url" | "data"> & {
  body?: unknown;
};

type RetriableRequestOptions = RequestOptions & {
  _retry?: boolean;
};

function normalizeBaseUrl(baseUrl?: string) {
  if (!baseUrl) {
    return "/api";
  }

  return baseUrl.replace(/\/+$/, "");
}

function normalizePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshRequest: Promise<string> | null = null;

async function refreshAccessToken() {
  if (!refreshRequest) {
    refreshRequest = apiClient
      .post<RefreshTokenResponse>(normalizePath("auth/refresh"))
      .then((response) => {
        const nextAccessToken = response.data.accessToken ?? response.data.token;

        if (!nextAccessToken) {
          throw new ApiError("Refresh succeeded but no access token was returned.", 500);
        }

        updateStoredAccessToken(nextAccessToken);
        return nextAccessToken;
      })
      .catch((error) => {
        clearStoredAuthState();

        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message?: string }>;
          throw new ApiError(
            axiosError.response?.data?.message ??
              "Your session has expired. Please sign in again.",
            axiosError.response?.status ?? 401,
            axiosError.response?.data,
          );
        }

        throw error;
      })
      .finally(() => {
        refreshRequest = null;
      });
  }

  return refreshRequest;
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { accessToken } = readStoredAuthState();
  const { body, headers, ...restOptions } = options;
  const requestOptions: RetriableRequestOptions = restOptions;
  const resolvedHeaders = {
    "Content-Type": "application/json",
    ...(accessToken && !headers?.Authorization
      ? { Authorization: `Bearer ${accessToken}` }
      : {}),
    ...headers,
  };

  try {
    const response = await apiClient.request<T>({
      url: normalizePath(path),
      ...requestOptions,
      headers: resolvedHeaders,
      data: body,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const shouldRefresh =
        axiosError.response?.status === 401 &&
        !requestOptions._retry &&
        normalizePath(path) !== "auth/refresh" &&
        normalizePath(path) !== "/auth/login";

      if (shouldRefresh) {
        const nextAccessToken = await refreshAccessToken();

        return apiRequest<T>(path, {
          ...options,
          _retry: true,
          headers: {
            ...headers,
            Authorization: `Bearer ${nextAccessToken}`,
          },
        } as RetriableRequestOptions);
      }

      const message =
        axiosError.response?.data?.message ??
        axiosError.message ??
        "Something went wrong while talking to the server.";

      throw new ApiError(message, axiosError.response?.status ?? 500, axiosError.response?.data);
    }

    throw new ApiError("Something went wrong while talking to the server.", 500, error);
  }
}
