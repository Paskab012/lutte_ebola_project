// Real outbreak data sourced from: OMS (17 mai 2026), Africa CDC (17 mai 2026),
// Radio-Canada, TV5Monde, WHO Fact Sheet (avril 2025)

export const CURRENT_OUTBREAK = {
  variant: 'Bundibugyo',
  province: 'Ituri',
  country: 'République démocratique du Congo',
  startDate: '2026-04-24',
  firstCase: 'Infirmier, Bunia (Ituri)',
  lastUpdateDate: '17 mai 2026 — 09:37 UTC+2',
  whoStatus: 'PHEIC' as const,
  pheicDeclaredDate: '17 mai 2026',
  outbreakNumber: 17,
  stats: {
    suspectedCases: 336,
    confirmedCases: 8,
    deaths: 88,
    healthWorkerDeaths: 4,
    countriesAffected: 2,
  },
  cfr: 26.2,
  maxCfr: 50,
  hasVaccine: false,
  hasTreatment: false,
  daysActive: 23,
} as const;

export type ZoneStatus = 'critical' | 'high' | 'moderate';

export interface AffectedZone {
  zone: string;
  province: string | null;
  country: string;
  population: number | null;
  estimatedCases: number;
  status: ZoneStatus;
}

export const AFFECTED_ZONES: readonly AffectedZone[] = [
  {
    zone: 'Mongbwalu',
    province: 'Ituri',
    country: 'RDC',
    population: 150000,
    estimatedCases: 120,
    status: 'critical',
  },
  {
    zone: 'Rwampara',
    province: 'Ituri',
    country: 'RDC',
    population: 150000,
    estimatedCases: 100,
    status: 'critical',
  },
  {
    zone: 'Bunia',
    province: 'Ituri',
    country: 'RDC',
    population: 300000,
    estimatedCases: 90,
    status: 'high',
  },
  {
    zone: 'Nord-Kivu',
    province: 'Nord-Kivu',
    country: 'RDC',
    population: null,
    estimatedCases: 20,
    status: 'high',
  },
  {
    zone: 'Kinshasa',
    province: 'Kinshasa',
    country: 'RDC',
    population: 15000000,
    estimatedCases: 1,
    status: 'moderate',
  },
  {
    zone: 'Kampala',
    province: null,
    country: 'Ouganda',
    population: 1650000,
    estimatedCases: 1,
    status: 'moderate',
  },
] as const;

// Timeline: confirmed data points marked isEstimate: false
// Intermediate points are estimates for visualization purposes only
export const EPIDEMIC_TIMELINE = [
  {
    date: '24 avr',
    cases: 3,
    deaths: 1,
    isEstimate: false,
    milestone: 'Premier cas — Bunia',
  },
  { date: '1 mai', cases: 18, deaths: 5, isEstimate: true },
  { date: '7 mai', cases: 62, deaths: 19, isEstimate: true },
  { date: '12 mai', cases: 145, deaths: 41, isEstimate: true },
  {
    date: '15 mai',
    cases: 246,
    deaths: 65,
    isEstimate: false,
    milestone: 'Africa CDC — épidémie déclarée',
  },
  {
    date: '17 mai',
    cases: 336,
    deaths: 88,
    isEstimate: false,
    milestone: 'OMS — USPPI déclarée',
  },
] as const;

export const HISTORICAL_OUTBREAKS = [
  { label: '1976 RDC', variant: 'Zaïre', cases: 318, deaths: 280, isCurrent: false },
  { label: '1995 RDC', variant: 'Zaïre', cases: 315, deaths: 254, isCurrent: false },
  { label: '2007 Ouganda', variant: 'Bundibugyo', cases: 131, deaths: 42, isCurrent: false },
  { label: '2012 RDC', variant: 'Bundibugyo', cases: 38, deaths: 13, isCurrent: false },
  { label: '2018-20 RDC', variant: 'Zaïre', cases: 3481, deaths: 2299, isCurrent: false },
  { label: '2022 RDC', variant: 'Zaïre', cases: 164, deaths: 87, isCurrent: false },
  { label: '2025 RDC', variant: 'Zaïre', cases: 67, deaths: 34, isCurrent: false },
  { label: '2026 RDC*', variant: 'Bundibugyo', cases: 336, deaths: 88, isCurrent: true },
] as const;

// Public-domain images from CDC Public Health Image Library (PHIL)
// License: Public Domain — no copyright restrictions
export const CDC_IMAGES = {
  // Colorized TEM of Ebola virus particles — filamentous, curved morphology
  ebolaTEM: {
    src: 'https://wwwn.cdc.gov/phil///PHIL_Images/10815/10815_lores.jpg',
    alt: 'Micrographie électronique colorisée de particules du virus Ebola',
    credit: 'CDC / Frederick A. Murphy — Domaine public (PHIL #10815)',
  },
  // B&W TEM showing filamentous branching structure
  ebolaTEMBW: {
    src: 'https://wwwn.cdc.gov/phil///PHIL_Images/10816/10816_lores.jpg',
    alt: 'Micrographie électronique du virus Ebola (structure filamenteuse)',
    credit: 'CDC / Cynthia Goldsmith — Domaine public (PHIL #10816)',
  },
  // CDC EIS officer at Ebola screening station outside Goma, DRC (June 2019)
  gomaScreening: {
    src: 'https://wwwn.cdc.gov/phil///PHIL_Images/23187/23187_lores.jpg',
    alt: 'Agent CDC au poste de dépistage Ebola à Goma, RDC (2019)',
    credit: 'CDC — Domaine public (PHIL #23187)',
  },
} as const;
