'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/utils/cn';
import { useSymptomAnalysis } from '@/hooks/useSymptomAnalysis';
import { useGeolocation } from '@/hooks/useGeolocation';
import { EBOLA_SYMPTOMS } from '@/constants/symptoms';
import { EASTERN_CONGO_PROVINCES } from '@/constants/locations';
import { SYMPTOM_CHECKER_STEPS } from '@/constants/config';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { RiskGauge } from '@/components/ui/RiskGauge';
import { Badge } from '@/components/ui/Badge';
import { LocationIcon, PhoneIcon, AlertIcon, ArrowRightIcon, ChevronIcon, CheckIcon, ShieldIcon, SearchIcon } from '@/components/icons';
import { EMERGENCY_CONTACTS } from '@/constants/riskLevels';
import type { RiskLevel } from '@/types';

// ── Icons for step nav ──────────────────────────────────────────
function StepIcon({ step, size = 16 }: { step: number; size?: number }) {
  const icons = [
    <SearchIcon key="s" size={size} />,
    <AlertIcon key="a" size={size} />,
    <LocationIcon key="l" size={size} />,
    <ShieldIcon key="sh" size={size} />,
  ];
  return icons[step] ?? null;
}

// ── Progress stepper ────────────────────────────────────────────
function Stepper({ current, labels }: { current: number; labels: string[] }) {
  return (
    <div className="flex items-center w-full mb-10">
      {labels.map((label, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border-2',
                done   ? 'bg-success border-success text-white'
                       : active ? 'bg-secondary border-secondary text-white shadow-lg shadow-secondary/30'
                       : 'bg-bg-card border-border text-text-muted'
              )}>
                {done ? <CheckIcon size={15} /> : <StepIcon step={i} size={15} />}
              </div>
              <span className={cn(
                'text-[10px] font-bold uppercase tracking-wider hidden sm:block transition-colors',
                active ? 'text-secondary' : done ? 'text-success' : 'text-text-muted'
              )}>
                {label}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div className="flex-1 h-px mx-2 relative overflow-hidden rounded-full bg-border">
                <div className={cn(
                  'absolute inset-y-0 left-0 rounded-full transition-all duration-500',
                  done ? 'bg-success w-full' : 'bg-border w-0'
                )} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Symptom category grouping ───────────────────────────────────
const CATEGORY_ORDER = ['early', 'advanced', 'severe'] as const;
const CATEGORY_LABELS: Record<string, { label: string; color: string; dot: string }> = {
  early:    { label: 'Symptômes précoces',  color: 'text-warning',       dot: 'bg-warning' },
  advanced: { label: 'Symptômes avancés',   color: 'text-secondary',     dot: 'bg-secondary' },
  severe:   { label: 'Symptômes sévères',   color: 'text-danger',        dot: 'bg-danger' },
};

// ── Yes/No toggle ───────────────────────────────────────────────
function YesNo({
  value, onChange, yesLabel, noLabel,
}: { value: boolean; onChange: (v: boolean) => void; yesLabel: string; noLabel: string }) {
  return (
    <div className="flex rounded-xl overflow-hidden border border-border shrink-0">
      <button
        onClick={() => onChange(true)}
        className={cn(
          'px-5 py-2 text-sm font-bold transition-all duration-150 min-h-[40px]',
          value ? 'bg-danger text-white' : 'text-text-muted hover:text-text-primary hover:bg-bg-card'
        )}
      >
        {yesLabel}
      </button>
      <div className="w-px bg-border" />
      <button
        onClick={() => onChange(false)}
        className={cn(
          'px-5 py-2 text-sm font-bold transition-all duration-150 min-h-[40px]',
          !value ? 'bg-bg-card-hover text-text-primary' : 'text-text-muted hover:text-text-primary hover:bg-bg-card'
        )}
      >
        {noLabel}
      </button>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────
export function SymptomChecker() {
  const t  = useTranslations('symptomChecker');
  const tc = useTranslations('common');
  const {
    state, toggleSymptom, updateField, nextStep, prevStep, runAnalysis, resetAnalysis,
  } = useSymptomAnalysis();
  const geo = useGeolocation();

  const stepLabels = [t('stepSymptoms'), t('stepRiskFactors'), t('stepPersonalInfo'), t('stepResults')];
  const selectedProvince = EASTERN_CONGO_PROVINCES.find((p) => p.id === state.province);

  function handleAnalyze() {
    if (geo.coordinates) updateField('coordinates', geo.coordinates);
    runAnalysis();
  }

  const riskLabelKey = (state.riskAssessment?.level ?? 'low') as RiskLevel;
  const riskLabels: Record<RiskLevel, string> = {
    low: t('results.low'), moderate: t('results.moderate'),
    high: t('results.high'), critical: t('results.critical'),
  };
  const riskMessages: Record<RiskLevel, string> = {
    low: t('results.lowMessage'), moderate: t('results.moderateMessage'),
    high: t('results.highMessage'), critical: t('results.criticalMessage'),
  };

  const riskStyle: Record<RiskLevel, string> = {
    low:      'bg-success/8   border-success/25  text-success-light',
    moderate: 'bg-warning/8   border-warning/25  text-warning-light',
    high:     'bg-secondary/8 border-secondary/25 text-secondary-light',
    critical: 'bg-danger/8    border-danger/25   text-danger-light',
  };

  return (
    <section id="symptom-checker" className="relative py-24 md:py-36 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.12] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-72 h-72 bg-primary/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/25 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-black text-secondary uppercase tracking-[0.2em]">Confidentiel · Gratuit · Instantané</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-text-primary mb-4 leading-tight">
            {t('title')}
          </h2>
          <p className="max-w-xl mx-auto text-text-secondary text-base md:text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Card */}
        <div className="relative rounded-3xl border border-border bg-bg-card overflow-hidden shadow-2xl shadow-bg-darker/60">
          {/* Top accent line */}
          <div className="h-1 w-full bg-gradient-to-r from-secondary via-primary-light to-secondary" />

          <div className="p-6 sm:p-8 md:p-10">
            <Stepper current={state.currentStep} labels={stepLabels} />

            {/* ── STEP 1: SYMPTOMS ── */}
            {state.currentStep === SYMPTOM_CHECKER_STEPS.SYMPTOMS && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black text-text-primary">{t('selectSymptoms')}</h3>
                  {state.selectedSymptoms.length > 0 && (
                    <span className="text-xs font-bold text-secondary bg-secondary/10 border border-secondary/25 px-2.5 py-1 rounded-full">
                      {state.selectedSymptoms.length} sélectionné{state.selectedSymptoms.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>

                {CATEGORY_ORDER.map((cat) => {
                  const group = EBOLA_SYMPTOMS.filter((s) => s.category === cat);
                  const cfg   = CATEGORY_LABELS[cat];
                  return (
                    <div key={cat} className="mb-7 last:mb-0">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${cfg.color}`}>{cfg.label}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {group.map((symptom) => {
                          const selected = state.selectedSymptoms.includes(symptom.id);
                          return (
                            <button
                              key={symptom.id}
                              onClick={() => toggleSymptom(symptom.id)}
                              className={cn(
                                'relative flex items-center gap-3 px-4 py-3 rounded-2xl border text-left transition-all duration-150 group',
                                selected
                                  ? cat === 'severe'
                                    ? 'bg-danger/10 border-danger/40 shadow-sm shadow-danger/10'
                                    : cat === 'advanced'
                                      ? 'bg-secondary/10 border-secondary/40'
                                      : 'bg-warning/8 border-warning/35'
                                  : 'bg-bg-darker/60 border-border hover:border-border-light hover:bg-bg-card-hover'
                              )}
                            >
                              <span className="text-xl leading-none shrink-0">{symptom.icon}</span>
                              <span className={cn(
                                'text-xs font-semibold leading-tight',
                                selected ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'
                              )}>
                                {symptom.name}
                              </span>
                              {selected && (
                                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-secondary flex items-center justify-center">
                                  <CheckIcon size={9} className="text-white" />
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Duration slider */}
                <div className="mt-8 p-5 rounded-2xl bg-bg-darker/60 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-text-primary">{t('symptomDuration')}</label>
                    <span className="text-2xl font-black text-secondary tabular-nums">
                      {state.durationDays} <span className="text-sm font-semibold text-text-muted">{t('days')}</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={21}
                    value={state.durationDays}
                    onChange={(e) => updateField('durationDays', Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer accent-secondary bg-bg-card"
                  />
                  <div className="flex justify-between text-[10px] text-text-muted mt-1.5 font-medium">
                    <span>1 jour</span>
                    <span>7 jours</span>
                    <span>14 jours</span>
                    <span>21 jours</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8">
                  <p className="text-xs text-text-muted">
                    {state.selectedSymptoms.length === 0
                      ? 'Sélectionnez au moins un symptôme pour continuer'
                      : `${state.selectedSymptoms.length} symptôme${state.selectedSymptoms.length > 1 ? 's' : ''} sélectionné${state.selectedSymptoms.length > 1 ? 's' : ''}`}
                  </p>
                  <button
                    onClick={nextStep}
                    disabled={state.selectedSymptoms.length === 0}
                    className={cn(
                      'flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200',
                      state.selectedSymptoms.length > 0
                        ? 'bg-secondary text-white hover:bg-secondary/80 shadow-lg shadow-secondary/25 hover:scale-105'
                        : 'bg-bg-darker text-text-muted cursor-not-allowed'
                    )}
                  >
                    {tc('next')} <ArrowRightIcon size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: RISK FACTORS ── */}
            {state.currentStep === SYMPTOM_CHECKER_STEPS.RISK_FACTORS && (
              <div className="animate-fade-in">
                <h3 className="text-xl font-black text-text-primary mb-2">{t('stepRiskFactors')}</h3>
                <p className="text-sm text-text-secondary mb-8">Répondez honnêtement — ces informations affectent directement votre évaluation de risque.</p>

                <div className="flex flex-col gap-4">
                  {[
                    {
                      key: 'contactWithInfected' as const,
                      icon: '🤝',
                      label: t('contactInfected'),
                      weight: 'Risque élevé',
                      weightClass: 'text-danger bg-danger/8 border-danger/20',
                    },
                    {
                      key: 'contactWithAnimals' as const,
                      icon: '🦇',
                      label: t('contactAnimals'),
                      weight: 'Risque modéré',
                      weightClass: 'text-warning bg-warning/8 border-warning/20',
                    },
                    {
                      key: 'travelToAffectedArea' as const,
                      icon: '✈️',
                      label: t('travelAffected'),
                      weight: 'Risque significatif',
                      weightClass: 'text-secondary bg-secondary/8 border-secondary/20',
                    },
                  ].map((factor) => (
                    <div
                      key={factor.key}
                      className={cn(
                        'flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl border transition-all duration-200',
                        state[factor.key]
                          ? 'bg-danger/6 border-danger/25'
                          : 'bg-bg-darker/60 border-border'
                      )}
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <span className="text-2xl shrink-0 leading-none mt-0.5">{factor.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-text-primary leading-snug">{factor.label}</p>
                          <span className={`inline-block mt-1.5 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${factor.weightClass}`}>
                            {factor.weight}
                          </span>
                        </div>
                      </div>
                      <YesNo
                        value={state[factor.key]}
                        onChange={(v) => updateField(factor.key, v)}
                        yesLabel={tc('yes')}
                        noLabel={tc('no')}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-10">
                  <button
                    onClick={prevStep}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-text-secondary hover:text-text-primary hover:bg-bg-card transition-all border border-transparent hover:border-border"
                  >
                    <ChevronIcon size={16} direction="left" /> {tc('previous')}
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-secondary text-white hover:bg-secondary/80 shadow-lg shadow-secondary/25 hover:scale-105 transition-all duration-200"
                  >
                    {tc('next')} <ArrowRightIcon size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: PERSONAL INFO ── */}
            {state.currentStep === SYMPTOM_CHECKER_STEPS.PERSONAL_INFO && (
              <div className="animate-fade-in">
                <h3 className="text-xl font-black text-text-primary mb-2">{t('stepPersonalInfo')}</h3>
                <p className="text-sm text-text-secondary mb-7">Ces informations permettent aux équipes de santé de vous contacter si nécessaire.</p>

                {/* Privacy toggle */}
                <div className="mb-7">
                  <p className="text-xs font-black text-text-muted uppercase tracking-[0.2em] mb-3">Niveau de confidentialité</p>
                  <div className="grid grid-cols-3 gap-2 p-1.5 bg-bg-darker rounded-2xl border border-border">
                    {([
                      { v: 'anonymous', label: t('stayAnonymous'),  icon: '🕵️', desc: '100% anonyme' },
                      { v: 'hidden',    label: t('hiddenProfile'),   icon: '🔒', desc: 'Profil masqué' },
                      { v: 'visible',   label: t('visibleProfile'),  icon: '👤', desc: 'Profil visible' },
                    ] as const).map(({ v, label, icon, desc }) => (
                      <button
                        key={v}
                        onClick={() => updateField('profileVisibility', v)}
                        className={cn(
                          'flex flex-col items-center gap-1 px-3 py-3 rounded-xl text-xs font-bold transition-all duration-200',
                          state.profileVisibility === v
                            ? 'bg-secondary text-white shadow-lg shadow-secondary/20'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
                        )}
                      >
                        <span className="text-lg leading-none">{icon}</span>
                        <span className="font-black text-center leading-tight">{label}</span>
                        <span className={cn('text-[9px] font-medium', state.profileVisibility === v ? 'text-white/70' : 'text-text-muted')}>{desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & phone (non-anonymous) */}
                {state.profileVisibility !== 'anonymous' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 animate-fade-in">
                    <Input
                      label={t('fullName')}
                      value={state.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      placeholder="Jean-Pierre Kabila"
                    />
                    <Input
                      label={t('phoneNumber')}
                      value={state.phoneNumber}
                      onChange={(e) => updateField('phoneNumber', e.target.value)}
                      placeholder="+243 99 123 4567"
                      leftIcon={<PhoneIcon size={16} />}
                      type="tel"
                    />
                  </div>
                )}

                {/* Location */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label={t('province')}
                      value={state.province}
                      onChange={(e) => { updateField('province', e.target.value); updateField('city', ''); }}
                      placeholder={t('selectProvince')}
                      options={EASTERN_CONGO_PROVINCES.map((p) => ({ value: p.id, label: p.name }))}
                    />
                    {selectedProvince && (
                      <Select
                        label={t('city')}
                        value={state.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        placeholder={t('selectCity')}
                        options={selectedProvince.cities.map((c) => ({ value: c, label: c }))}
                        className="animate-fade-in"
                      />
                    )}
                  </div>

                  <Input
                    label={t('locationDetails')}
                    value={state.locationDetails}
                    onChange={(e) => updateField('locationDetails', e.target.value)}
                    placeholder={t('locationDetailsPlaceholder')}
                    leftIcon={<LocationIcon size={16} />}
                  />

                  <button
                    onClick={() => geo.requestLocation()}
                    disabled={geo.isLoading}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200',
                      geo.coordinates
                        ? 'bg-success/10 border-success/30 text-success-light'
                        : 'bg-bg-darker border-border text-text-secondary hover:text-text-primary hover:border-border-light'
                    )}
                  >
                    <LocationIcon size={16} />
                    {geo.isLoading ? t('locating') : geo.coordinates ? t('locationFound') : t('useMyLocation')}
                    {geo.coordinates && (
                      <span className="ml-auto text-[10px] font-mono text-text-muted">
                        {geo.coordinates.latitude.toFixed(3)}, {geo.coordinates.longitude.toFixed(3)}
                      </span>
                    )}
                  </button>
                </div>

                <div className="flex justify-between mt-10">
                  <button
                    onClick={prevStep}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-text-secondary hover:text-text-primary hover:bg-bg-card transition-all border border-transparent hover:border-border"
                  >
                    <ChevronIcon size={16} direction="left" /> {tc('previous')}
                  </button>
                  <button
                    onClick={handleAnalyze}
                    disabled={state.isAnalyzing}
                    className="flex items-center gap-2 px-7 py-3 rounded-xl font-black text-sm bg-secondary text-white hover:bg-secondary/80 shadow-lg shadow-secondary/25 hover:scale-105 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {state.isAnalyzing ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        {t('analyzing')}
                      </>
                    ) : (
                      <>{t('analyze')} <ArrowRightIcon size={16} /></>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 4: RESULTS ── */}
            {state.currentStep === SYMPTOM_CHECKER_STEPS.RESULTS && state.riskAssessment && (
              <div className="animate-fade-in">
                <div className="text-center mb-8">
                  <p className="text-xs font-black text-text-muted uppercase tracking-[0.2em] mb-2">{t('results.title')}</p>
                  <p className="text-text-secondary text-sm">Basé sur {state.selectedSymptoms.length} symptôme{state.selectedSymptoms.length > 1 ? 's' : ''} et vos facteurs de risque</p>
                </div>

                {/* Gauge + badge */}
                <div className="flex flex-col items-center gap-4 mb-8">
                  <RiskGauge score={state.riskAssessment.score} level={state.riskAssessment.level} size={200} />
                  <Badge level={state.riskAssessment.level} label={riskLabels[riskLabelKey]} className="text-base px-5 py-2" />
                </div>

                {/* Message */}
                <div className={cn('p-5 rounded-2xl border mb-6 text-sm leading-relaxed text-center', riskStyle[riskLabelKey])}>
                  {riskMessages[riskLabelKey]}
                </div>

                {/* Emergency (high/critical) */}
                {state.riskAssessment.requiresImmediateAction && (
                  <a
                    href={`tel:${EMERGENCY_CONTACTS.emergencyLine}`}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-danger/10 border border-danger/35 hover:bg-danger/15 transition-colors mb-6 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-danger/20 border border-danger/30 flex items-center justify-center shrink-0">
                      <PhoneIcon size={22} className="text-danger" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-danger uppercase tracking-widest mb-0.5">{t('results.emergencyCall')}</p>
                      <p className="text-3xl font-black text-danger leading-none">{EMERGENCY_CONTACTS.emergencyLine}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-danger/60 group-hover:text-danger transition-colors text-sm font-semibold shrink-0">
                      Appeler <ArrowRightIcon size={14} />
                    </div>
                  </a>
                )}

                {/* Alert note */}
                {state.riskAssessment.requiresImmediateAction && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-danger/6 border border-danger/20 mb-6">
                    <AlertIcon size={16} className="text-danger shrink-0 mt-0.5" />
                    <p className="text-xs text-danger/80 leading-relaxed">
                      Ne vous déplacez pas seul. Évitez tout contact physique. Appelez le 101 immédiatement.
                    </p>
                  </div>
                )}

                <div className="flex justify-center">
                  <button
                    onClick={resetAnalysis}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border border-border text-text-secondary hover:text-text-primary hover:border-border-light hover:bg-bg-card transition-all duration-200"
                  >
                    {t('results.newCheck')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trust note below */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-text-muted">
          {[
            { icon: '🔒', text: 'Données chiffrées & anonymisées' },
            { icon: '⚡', text: 'Résultats en moins de 10 secondes' },
            { icon: '🏥', text: 'Protocole OMS & Africa CDC' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-1.5">
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
