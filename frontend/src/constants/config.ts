export const APP_CONFIG = {
  name: 'Lutte Ebola',
  description: 'Ensemble contre Ebola — Protégeons nos communautés',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api',
  version: '1.0.0',
} as const;

export const FEATURE_FLAGS = {
  enableOfflineStorage: true,
  enableGeolocation: true,
  enableNotifications: true,
  enableAnalytics: false,
} as const;

export const COMMUNITY_LINKS = {
  whatsappGroup: 'https://chat.whatsapp.com/lutte-ebola-aid',
  radioOkapi: 'https://www.radiookapi.net',
  whoEbola: 'https://www.who.int/health-topics/ebola',
  africaCdc: 'https://africacdc.org',
  msf: 'https://www.msf.org',
  unicefDrc: 'https://www.unicef.org/drc',
} as const;

export const SYMPTOM_CHECKER_STEPS = {
  SYMPTOMS: 0,
  RISK_FACTORS: 1,
  PERSONAL_INFO: 2,
  RESULTS: 3,
  TOTAL: 4,
} as const;
