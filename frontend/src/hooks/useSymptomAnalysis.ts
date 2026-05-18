'use client';

import { useState, useCallback, useMemo } from 'react';
import type { SymptomReportData, RiskAssessment, ProfileVisibility } from '@/types';
import { analyzeSymptoms } from '@/utils/symptomEngine';
import { SYMPTOM_CHECKER_STEPS } from '@/constants/config';

interface SymptomAnalysisState {
  readonly currentStep: number;
  readonly selectedSymptoms: string[];
  readonly contactWithInfected: boolean;
  readonly contactWithAnimals: boolean;
  readonly travelToAffectedArea: boolean;
  readonly durationDays: number;
  readonly profileVisibility: ProfileVisibility;
  readonly fullName: string;
  readonly phoneNumber: string;
  readonly province: string;
  readonly city: string;
  readonly locationDetails: string;
  readonly coordinates: { latitude: number; longitude: number } | null;
  readonly riskAssessment: RiskAssessment | null;
  readonly isAnalyzing: boolean;
}

const initialState: SymptomAnalysisState = {
  currentStep: 0,
  selectedSymptoms: [],
  contactWithInfected: false,
  contactWithAnimals: false,
  travelToAffectedArea: false,
  durationDays: 1,
  profileVisibility: 'anonymous',
  fullName: '',
  phoneNumber: '',
  province: '',
  city: '',
  locationDetails: '',
  coordinates: null,
  riskAssessment: null,
  isAnalyzing: false,
};

export function useSymptomAnalysis() {
  const [state, setState] = useState<SymptomAnalysisState>(initialState);

  const toggleSymptom = useCallback((symptomId: string) => {
    setState((prev) => ({
      ...prev,
      selectedSymptoms: prev.selectedSymptoms.includes(symptomId)
        ? prev.selectedSymptoms.filter((id) => id !== symptomId)
        : [...prev.selectedSymptoms, symptomId],
    }));
  }, []);

  const updateField = useCallback(<K extends keyof SymptomAnalysisState>(
    field: K,
    value: SymptomAnalysisState[K]
  ) => {
    setState((prev) => ({ ...prev, [field]: value }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => {
      if (prev.currentStep >= SYMPTOM_CHECKER_STEPS.TOTAL - 1) return prev;
      return { ...prev, currentStep: prev.currentStep + 1 };
    });
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => {
      if (prev.currentStep <= 0) return prev;
      return { ...prev, currentStep: prev.currentStep - 1 };
    });
  }, []);

  const goToStep = useCallback((step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  }, []);

  const runAnalysis = useCallback((onComplete?: (result: RiskAssessment) => void) => {
    setState((prev) => ({ ...prev, isAnalyzing: true }));

    const reportData: SymptomReportData = {
      selectedSymptoms: state.selectedSymptoms,
      contactWithInfected: state.contactWithInfected,
      contactWithAnimals: state.contactWithAnimals,
      travelToAffectedArea: state.travelToAffectedArea,
      durationDays: state.durationDays,
      personalInfo: {
        profileVisibility: state.profileVisibility,
        fullName: state.profileVisibility !== 'anonymous' ? state.fullName : null,
        phoneNumber: state.profileVisibility !== 'anonymous' ? state.phoneNumber : null,
      },
      location: {
        province: state.province,
        city: state.city,
        details: state.locationDetails,
        coordinates: state.coordinates,
      },
    };

    // Simulate brief analysis delay for UX
    setTimeout(() => {
      const result = analyzeSymptoms(reportData);
      setState((prev) => ({
        ...prev,
        riskAssessment: result,
        isAnalyzing: false,
        currentStep: SYMPTOM_CHECKER_STEPS.RESULTS,
      }));
      onComplete?.(result);
    }, 1500);
  }, [state]);

  const resetAnalysis = useCallback(() => {
    setState(initialState);
  }, []);

  const reportData: SymptomReportData = useMemo(() => ({
    selectedSymptoms: state.selectedSymptoms,
    contactWithInfected: state.contactWithInfected,
    contactWithAnimals: state.contactWithAnimals,
    travelToAffectedArea: state.travelToAffectedArea,
    durationDays: state.durationDays,
    personalInfo: {
      profileVisibility: state.profileVisibility,
      fullName: state.profileVisibility !== 'anonymous' ? state.fullName : null,
      phoneNumber: state.profileVisibility !== 'anonymous' ? state.phoneNumber : null,
    },
    location: {
      province: state.province,
      city: state.city,
      details: state.locationDetails,
      coordinates: state.coordinates,
    },
  }), [state]);

  return {
    state,
    reportData,
    toggleSymptom,
    updateField,
    nextStep,
    prevStep,
    goToStep,
    runAnalysis,
    resetAnalysis,
  } as const;
}
