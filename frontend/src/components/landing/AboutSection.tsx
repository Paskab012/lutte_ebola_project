'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SearchIcon, AlertIcon, ShieldIcon } from '@/components/icons';
import { CDC_IMAGES, CURRENT_OUTBREAK } from '@/constants/epidemicData';

type FeatureKey = 'detection' | 'alert' | 'protection';

function ScanLine() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-light/60 to-transparent"
        style={{ animation: 'scanline 3s linear infinite' }}
      />
    </div>
  );
}

function AlertVisual({ t }: { t: ReturnType<typeof useTranslations<'about'>> }) {
  const alerts = [
    { levelKey: 'alertCritical' as const, zone: 'Mongbwalu, Ituri', timeKey: 'alert1Time' as const, color: 'border-danger bg-danger/10 text-danger' },
    { levelKey: 'alertHigh' as const,     zone: 'Bunia, Ituri',     timeKey: 'alert2Time' as const, color: 'border-warning bg-warning/8 text-warning' },
    { levelKey: 'alertModerate' as const,  zone: 'Nord-Kivu',        timeKey: 'alert3Time' as const, color: 'border-primary-light bg-primary/8 text-primary-light' },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-center gap-3 p-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
        <span className="text-xs font-bold text-danger uppercase tracking-widest">{t('liveAlerts')}</span>
      </div>
      {alerts.map((a) => (
        <div key={a.zone} className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${a.color}`}>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black uppercase tracking-wider">{t(a.levelKey)}</p>
            <p className="text-sm font-semibold text-text-primary truncate mt-0.5">{a.zone}</p>
          </div>
          <p className="text-xs text-text-muted shrink-0">{t(a.timeKey)}</p>
        </div>
      ))}
      <div className="mt-2 px-4 py-2.5 rounded-xl bg-bg-darker/50 border border-border text-center">
        <p className="text-xs text-text-muted">
          <span className="font-bold text-secondary">{CURRENT_OUTBREAK.stats.suspectedCases}</span>{' '}
          {t('casesMonitored')}
        </p>
      </div>
    </div>
  );
}

function DetectionVisual({ t }: { t: ReturnType<typeof useTranslations<'about'>> }) {
  const bars = [72, 45, 88, 31, 67, 92, 55];
  const symptoms = [
    t('symptomFever'),
    t('symptomHeadache'),
    t('symptomMyalgia'),
    t('symptomFatigue'),
  ];
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image src={CDC_IMAGES.ebolaTEM.src} alt={CDC_IMAGES.ebolaTEM.alt} fill className="object-cover object-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-bg-darker/60 to-bg-darker/80" />
      <ScanLine />
      <div className="relative h-full flex flex-col justify-center gap-5 p-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-light animate-pulse" />
          <span className="text-xs font-bold text-primary-light uppercase tracking-widest">{t('analyzing')}</span>
        </div>
        <div className="flex items-end gap-1 h-14">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-primary-light/60" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {symptoms.map((s) => (
            <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-primary/20 border border-primary/30 text-primary-light font-medium">
              {s}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-danger/10 border border-danger/25">
          <span className="w-2 h-2 rounded-full bg-danger shrink-0" />
          <p className="text-sm font-bold text-danger">{t('riskScore')}: <span className="text-lg">78 / 100</span></p>
        </div>
      </div>
    </div>
  );
}

function ProtectionVisual({ t }: { t: ReturnType<typeof useTranslations<'about'>> }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image src={CDC_IMAGES.gomaScreening.src} alt={CDC_IMAGES.gomaScreening.alt} fill className="object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-darker/90 via-bg-darker/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-success/10" />
      <div className="absolute bottom-5 left-5 right-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {[
            { label: `${CURRENT_OUTBREAK.stats.countriesAffected} ${t('countriesLabel')}`, color: 'bg-success/15 border-success/30 text-success-light' },
            { label: `6 ${t('zonesLabel')}`, color: 'bg-primary/15 border-primary/30 text-primary-light' },
            { label: t('activeSurveillance'), color: 'bg-secondary/15 border-secondary/30 text-secondary' },
          ].map((tag) => (
            <span key={tag.label} className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${tag.color}`}>
              {tag.label}
            </span>
          ))}
        </div>
        <p className="text-xs text-text-secondary/70 italic">{CDC_IMAGES.gomaScreening.credit}</p>
      </div>
    </div>
  );
}

