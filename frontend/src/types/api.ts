import type { RiskAssessment, LocationInfo, SymptomReportData } from './reports';

export interface ApiResponse<T> {
  readonly data: T;
  readonly success: boolean;
  readonly message: string;
}

export interface ApiError {
  readonly code: string;
  readonly message: string;
  readonly statusCode: number;
}

export interface SubmitReportRequest {
  readonly symptoms: readonly string[];
  readonly contactWithInfected: boolean;
  readonly contactWithAnimals: boolean;
  readonly travelToAffectedArea: boolean;
  readonly durationDays: number;
  readonly profileVisibility: SymptomReportData['personalInfo']['profileVisibility'];
  readonly location: LocationInfo;
  readonly riskAssessment: RiskAssessment;
}

export interface SubmitReportResponse {
  readonly reportId: string;
  readonly riskAssessment: RiskAssessment;
  readonly alertSent: boolean;
}
