'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import { useTranslations } from 'next-intl';
import { HISTORICAL_OUTBREAKS } from '@/constants/epidemicData';

const TOOLTIP_STYLE = {
  background: '#060F1C',
  border: '1px solid #1E3A5F',
  borderRadius: '10px',
  color: '#F0F4F8',
  boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
};

export function OutbreakHistory() {
  const t = useTranslations('statistics.historicalOutbreaks');

  return (
    <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-border/50 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-text-primary">{t('title')}</h3>
          <p className="text-xs text-text-secondary mt-0.5">{t('subtitle')}</p>
        </div>
        {/* Variant legend */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ background: '#0B4F6C' }} />
            <span className="text-xs text-text-secondary">{t('zaire')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ background: '#D32F2F' }} />
            <span className="text-xs text-text-secondary">{t('bundibugyo')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-danger animate-pulse" />
            <span className="text-xs text-danger font-semibold">{t('current')}</span>
          </div>
        </div>
      </div>

      <div className="px-2 pt-4 pb-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={HISTORICAL_OUTBREAKS as unknown as Record<string, unknown>[]}
            barCategoryGap="25%"
            barGap={3}
            margin={{ top: 16, right: 16, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,58,95,0.5)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: '#64748B', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#64748B', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              labelStyle={{ color: '#94A3B8', fontSize: 11, marginBottom: 6 }}
              formatter={(value, name) => [
                String(value),
                name === 'cases' ? t('cases') : t('deaths'),
              ]}
            />
            <Bar dataKey="cases" name="cases" radius={[4, 4, 0, 0]} maxBarSize={40}>
              {(HISTORICAL_OUTBREAKS as readonly { variant: string; isCurrent: boolean }[]).map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.isCurrent ? '#D32F2F' : entry.variant === 'Bundibugyo' ? '#E85D2A' : '#0B4F6C'}
                  opacity={entry.isCurrent ? 1 : 0.75}
                />
              ))}
              <LabelList dataKey="cases" position="top" style={{ fill: '#64748B', fontSize: 10 }} />
            </Bar>
            <Bar dataKey="deaths" name="deaths" radius={[4, 4, 0, 0]} maxBarSize={40}>
              {(HISTORICAL_OUTBREAKS as readonly { variant: string; isCurrent: boolean }[]).map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.isCurrent ? '#7F1D1D' : entry.variant === 'Bundibugyo' ? '#C44A1E' : '#083D54'}
                  opacity={entry.isCurrent ? 1 : 0.65}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="px-5 pb-4">
        <p className="text-[10px] text-text-muted italic">{t('note')}</p>
      </div>
    </div>
  );
}
