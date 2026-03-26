import axios, { AxiosError, type AxiosRequestConfig } from "axios";

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
  headers: {
    "Content-Type": "application/json",
  },
});

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, headers, ...restOptions } = options;
  try {
    const response = await apiClient.request<T>({
      url: normalizePath(path),
      ...restOptions,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      data: body,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message ??
        axiosError.message ??
        "Something went wrong while talking to the server.";

      throw new ApiError(message, axiosError.response?.status ?? 500, axiosError.response?.data);
    }

    throw new ApiError("Something went wrong while talking to the server.", 500, error);
  }
}
