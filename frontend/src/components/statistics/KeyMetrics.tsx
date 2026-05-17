'use client';

import { useTranslations } from 'next-intl';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { CURRENT_OUTBREAK } from '@/constants/epidemicData';

interface MetricCardProps {
  value: React.ReactNode;
  label: string;
  source?: string;
  accent: string;
  bg: string;
  border: string;
  size?: 'large' | 'normal';
}

function MetricCard({ value, label, source, accent, bg, border, size = 'normal' }: MetricCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl border ${border} ${bg} p-5 flex flex-col justify-between gap-3`}>
      <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full ${accent} opacity-20 blur-2xl pointer-events-none`} />
      <div>
        <p className={`font-black leading-none ${size === 'large' ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'} ${accent.replace('bg-', 'text-').replace('/20', '')}`}>
          {value}
        </p>
      </div>
      <div>
        <p className="text-sm font-semibold text-text-primary leading-snug">{label}</p>
        {source && <p className="text-xs text-text-muted mt-0.5 leading-tight">{source}</p>}
      </div>
    </div>
  );
}

export function KeyMetrics() {
  const t = useTranslations('statistics.keyMetrics');

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="col-span-2 md:col-span-1">
        <MetricCard
          value={<AnimatedCounter end={CURRENT_OUTBREAK.stats.suspectedCases} />}
          label={t('suspectedCases')}
          source={t('sourceCases')}
          accent="bg-danger"
          bg="bg-danger/8"
          border="border-danger/25"
          size="large"
        />
      </div>
      <MetricCard value={<AnimatedCounter end={CURRENT_OUTBREAK.stats.deaths} />} label={t('deaths')} accent="bg-danger-dark" bg="bg-bg-card" border="border-border" />
      <MetricCard value={`${CURRENT_OUTBREAK.cfr}%`} label={t('cfr')} accent="bg-warning" bg="bg-warning/5" border="border-warning/20" />
      <MetricCard value={<AnimatedCounter end={CURRENT_OUTBREAK.stats.confirmedCases} />} label={t('confirmedCases')} source={t('sourceConfirmed')} accent="bg-primary-light" bg="bg-primary/8" border="border-primary/25" />
      <MetricCard value={<AnimatedCounter end={CURRENT_OUTBREAK.stats.healthWorkerDeaths} />} label={t('healthWorkers')} accent="bg-secondary" bg="bg-secondary/8" border="border-secondary/20" />
      <MetricCard value={<AnimatedCounter end={CURRENT_OUTBREAK.stats.countriesAffected} />} label={t('countriesAffected')} accent="bg-success" bg="bg-success/5" border="border-success/20" />
      <MetricCard value={`${CURRENT_OUTBREAK.maxCfr}%`} label={t('maxFatality')} accent="bg-danger" bg="bg-bg-card" border="border-border" />
      <MetricCard value={<AnimatedCounter end={CURRENT_OUTBREAK.daysActive} />} label={t('daysActive')} accent="bg-text-muted" bg="bg-bg-card" border="border-border" />
    </div>
  );
}
