'use client';

import { useMutation } from '@tanstack/react-query';
import type { SubmitReportRequest, ApiResponse, SubmitReportResponse } from '@/types';
import { submitSymptomReport } from '@/api/reports';
import { savePendingReport } from '@/utils/offlineDb';
import type { SymptomReport } from '@/types';

export function useSubmitReport() {
  return useMutation<ApiResponse<SubmitReportResponse>, Error, SubmitReportRequest>({
    mutationFn: submitSymptomReport,
    onError: async (_error, variables) => {
      // If network fails, save to IndexedDB for later sync
      const offlineReport: SymptomReport = {
        id: crypto.randomUUID(),
        selectedSymptoms: variables.symptoms,
        contactWithInfected: variables.contactWithInfected,
        contactWithAnimals: variables.contactWithAnimals,
        travelToAffectedArea: variables.travelToAffectedArea,
        durationDays: variables.durationDays,
        personalInfo: {
          profileVisibility: variables.profileVisibility,
          fullName: variables.fullName,
          phoneNumber: variables.phoneNumber,
        },
        location: variables.location,
        riskAssessment: {
          level: 'high',
          score: 0,
          requiresImmediateAction: true,
        },
        createdAt: new Date().toISOString(),
        status: 'pending',
      };

      await savePendingReport(offlineReport);
    },
  });
}
