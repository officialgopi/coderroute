import type { AxiosError } from "axios";
import { api } from "./axios.util";

export type ApiMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiResponse<T> {
  message: string;
  data?: T;
  success: boolean;
}

async function apiCallHandler<TRequest = any, TResponse = any>(
  apiEndpoint: string,
  method: ApiMethods,
  body?: TRequest,
  query?: Record<string, any>
): Promise<ApiResponse<TResponse>> {
  try {
    const response = await api.request<ApiResponse<TResponse>>({
      method,
      url: apiEndpoint,
      data: ["POST", "PUT", "PATCH"].includes(method) ? body : undefined,
      params: query,
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<unknown>>;
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";

    return {
      message,
      success: false,
    };
  }
}

export { apiCallHandler };
