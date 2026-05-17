import type { ApiResponse, ApiError, SubmitReportRequest, SubmitReportResponse } from '@/types';
import { APP_CONFIG } from '@/constants/config';

class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => null)) as ApiError | null;
        throw new ApiClientError(
          errorData?.message ?? `HTTP ${response.status}`,
          errorData?.code ?? 'UNKNOWN_ERROR',
          response.status
        );
      }

      return (await response.json()) as ApiResponse<T>;
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error;
      }

      throw new ApiClientError(
        'Network error — you may be offline',
        'NETWORK_ERROR',
        0
      );
    }
  }

  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }
}

export class ApiClientError extends Error {
  readonly code: string;
  readonly statusCode: number;

  constructor(message: string, code: string, statusCode: number) {
    super(message);
    this.name = 'ApiClientError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

export const apiClient = new ApiClient(APP_CONFIG.apiBaseUrl);

export async function submitReport(
  data: SubmitReportRequest
): Promise<ApiResponse<SubmitReportResponse>> {
  return apiClient.post<SubmitReportResponse>('/reports', data);
}
