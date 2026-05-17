'use client';

import { useTranslations } from 'next-intl';
import { PhoneIcon, ArrowRightIcon, HeartPulseIcon, AlertIcon } from '@/components/icons';
import { EMERGENCY_CONTACTS } from '@/constants/riskLevels';
import { CURRENT_OUTBREAK } from '@/constants/epidemicData';

export function CallToAction() {
  const t = useTranslations('cta');
  const tFooter = useTranslations('footer');

  function scrollToChecker() {
    document.getElementById('symptom-checker')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section id="cta" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-darker via-bg-dark to-danger-dark/30" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] font-black text-danger/[0.04] leading-none select-none pointer-events-none pr-8 hidden lg:block">
        {CURRENT_OUTBREAK.daysActive}
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-danger/5 rounded-full blur-3xl animate-float" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: urgency content ── */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-danger/10 border border-danger/25 mb-8">
              <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
              <span className="text-xs font-bold text-danger uppercase tracking-widest">
                {CURRENT_OUTBREAK.whoStatus} · {CURRENT_OUTBREAK.pheicDeclaredDate}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-text-primary mb-5">
              {t('title').split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-danger">{t('title').split(' ').at(-1)}</span>
            </h2>

            <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-lg">
              {t('subtitle')}
            </p>

            {/* Live stats row */}
            <div className="flex flex-wrap gap-6 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-danger/10 border border-danger/20 flex items-center justify-center">
                  <AlertIcon size={18} className="text-danger" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-danger leading-none">{CURRENT_OUTBREAK.stats.suspectedCases}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{t('suspectedLabel')}</p>
                </div>
              </div>
              <div className="w-px bg-border hidden sm:block" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-bg-card border border-border flex items-center justify-center">
                  <HeartPulseIcon size={18} className="text-text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary leading-none">{CURRENT_OUTBREAK.stats.deaths}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{t('deathsLabel')}</p>
                </div>
              </div>
              <div className="w-px bg-border hidden sm:block" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-bg-card border border-border flex items-center justify-center">
                  <span className="text-sm font-bold text-text-secondary">{CURRENT_OUTBREAK.daysActive}d</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary leading-none">{CURRENT_OUTBREAK.daysActive}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{t('daysActiveLabel')}</p>
                </div>
              </div>
            </div>

            {/* Emergency contacts */}
            <div className="space-y-2">
              {[
                { label: tFooter('emergencyLine'), number: EMERGENCY_CONTACTS.emergencyLine, prominent: true },
                { label: tFooter('emergencyDPS'),  number: EMERGENCY_CONTACTS.congoDPS,      prominent: false },
                { label: tFooter('emergencyWHO'),  number: EMERGENCY_CONTACTS.whoGoma,       prominent: false },
              ].map(({ label, number, prominent }) => (
                <a
                  key={label}
                  href={`tel:${number}`}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-colors group ${
                    prominent
                      ? 'bg-danger/8 border-danger/20 hover:bg-danger/15'
                      : 'bg-bg-card/50 border-border hover:bg-bg-card'
                  }`}
                >
                  <PhoneIcon size={16} className={prominent ? 'text-danger' : 'text-text-secondary'} />
                  <span className="text-sm text-text-secondary">{label}</span>
                  <span className={`ml-auto font-bold text-sm ${prominent ? 'text-danger' : 'text-text-primary'}`}>
                    {number}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: action cards ── */}
          <div className="flex flex-col gap-4">
            {/* Symptom checker card */}
            <button
              onClick={scrollToChecker}
              className="group relative overflow-hidden rounded-2xl border border-secondary/30 bg-gradient-to-br from-secondary/10 to-secondary/5 p-8 text-left hover:border-secondary/60 hover:from-secondary/15 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-secondary/15 border border-secondary/20 flex items-center justify-center mb-5 group-hover:bg-secondary/25 transition-colors">
                  <HeartPulseIcon size={24} className="text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">{t('button')}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">{t('checkerDescription')}</p>
                <div className="flex items-center gap-2 text-secondary font-semibold text-sm">
                  {t('button')}
                  <ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>

            {/* Emergency call card */}
            <a
              href={`tel:${EMERGENCY_CONTACTS.emergencyLine}`}
              className="group relative overflow-hidden rounded-2xl border border-danger/30 bg-gradient-to-br from-danger/10 to-danger/5 p-8 hover:border-danger/60 hover:from-danger/15 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-danger/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-danger/15 border border-danger/25 flex items-center justify-center shrink-0 group-hover:bg-danger/25 transition-colors">
                  <PhoneIcon size={26} className="text-danger" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-danger uppercase tracking-widest mb-1">{t('emergency')}</p>
                  <p className="text-4xl font-black text-text-primary leading-none mb-1">{EMERGENCY_CONTACTS.emergencyLine}</p>
                  <p className="text-sm text-text-secondary">{t('callNow')}</p>
                </div>
                <ArrowRightIcon size={20} className="text-danger/50 group-hover:text-danger group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            </a>

            {/* Variant warning */}
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-warning/5 border border-warning/15">
              <AlertIcon size={16} className="text-warning mt-0.5 shrink-0" />
              <p className="text-xs text-text-secondary leading-relaxed">{t('variantWarning')}</p>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-danger/30 to-transparent" />
    </section>
  );
}
