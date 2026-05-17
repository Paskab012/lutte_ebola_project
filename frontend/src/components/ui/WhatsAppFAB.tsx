'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { WhatsAppIcon } from '@/components/icons';
import { COMMUNITY_LINKS } from '@/constants/config';
import type { Locale } from '@/types';

interface WhatsAppFABProps {
  readonly locale: Locale;
}

export function WhatsAppFAB({ locale }: WhatsAppFABProps) {
  const t = useTranslations('news');

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 group">
      {/* Tooltip label */}
      <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 pointer-events-none">
        <div className="bg-bg-card border border-border rounded-xl px-3 py-2 shadow-xl shadow-bg-darker/50 whitespace-nowrap">
          <p className="text-xs font-bold text-text-primary">{t('communityTitle')}</p>
          <p className="text-[10px] text-text-muted mt-0.5">{t('joinNow')}</p>
        </div>
        <div className="absolute right-5 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border" />
      </div>

      {/* News page link — secondary button */}
      <Link
        href={`/${locale}/news`}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-bg-card border border-border text-text-secondary hover:text-text-primary hover:border-secondary/40 transition-all duration-200 shadow-lg shadow-bg-darker/30 text-xs font-semibold"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
        {t('liveUpdates')}
      </Link>

      {/* WhatsApp button */}
      <a
        href={COMMUNITY_LINKS.whatsappGroup}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('communityJoin')}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#22bf5b] shadow-xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <WhatsAppIcon size={28} className="text-white" />
        {/* Ping ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      </a>
    </div>
  );
}
