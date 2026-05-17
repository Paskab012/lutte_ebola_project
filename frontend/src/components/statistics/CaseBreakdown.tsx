'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslations } from 'next-intl';
import { CURRENT_OUTBREAK } from '@/constants/epidemicData';

const TOOLTIP_STYLE = {
  background: '#060F1C',
  border: '1px solid #1E3A5F',
  borderRadius: '10px',
  color: '#F0F4F8',
  boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
};

function DonutChart({ data, totalLabel }: { data: { name: string; value: number; color: string }[]; totalLabel: string }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(value: unknown) => [`${value} (${Math.round((Number(value) / total) * 100)}%)`, '']}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-2xl font-black text-text-primary leading-none">{total}</p>
        <p className="text-[10px] text-text-muted mt-0.5 uppercase tracking-wide">{totalLabel}</p>
      </div>
    </div>
  );
}

export function CaseBreakdown() {
  const t = useTranslations('statistics.caseBreakdown');

  const { suspectedCases, confirmedCases, deaths } = CURRENT_OUTBREAK.stats;
  const activeCases = suspectedCases - deaths;

  const compositionData = [
    { name: t('confirmedLabel'), value: confirmedCases,                    color: '#1A7FA0' },
    { name: t('suspectedLabel'), value: suspectedCases - confirmedCases,   color: '#D32F2F' },
  ];

  const outcomeData = [
    { name: t('deathsLabel'), value: deaths,      color: '#9A1F1F' },
    { name: t('activeLabel'), value: activeCases, color: '#2E7D32' },
  ];

  return (
    <div className="bg-bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col">
      <div className="px-5 pt-5 pb-4 border-b border-border/50">
        <h3 className="text-base font-bold text-text-primary">{t('title')}</h3>
        <p className="text-xs text-text-secondary mt-0.5">{t('subtitle')}</p>
      </div>

      <div className="flex-1 px-5 pt-4 pb-5 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest text-center mb-1">{t('confirmation')}</p>
          <DonutChart data={compositionData} totalLabel={t('total')} />
          <div className="space-y-1.5 mt-2">
            {compositionData.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="text-text-secondary truncate">{d.name}</span>
                <span className="ml-auto font-bold text-text-primary">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest text-center mb-1">{t('outcome')}</p>
          <DonutChart data={outcomeData} totalLabel={t('total')} />
          <div className="space-y-1.5 mt-2">
            {outcomeData.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="text-text-secondary truncate">{d.name}</span>
                <span className="ml-auto font-bold text-text-primary">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 py-3 bg-secondary/5 border-t border-border/50">
        <p className="text-xs text-text-secondary">
          {t('hwNote', { deaths: CURRENT_OUTBREAK.stats.deaths })}
          {' — '}
          <span className="font-bold text-secondary">{CURRENT_OUTBREAK.stats.healthWorkerDeaths}</span>
        </p>
      </div>
    </div>
  );
}
