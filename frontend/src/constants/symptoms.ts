import type { Symptom } from '@/types';

export const EBOLA_SYMPTOMS: readonly Symptom[] = [
  {
    id: 'fever',
    name: 'Fever',
    weight: 8,
    category: 'early',
    icon: '🌡️',
  },
  {
    id: 'severe_headache',
    name: 'Severe Headache',
    weight: 6,
    category: 'early',
    icon: '🤕',
  },
  {
    id: 'muscle_pain',
    name: 'Muscle Pain',
    weight: 5,
    category: 'early',
    icon: '💪',
  },
  {
    id: 'fatigue',
    name: 'Fatigue / Weakness',
    weight: 5,
    category: 'early',
    icon: '😩',
  },
  {
    id: 'sore_throat',
    name: 'Sore Throat',
    weight: 4,
    category: 'early',
    icon: '🗣️',
  },
  {
    id: 'vomiting',
    name: 'Vomiting',
    weight: 7,
    category: 'advanced',
    icon: '🤮',
  },
  {
    id: 'diarrhea',
    name: 'Diarrhea',
    weight: 7,
    category: 'advanced',
    icon: '🚽',
  },
  {
    id: 'abdominal_pain',
    name: 'Abdominal Pain',
    weight: 6,
    category: 'advanced',
    icon: '🤢',
  },
  {
    id: 'rash',
    name: 'Skin Rash',
    weight: 7,
    category: 'advanced',
    icon: '🔴',
  },
  {
    id: 'red_eyes',
    name: 'Red Eyes',
    weight: 6,
    category: 'advanced',
    icon: '👁️',
  },
  {
    id: 'unexplained_bleeding',
    name: 'Unexplained Bleeding',
    weight: 10,
    category: 'severe',
    icon: '🩸',
  },
  {
    id: 'bruising',
    name: 'Unexplained Bruising',
    weight: 9,
    category: 'severe',
    icon: '🟣',
  },
] as const satisfies readonly Symptom[];

export const RISK_FACTOR_WEIGHTS = {
  contactWithInfected: 20,
  contactWithAnimals: 10,
  travelToAffectedArea: 15,
} as const;

export const DURATION_MULTIPLIER: Readonly<Record<string, number>> = {
  '1-2': 0.8,
  '3-5': 1.0,
  '6-10': 1.2,
  '10+': 1.4,
} as const;
