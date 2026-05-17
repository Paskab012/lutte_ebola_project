import type { ApiResponse, SubmitReportRequest, SubmitReportResponse } from '@/types';
import { submitReport as submitReportApi } from './client';

export async function submitSymptomReport(
  data: SubmitReportRequest
): Promise<ApiResponse<SubmitReportResponse>> {
  return submitReportApi(data);
}
