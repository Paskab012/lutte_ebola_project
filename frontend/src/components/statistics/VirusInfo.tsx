'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { CDC_IMAGES, CURRENT_OUTBREAK } from '@/constants/epidemicData';

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function FactRow({ icon, label, danger }: { icon: string; label: string; danger?: boolean }) {
  return (
    <div className={cn('flex items-center gap-3 px-4 py-3 rounded-xl border', danger ? 'bg-danger/6 border-danger/20' : 'bg-bg-darker/60 border-border/50')}>
      <span className="text-lg shrink-0 leading-none">{icon}</span>
      <span className={cn('text-sm font-medium', danger ? 'text-danger' : 'text-text-secondary')}>{label}</span>
      {danger && <span className="ml-auto text-[10px] font-bold text-danger/60 uppercase tracking-widest shrink-0">critical</span>}
    </div>
  );
}

export function VirusInfo() {
  const t = useTranslations('statistics.variantInfo');

  const dangerFacts = [
    { icon: '🚫', label: t('noVaccine') },
    { icon: '⚠️', label: t('noTreatment') },
    { icon: '💀', label: t('cfr') },
  ];

  const facts = [
    { icon: '🕐', label: t('incubation') },
    { icon: '💧', label: t('transmission') },
    { icon: '📋', label: t('previousOutbreaks') },
    { icon: '📍', label: t('discoveredIn') },
    { icon: '🔬', label: t('outbreakEpicenter') },
  ];

  return (
    <div className="rounded-2xl overflow-hidden border border-border">
      {/* Full-bleed image hero */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <Image src={CDC_IMAGES.ebolaTEMBW.src} alt={CDC_IMAGES.ebolaTEMBW.alt} fill className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-darker/95 via-bg-darker/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-darker/80 via-transparent to-transparent" />

        <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-danger/15 border border-danger/25 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-danger" />
                <span className="text-[10px] font-bold text-danger uppercase tracking-widest">{t('noVaccineNoTreatment')}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-text-primary mb-1">{t('title')}</h3>
              <p className="text-sm text-text-secondary">{t('subtitle')}</p>
            </div>
            <div className="hidden md:block text-right shrink-0">
              <p className="text-4xl font-black text-danger leading-none">{CURRENT_OUTBREAK.maxCfr}%</p>
              <p className="text-xs text-text-secondary mt-1">{t('cfr').split(' ').slice(-2).join(' ')}</p>
            </div>
          </div>
        </div>
        <p className="absolute bottom-2 right-3 text-[10px] text-white/20 italic">{t('imageCredit')}</p>
      </div>

      {/* Facts grid */}
      <div className="bg-bg-card p-5 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {dangerFacts.map((f) => <FactRow key={f.label} icon={f.icon} label={f.label} danger />)}
        {facts.map((f) => <FactRow key={f.label} icon={f.icon} label={f.label} />)}
      </div>

      {/* Goma screening image strip */}
      <div className="relative h-40 overflow-hidden border-t border-border">
        <Image src={CDC_IMAGES.gomaScreening.src} alt={CDC_IMAGES.gomaScreening.alt} fill className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-darker/90 to-transparent" />
        <div className="relative h-full flex flex-col justify-center px-6">
          <p className="text-sm font-semibold text-text-primary max-w-xs leading-snug">{CDC_IMAGES.gomaScreening.alt}</p>
          <p className="text-xs text-text-secondary/60 mt-1">{CDC_IMAGES.gomaScreening.credit}</p>
        </div>
      </div>
    </div>
  );
}
