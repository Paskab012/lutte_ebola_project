export type SymptomCategory = 'early' | 'advanced' | 'severe';

export interface Symptom {
  readonly id: string;
  readonly name: string;
  readonly weight: number;
  readonly category: SymptomCategory;
  readonly icon: string;
}

export interface SymptomSelection {
  readonly symptomId: string;
  readonly selected: boolean;
}
