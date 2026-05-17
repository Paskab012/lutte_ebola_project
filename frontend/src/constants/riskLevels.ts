import type { RiskLevelConfig } from '@/types';

export const RISK_LEVEL_CONFIGS: readonly RiskLevelConfig[] = [
  {
    level: 'low',
    minScore: 0,
    maxScore: 25,
    color: '#2E7D32',
    bgColor: 'rgba(46, 125, 50, 0.1)',
    requiresImmediateAction: false,
  },
  {
    level: 'moderate',
    minScore: 26,
    maxScore: 50,
    color: '#F9A825',
    bgColor: 'rgba(249, 168, 37, 0.1)',
    requiresImmediateAction: false,
  },
  {
    level: 'high',
    minScore: 51,
    maxScore: 75,
    color: '#E85D2A',
    bgColor: 'rgba(232, 93, 42, 0.1)',
    requiresImmediateAction: true,
  },
  {
    level: 'critical',
    minScore: 76,
    maxScore: 100,
    color: '#D32F2F',
    bgColor: 'rgba(211, 47, 47, 0.1)',
    requiresImmediateAction: true,
  },
] as const satisfies readonly RiskLevelConfig[];

export const EMERGENCY_CONTACTS = {
  emergencyLine: '101',
  congoDPS: '+243 970 780 356',
  whoGoma: '+243 81 555 4952',
  whoEmail: 'afwcocd@who.int',
  gomaEmail: 'contact@cfnk.org',
  whoGomaAddress: 'No. 16 Avenue Grevelli, Quartier Les Volcans, Goma, RDC',
  whoKinshasaAddress: 'Avenue des Cliniques N°42, Gombe, Kinshasa',
} as const;
