'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { useTranslations } from 'next-intl';
import { EPIDEMIC_TIMELINE } from '@/constants/epidemicData';

const TOOLTIP_STYLE = {
  background: '#060F1C',
  border: '1px solid #1E3A5F',
  borderRadius: '10px',
  color: '#F0F4F8',
  boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
};

export function EpidemicTimeline() {
  const t = useTranslations('statistics.timeline');
  const tStats = useTranslations('statistics');

  return (
    <div className="bg-bg-card border border-border rounded-2xl overflow-hidden h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-border/50">
        <h3 className="text-base font-bold text-text-primary">{t('title')}</h3>
        <p className="text-xs text-text-secondary mt-0.5">{t('subtitle')}</p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 px-5 pt-4 pb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-danger" />
          <span className="text-xs text-text-secondary">{t('cases')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-primary-light" />
          <span className="text-xs text-text-secondary">{t('deaths')}</span>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-px border-t-2 border-dashed border-warning/70" />
            <span className="text-xs text-text-muted">Africa CDC</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-px border-t-2 border-dashed border-danger/70" />
            <span className="text-xs text-text-muted">PHEIC</span>
          </div>
        </div>
      </div>

      <div className="px-2 pb-4">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={EPIDEMIC_TIMELINE as unknown as Record<string, unknown>[]} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gradCases" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D32F2F" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#D32F2F" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradDeaths" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1A7FA0" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#1A7FA0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,58,95,0.5)" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#64748B', fontSize: 11 }}
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
                <span key={String(name)} style={{ fontWeight: 700, fontSize: 14 }}>{String(value)}</span>,
                name === 'cases' ? t('cases') : t('deaths'),
              ]}
            />
            <ReferenceLine
              x="15 mai"
              stroke="#F9A825"
              strokeDasharray="5 4"
              strokeWidth={1.5}
            />
            <ReferenceLine
              x="17 mai"
              stroke="#D32F2F"
              strokeDasharray="5 4"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="cases"
              stroke="#D32F2F"
              strokeWidth={2.5}
              fill="url(#gradCases)"
              dot={{ fill: '#D32F2F', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#D32F2F', stroke: '#fff', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="deaths"
              stroke="#1A7FA0"
              strokeWidth={2}
              fill="url(#gradDeaths)"
              dot={{ fill: '#1A7FA0', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#1A7FA0', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="px-5 pb-4">
        <p className="text-[10px] text-text-muted italic">{tStats('estimatedNote')}</p>
      </div>
    </div>
  );
}
