'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { PHEICAlert } from './PHEICAlert';
import { AlertStatusCard } from './AlertStatusCard';
import { KeyMetrics } from './KeyMetrics';
import { EpidemicTimeline } from './EpidemicTimeline';
import { OutbreakHistory } from './OutbreakHistory';
import { CaseBreakdown } from './CaseBreakdown';
import { AffectedZones } from './AffectedZones';
import { VirusInfo } from './VirusInfo';
import { PhoneIcon } from '@/components/icons';
import { CURRENT_OUTBREAK, CDC_IMAGES } from '@/constants/epidemicData';
import { EMERGENCY_CONTACTS } from '@/constants/riskLevels';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
      <span className="text-xs font-bold text-text-muted uppercase tracking-[0.15em] shrink-0">{children}</span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
    </div>
  );
}

export function StatsPage() {
  const t = useTranslations('statistics');
  const tFooter = useTranslations('footer');

  const heroStats = [
    { value: CURRENT_OUTBREAK.stats.suspectedCases,   label: t('keyMetrics.suspectedCases'), color: 'text-danger' },
    { value: CURRENT_OUTBREAK.stats.deaths,            label: t('keyMetrics.deaths'),          color: 'text-text-primary' },
    { value: `${CURRENT_OUTBREAK.cfr}%`,               label: t('heroCaseFatality'),            color: 'text-warning' },
    { value: CURRENT_OUTBREAK.stats.countriesAffected, label: t('heroCountries'),               color: 'text-primary-light' },
  ];

  const emergencyContacts = [
    { label: tFooter('emergencyLine'), number: EMERGENCY_CONTACTS.emergencyLine },
    { label: tFooter('emergencyDPS'),  number: EMERGENCY_CONTACTS.congoDPS },
    { label: tFooter('emergencyWHO'),  number: EMERGENCY_CONTACTS.whoGoma },
  ];

  return (
    <div className="bg-bg-darker">

      {/* HERO */}
      <header className="relative h-[420px] md:h-[500px] overflow-hidden">
        <Image src={CDC_IMAGES.ebolaTEM.src} alt={CDC_IMAGES.ebolaTEM.alt} fill className="object-cover object-center scale-105" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-darker/95 via-bg-darker/80 to-bg-darker/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-darker via-transparent to-transparent" />

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-danger text-white text-xs font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {CURRENT_OUTBREAK.whoStatus}
            </span>
            <span className="text-xs text-text-secondary">{CURRENT_OUTBREAK.pheicDeclaredDate}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight mb-2">{t('title')}</h1>
          <p className="text-text-secondary max-w-xl mb-8 text-sm md:text-base">{t('subtitle')}</p>
          <div className="flex flex-wrap gap-6 md:gap-10">
            {heroStats.map(({ value, label, color }) => (
              <div key={label}>
                <p className={`text-3xl md:text-4xl font-black leading-none ${color}`}>{value}</p>
                <p className="text-xs text-text-secondary mt-1 uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="absolute bottom-2 right-3 text-[10px] text-white/25 italic">{CDC_IMAGES.ebolaTEM.credit}</p>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-16">

        <PHEICAlert />
        <AlertStatusCard />

        <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-border">
          <div className="flex flex-wrap gap-4 text-xs text-text-secondary">
            <span>{t('lastUpdated')}</span>
            <span className="text-border">·</span>
            <span>{t('sources')}</span>
          </div>
          <span className="text-xs text-text-muted italic">{t('estimatedNote')}</span>
        </div>

        <section>
          <SectionLabel>{t('keyMetrics.title')}</SectionLabel>
          <KeyMetrics />
        </section>

        <section>
          <SectionLabel>{t('timeline.title')}</SectionLabel>
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            <div className="xl:col-span-3"><EpidemicTimeline /></div>
            <div className="xl:col-span-2"><CaseBreakdown /></div>
          </div>
        </section>

        <section>
          <SectionLabel>{t('sectionHistorical')}</SectionLabel>
          <OutbreakHistory />
        </section>

        <section>
          <SectionLabel>{t('affectedZones.title')}</SectionLabel>
          <AffectedZones />
        </section>

        <section>
          <SectionLabel>{t('sectionPathogen')}</SectionLabel>
          <VirusInfo />
        </section>

        {/* Emergency contacts */}
        <section className="bg-danger/5 border border-danger/20 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <p className="text-xs font-bold text-danger uppercase tracking-widest mb-2">{t('emergencyTitle')}</p>
              <p className="text-text-secondary text-sm max-w-md">{t('emergencySubtitle')}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {emergencyContacts.map(({ label, number }) => (
                <a key={label} href={`tel:${number}`} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bg-card border border-danger/20 hover:border-danger/50 transition-colors group">
                  <PhoneIcon size={14} className="text-danger" />
                  <div>
                    <p className="text-[10px] text-text-muted uppercase leading-none mb-0.5">{label}</p>
                    <p className="text-sm font-bold text-text-primary">{number}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <p className="text-center text-xs text-text-muted pb-6">{t('sources')} · {t('lastUpdated')}</p>
      </main>
    </div>
  );
}
