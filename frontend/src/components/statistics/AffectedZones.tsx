'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/utils/cn';
import { AFFECTED_ZONES, CURRENT_OUTBREAK, type ZoneStatus } from '@/constants/epidemicData';

const STATUS_CONFIG: Record<ZoneStatus, { label: string; dot: string; badge: string; bar: string }> = {
  critical: {
    label: 'critical',
    dot: 'bg-danger',
    badge: 'bg-danger/12 text-danger border-danger/30',
    bar: 'bg-danger',
  },
  high: {
    label: 'high',
    dot: 'bg-warning',
    badge: 'bg-warning/12 text-warning border-warning/30',
    bar: 'bg-warning',
  },
  moderate: {
    label: 'moderate',
    dot: 'bg-primary-light',
    badge: 'bg-primary/12 text-primary-light border-primary/30',
    bar: 'bg-primary-light',
  },
};

export function AffectedZones() {
  const t = useTranslations('statistics.affectedZones');
  const totalCases = CURRENT_OUTBREAK.stats.suspectedCases;

  return (
    <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-border/50 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-text-primary">{t('title')}</h3>
          <p className="text-xs text-text-secondary mt-0.5">{t('subtitle')}</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-text-muted">
          {(['critical', 'high', 'moderate'] as ZoneStatus[]).map((s) => (
            <div key={s} className="flex items-center gap-1">
              <span className={cn('w-2 h-2 rounded-full', STATUS_CONFIG[s].dot)} />
              <span className="capitalize">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cards layout — better than a table on all viewports */}
      <div className="p-5 space-y-3">
        {AFFECTED_ZONES.map((zone) => {
          const cfg = STATUS_CONFIG[zone.status];
          const pct = Math.min((zone.estimatedCases / totalCases) * 100, 100);

          return (
            <div
              key={zone.zone}
              className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl bg-bg-darker/50 border border-border/50 hover:border-border transition-colors"
            >
              {/* Status dot + zone name */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className={cn('w-2.5 h-2.5 rounded-full shrink-0', cfg.dot)} />
                <div className="min-w-0">
                  <p className="font-semibold text-text-primary text-sm truncate">{zone.zone}</p>
                  <p className="text-xs text-text-muted truncate">
                    {zone.province ? `${zone.province}, ` : ''}{zone.country}
                    {zone.population ? ` · ${zone.population.toLocaleString()} pop.` : ''}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="flex-1 min-w-0 hidden sm:block">
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all duration-700', cfg.bar)}
                    style={{ width: `${pct}%`, opacity: 0.7 }}
                  />
                </div>
              </div>

              {/* Cases count */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <p className="text-lg font-black text-text-primary leading-none">{zone.estimatedCases}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">{Math.round(pct)}% of total</p>
                </div>
                <span className={cn('text-[10px] font-bold px-2 py-1 rounded-lg border uppercase tracking-wide', cfg.badge)}>
                  {zone.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
