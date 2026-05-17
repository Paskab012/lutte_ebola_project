'use client';

import { useTranslations } from 'next-intl';
import { CURRENT_OUTBREAK } from '@/constants/epidemicData';

export function PHEICAlert() {
  const t = useTranslations('statistics');

  return (
    <div className="relative overflow-hidden rounded-xl border border-danger/40 bg-gradient-to-r from-danger/12 via-danger/8 to-transparent">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-danger" />
      <div className="flex items-start gap-4 px-5 py-4 pl-6">
        <div className="shrink-0 mt-0.5 w-8 h-8 rounded-full bg-danger/15 border border-danger/30 flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-danger animate-pulse" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-black text-danger uppercase tracking-widest">
              {t('pheicDeclaredLabel')}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-danger/15 text-danger font-medium border border-danger/20">
              {CURRENT_OUTBREAK.pheicDeclaredDate}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-danger/10 text-danger/80 border border-danger/15">
              {t('outbreakLabel')}{CURRENT_OUTBREAK.outbreakNumber}
            </span>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">{t('pheicBanner')}</p>
        </div>
      </div>
    </div>
  );
}
