import { openDB, type IDBPDatabase } from 'idb';
import type { SymptomReport } from '@/types';

const DB_NAME = 'lutte-ebola-db';
const DB_VERSION = 1;
const REPORTS_STORE = 'pending-reports';

interface EbolaDB {
  readonly 'pending-reports': {
    key: string;
    value: SymptomReport;
    indexes: {
      'by-status': string;
      'by-date': string;
    };
  };
}

async function getDb(): Promise<IDBPDatabase<EbolaDB>> {
  return openDB<EbolaDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(REPORTS_STORE)) {
        const store = db.createObjectStore(REPORTS_STORE, { keyPath: 'id' });
        store.createIndex('by-status', 'status');
        store.createIndex('by-date', 'createdAt');
      }
    },
  });
}

export async function savePendingReport(report: SymptomReport): Promise<void> {
  const db = await getDb();
  await db.put(REPORTS_STORE, report);
}

export async function getPendingReports(): Promise<readonly SymptomReport[]> {
  const db = await getDb();
  return db.getAllFromIndex(REPORTS_STORE, 'by-status', 'pending');
}

export async function getAllReports(): Promise<readonly SymptomReport[]> {
  const db = await getDb();
  return db.getAll(REPORTS_STORE);
}

export async function markReportAsSubmitted(reportId: string): Promise<void> {
  const db = await getDb();
  const report = await db.get(REPORTS_STORE, reportId);

  if (report) {
    const updated: SymptomReport = { ...report, status: 'submitted' };
    await db.put(REPORTS_STORE, updated);
  }
}

export async function deleteReport(reportId: string): Promise<void> {
  const db = await getDb();
  await db.delete(REPORTS_STORE, reportId);
}

export async function getPendingReportCount(): Promise<number> {
  const db = await getDb();
  return db.countFromIndex(REPORTS_STORE, 'by-status', 'pending');
}
