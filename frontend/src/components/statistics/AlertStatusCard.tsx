'use client';

import { useTranslations } from 'next-intl';
import { CURRENT_OUTBREAK } from '@/constants/epidemicData';

export function AlertStatusCard() {
  const t = useTranslations('statistics.alertStatus');

  const levels = [
    { labelKey: 'level1' as const, color: 'bg-success' },
    { labelKey: 'level2' as const, color: 'bg-warning' },
    { labelKey: 'level3' as const, color: 'bg-danger' },
  ];

  const tags = [t('tag1'), t('tag2'), t('tag3'), t('tag4')];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1 bg-danger/6 border border-danger/20 rounded-2xl p-5 flex flex-col gap-3">
        <div>
          <p className="text-[10px] font-bold text-danger/70 uppercase tracking-widest mb-2">{t('title')}</p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-danger animate-pulse" />
            <span className="text-xs font-bold text-danger uppercase">{CURRENT_OUTBREAK.whoStatus}</span>
          </div>
        </div>
        <div className="space-y-1.5">
          {levels.map((lvl) => (
            <div key={lvl.labelKey} className="flex items-center gap-2">
              <div className={`h-1.5 w-full rounded-full ${lvl.color}`} />
              <span className="text-[10px] text-text-secondary shrink-0">
                {t(lvl.labelKey).split(' — ')[1]}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-text-muted">{t('declared')}</p>
      </div>

      <div className="md:col-span-2 bg-bg-card border border-border rounded-2xl p-5">
        <p className="font-bold text-text-primary mb-2">{t('pheic')}</p>
        <p className="text-sm text-text-secondary leading-relaxed">{t('description')}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-bg-darker border border-border text-text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
