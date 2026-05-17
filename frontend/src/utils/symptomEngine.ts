import type { RiskAssessment, RiskLevel, SymptomReportData } from '@/types';
import { EBOLA_SYMPTOMS, RISK_FACTOR_WEIGHTS } from '@/constants/symptoms';
import { RISK_LEVEL_CONFIGS } from '@/constants/riskLevels';

interface SymptomScoreBreakdown {
  readonly symptomScore: number;
  readonly riskFactorScore: number;
  readonly durationMultiplier: number;
  readonly rawScore: number;
  readonly normalizedScore: number;
}

function calculateSymptomScore(selectedSymptomIds: readonly string[]): number {
  return selectedSymptomIds.reduce((total, symptomId) => {
    const symptom = EBOLA_SYMPTOMS.find((s) => s.id === symptomId);
    return total + (symptom?.weight ?? 0);
  }, 0);
}

function calculateRiskFactorScore(report: SymptomReportData): number {
  let score = 0;

  if (report.contactWithInfected) {
    score += RISK_FACTOR_WEIGHTS.contactWithInfected;
  }
  if (report.contactWithAnimals) {
    score += RISK_FACTOR_WEIGHTS.contactWithAnimals;
  }
  if (report.travelToAffectedArea) {
    score += RISK_FACTOR_WEIGHTS.travelToAffectedArea;
  }

  return score;
}

function getDurationMultiplier(days: number): number {
  if (days <= 2) return 0.8;
  if (days <= 5) return 1.0;
  if (days <= 10) return 1.2;
  return 1.4;
}

function determineRiskLevel(score: number): RiskLevel {
  const config = RISK_LEVEL_CONFIGS.find(
    (c) => score >= c.minScore && score <= c.maxScore
  );
  return config?.level ?? 'low';
}

function calculateScoreBreakdown(report: SymptomReportData): SymptomScoreBreakdown {
  const symptomScore = calculateSymptomScore(report.selectedSymptoms);
  const riskFactorScore = calculateRiskFactorScore(report);
  const durationMultiplier = getDurationMultiplier(report.durationDays);

  const maxPossibleSymptomScore = EBOLA_SYMPTOMS.reduce((sum, s) => sum + s.weight, 0);
  const maxPossibleRiskScore = Object.values(RISK_FACTOR_WEIGHTS).reduce((sum, w) => sum + w, 0);
  const maxPossibleRaw = (maxPossibleSymptomScore + maxPossibleRiskScore) * 1.4;

  const rawScore = (symptomScore + riskFactorScore) * durationMultiplier;
  const normalizedScore = Math.min(Math.round((rawScore / maxPossibleRaw) * 100), 100);

  return {
    symptomScore,
    riskFactorScore,
    durationMultiplier,
    rawScore,
    normalizedScore,
  };
}

export function analyzeSymptoms(report: SymptomReportData): RiskAssessment {
  const breakdown = calculateScoreBreakdown(report);
  const level = determineRiskLevel(breakdown.normalizedScore);

  const config = RISK_LEVEL_CONFIGS.find((c) => c.level === level);

  return {
    level,
    score: breakdown.normalizedScore,
    requiresImmediateAction: config?.requiresImmediateAction ?? false,
  };
}

export function getScoreBreakdown(report: SymptomReportData): SymptomScoreBreakdown {
  return calculateScoreBreakdown(report);
}
