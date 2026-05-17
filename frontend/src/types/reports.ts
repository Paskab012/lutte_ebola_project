export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';
export type ReportStatus = 'pending' | 'submitted' | 'reviewed' | 'resolved';
export type ProfileVisibility = 'anonymous' | 'hidden' | 'visible';

export interface GeoCoordinates {
  readonly latitude: number;
  readonly longitude: number;
}

export interface LocationInfo {
  readonly province: string;
  readonly city: string;
  readonly details: string;
  readonly coordinates: GeoCoordinates | null;
}

export interface PersonalInfo {
  readonly profileVisibility: ProfileVisibility;
  readonly fullName: string | null;
  readonly phoneNumber: string | null;
}

export interface SymptomReportData {
  readonly selectedSymptoms: readonly string[];
  readonly contactWithInfected: boolean;
  readonly contactWithAnimals: boolean;
  readonly travelToAffectedArea: boolean;
  readonly durationDays: number;
  readonly personalInfo: PersonalInfo;
  readonly location: LocationInfo;
}

export interface SymptomReport extends SymptomReportData {
  readonly id: string;
  readonly riskAssessment: RiskAssessment;
  readonly createdAt: string;
  readonly status: ReportStatus;
}

export interface RiskAssessment {
  readonly level: RiskLevel;
  readonly score: number;
  readonly requiresImmediateAction: boolean;
}

export interface RiskLevelConfig {
  readonly level: RiskLevel;
  readonly minScore: number;
  readonly maxScore: number;
  readonly color: string;
  readonly bgColor: string;
  readonly requiresImmediateAction: boolean;
}
