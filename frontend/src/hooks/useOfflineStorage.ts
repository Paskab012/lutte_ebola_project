'use client';

import { useState, useEffect, useCallback } from 'react';
import { getPendingReports, savePendingReport, markReportAsSubmitted, getPendingReportCount } from '@/utils/offlineDb';
import type { SymptomReport } from '@/types';

export function useOfflineStorage() {
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    async function loadCount() {
      try {
        const count = await getPendingReportCount();
        setPendingCount(count);
      } catch {
        // IndexedDB not available
      }
    }
    void loadCount();
  }, []);

  const saveReport = useCallback(async (report: SymptomReport) => {
    await savePendingReport(report);
    const count = await getPendingReportCount();
    setPendingCount(count);
  }, []);

  const getPending = useCallback(async (): Promise<readonly SymptomReport[]> => {
    return getPendingReports();
  }, []);

  const markSubmitted = useCallback(async (reportId: string) => {
    await markReportAsSubmitted(reportId);
    const count = await getPendingReportCount();
    setPendingCount(count);
  }, []);

  return {
    isOnline,
    pendingCount,
    saveReport,
    getPending,
    markSubmitted,
  } as const;
}