export function AboutSection() {
  const t = useTranslations('about');
  const [active, setActive] = useState<FeatureKey>('detection');

  const features: {
    key: FeatureKey;
    step: string;
    icon: React.ReactNode;
    titleKey: 'detection.title' | 'alert.title' | 'protection.title';
    descKey: 'detection.description' | 'alert.description' | 'protection.description';
    accent: string;
    bar: string;
    glow: string;
  }[] = [
    { key: 'detection', step: '01', icon: <SearchIcon size={22} />, titleKey: 'detection.title', descKey: 'detection.description', accent: 'text-primary-light', bar: 'bg-primary-light', glow: 'shadow-primary/20' },
    { key: 'alert',     step: '02', icon: <AlertIcon size={22} />,  titleKey: 'alert.title',     descKey: 'alert.description',     accent: 'text-secondary',    bar: 'bg-secondary',    glow: 'shadow-secondary/20' },
    { key: 'protection',step: '03', icon: <ShieldIcon size={22} />, titleKey: 'protection.title',descKey: 'protection.description',accent: 'text-success-light', bar: 'bg-success',      glow: 'shadow-success/20' },
  ];

  const visuals: Record<FeatureKey, React.ReactNode> = {
    detection: <DetectionVisual t={t} />,
    alert:     <AlertVisual t={t} />,
    protection:<ProtectionVisual t={t} />,
  };

  return (
    <section id="about" className="py-24 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.15]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/4 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-1/6 w-64 h-64 bg-secondary/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
            <span className="text-xs font-bold text-primary-light uppercase tracking-widest">{t('missionLabel')}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-primary leading-tight mb-5">
            {t('headlineMain')}<br className="hidden md:block" />
            <span className="gradient-text"> {t('headlineHighlight')}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-text-secondary leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Interactive feature panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-16 items-stretch">

          {/* Visual panel */}
          <div className="relative rounded-2xl overflow-hidden border border-border bg-bg-card min-h-[380px] lg:min-h-0">
            <div key={active} className="absolute inset-0 animate-fade-in">
              {visuals[active]}
            </div>
            <div className="absolute top-4 left-4 z-10">
              <span className="text-6xl font-black text-white/5 leading-none select-none">
                {features.find((f) => f.key === active)?.step}
              </span>
            </div>
          </div>

          {/* Feature list */}
          <div className="flex flex-col gap-3">
            {features.map((feature) => {
              const isActive = active === feature.key;
              return (
                <button
                  key={feature.key}
                  onClick={() => setActive(feature.key)}
                  className={`group relative text-left rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isActive
                      ? `bg-bg-elevated border-border-light shadow-xl ${feature.glow}`
                      : 'bg-bg-card border-border hover:bg-bg-card-hover hover:border-border-light'
                  }`}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300 ${isActive ? feature.bar : 'bg-transparent'}`} />
                  <div className="px-6 py-5">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 flex flex-col items-center gap-1.5">
                        <span className={`text-xs font-black tabular-nums transition-colors ${isActive ? feature.accent : 'text-text-muted'}`}>
                          {feature.step}
                        </span>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? `bg-gradient-to-br from-bg-darker to-bg-dark border border-border-light ${feature.accent}`
                            : 'bg-bg-darker border border-border text-text-muted group-hover:text-text-secondary'
                        }`}>
                          {feature.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <h3 className={`text-base font-bold transition-colors ${isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                          {t(feature.titleKey)}
                        </h3>
                        <div className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-24 mt-2 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <p className="text-sm text-text-secondary leading-relaxed">{t(feature.descKey)}</p>
                        </div>
                      </div>
                      <svg
                        className={`shrink-0 w-4 h-4 mt-3 transition-all duration-300 ${isActive ? `${feature.accent} rotate-90` : 'text-text-muted group-hover:text-text-secondary'}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                      >
                        <polyline points="6,9 12,15 18,9" />
                      </svg>
                    </div>
                    {isActive && (
                      <div className="mt-4 h-px bg-border overflow-hidden rounded-full">
                        <div className={`h-full ${feature.bar} rounded-full animate-shimmer`} style={{ width: '100%' }} />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes scanline {
          0%   { top: -2px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
