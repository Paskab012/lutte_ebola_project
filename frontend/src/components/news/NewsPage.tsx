'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { TwitterTimeline } from './TwitterTimeline';
import {
  RadioIcon,
  ExternalLinkIcon,
  WhatsAppIcon,
  UsersIcon,
  PhoneIcon,
} from '@/components/icons';
import { COMMUNITY_LINKS } from '@/constants/config';
import { CURRENT_OUTBREAK, CDC_IMAGES } from '@/constants/epidemicData';
import { EMERGENCY_CONTACTS } from '@/constants/riskLevels';
import type { Locale } from '@/types';

interface NewsPageProps {
  readonly locale?: Locale;
}

const TICKER_ITEMS = [
  'PHEIC déclarée par l\'OMS le 17 mai 2026 — 2e niveau d\'alerte le plus élevé',
  '336 cas suspects · 88 décès · 26,2 % létalité — Province d\'Ituri, RDC',
  'Variant Bundibugyo : aucun vaccin approuvé · aucun traitement spécifique',
  'Nouveau foyer confirmé à Mongbwalu — équipes MSF déployées',
  'Africa CDC renforce la surveillance aux frontières RDC-Ouganda',
  'L\'OMS déploie une équipe d\'intervention rapide à Bunia',
];

function SectionDivider({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
      <div className="flex items-center gap-2 shrink-0 px-4 py-1.5 border border-border rounded-full bg-bg-card">
        {icon}
        <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">{label}</span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
    </div>
  );
}

export function NewsPage({ locale = 'fr' }: NewsPageProps) {
  const t = useTranslations('news');

  return (
    <div className="min-h-screen bg-bg-darker">
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker { animation: ticker 40s linear infinite; }
        @keyframes breathe {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50%       { opacity: 0.3;  transform: scale(1.08); }
        }
        .animate-breathe { animation: breathe 4s ease-in-out infinite; }
      `}</style>

      {/* ── BREAKING NEWS TICKER ── */}
      <div className="relative z-50 bg-danger overflow-hidden h-9 flex items-center">
        <div className="shrink-0 px-5 h-full flex items-center bg-black/30 border-r border-white/20 gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Breaking</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker flex gap-20 whitespace-nowrap">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="text-[11px] font-semibold text-white/90 shrink-0">
                {item}
                <span className="mx-8 text-white/30">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── HERO — full-bleed CDC TEM ── */}
      <header className="relative h-[540px] md:h-[640px] overflow-hidden">
        <Image
          src={CDC_IMAGES.ebolaTEM.src}
          alt={CDC_IMAGES.ebolaTEM.alt}
          fill
          className="object-cover object-center scale-110"
          priority
        />
        {/* Layered dramatic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-darker via-bg-darker/90 to-bg-darker/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-darker via-transparent to-bg-darker/60" />
        {/* Red vignette glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(178,34,34,0.15),transparent_60%)]" />

        {/* Decorative grid lines */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-10">
          {/* Top badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-danger text-white text-[11px] font-black uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              PHEIC · OMS {CURRENT_OUTBREAK.pheicDeclaredDate}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 text-white/70 text-[11px] font-semibold backdrop-blur-sm">
              Épidémie #{CURRENT_OUTBREAK.outbreakNumber} en RDC
            </span>
          </div>

          {/* Main headline */}
          <div className="max-w-2xl">
            <p className="text-xs font-black text-danger uppercase tracking-[0.25em] mb-3">{t('title')}</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] mb-4">
              Virus Ebola<br />
              <span className="text-secondary">Bundibugyo</span><br />
              <span className="text-text-secondary text-3xl sm:text-4xl">Province d&apos;Ituri, RDC</span>
            </h1>
            <p className="text-text-secondary text-sm md:text-base max-w-lg leading-relaxed">{t('subtitle')}</p>
          </div>

          {/* Live stats bar */}
          <div className="flex flex-wrap gap-px rounded-2xl overflow-hidden border border-white/10">
            {[
              { value: CURRENT_OUTBREAK.stats.suspectedCases, label: 'Cas suspects', color: 'text-danger' },
              { value: CURRENT_OUTBREAK.stats.deaths,         label: 'Décès',         color: 'text-text-primary' },
              { value: `${CURRENT_OUTBREAK.cfr}%`,            label: 'Létalité',      color: 'text-warning' },
              { value: CURRENT_OUTBREAK.daysActive,           label: 'Jours actifs',  color: 'text-secondary' },
            ].map(({ value, label, color }) => (
              <div key={label} className="flex-1 min-w-[100px] bg-bg-darker/80 backdrop-blur-sm px-5 py-3.5 border-r border-white/10 last:border-r-0">
                <p className={`text-2xl md:text-3xl font-black leading-none ${color}`}>{value}</p>
                <p className="text-[10px] text-text-muted uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="absolute bottom-3 right-4 text-[10px] text-white/20 italic">{CDC_IMAGES.ebolaTEM.credit}</p>
      </header>

      {/* ── CRISIS UPDATES ── */}
      <div className="border-b border-border bg-bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {[
              { time: '09:37', badge: 'CRITIQUE', badgeClass: 'bg-danger/15 text-danger border-danger/30', text: 'Nouveau foyer confirmé à Mongbwalu — équipes MSF déployées sur le terrain', dot: 'bg-danger' },
              { time: '07:15', badge: 'OMS',       badgeClass: 'bg-primary/10 text-primary-light border-primary/25', text: 'L\'OMS renforce son équipe de réponse rapide à Bunia, Ituri', dot: 'bg-secondary' },
              { time: 'Hier',  badge: 'Africa CDC', badgeClass: 'bg-secondary/10 text-secondary border-secondary/25', text: '500 kits de protection envoyés aux équipes de santé en Ituri', dot: 'bg-text-muted' },
            ].map(({ time, badge, badgeClass, text, dot }) => (
              <div key={time} className="flex gap-4 px-5 py-4 sm:first:pl-0 sm:last:pr-0 first:pt-0 last:pb-0 sm:first:pt-4 sm:last:pb-4">
                <div className="flex flex-col items-center gap-2 shrink-0 pt-0.5">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
                  <div className="w-px flex-1 bg-border/40" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${badgeClass}`}>{badge}</span>
                    <span className="text-[10px] text-text-muted">{time}</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-snug">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-20">

        {/* ── LIVE FEEDS (Twitter/X) ── */}
        <section>
          <SectionDivider
            label={t('twitterSectionTitle')}
            icon={<span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TwitterTimeline handle="WHO" label={t('twitterWHO')} height={540} />
            <TwitterTimeline handle="AfricaCDCgov" label={t('twitterAfricaCDC')} height={540} />
          </div>

          <p className="text-center text-xs text-text-muted mt-4">{t('twitterSectionSubtitle')}</p>
        </section>

        {/* ── RADIO OKAPI — image background ── */}
        <section>
          <SectionDivider
            label={t('radioSection')}
            icon={<RadioIcon size={11} className="text-secondary" />}
          />

          <div className="relative rounded-3xl overflow-hidden">
            {/* Background: Goma screening photo */}
            <div className="absolute inset-0">
              <Image
                src={CDC_IMAGES.gomaScreening.src}
                alt={CDC_IMAGES.gomaScreening.alt}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-bg-darker via-bg-darker/95 to-bg-darker/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-darker/80 to-transparent" />
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-0 min-h-[380px]">
              {/* Left: Radio Okapi card */}
              <div className="lg:col-span-3 p-8 md:p-10 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-bg-darker/80 backdrop-blur-sm border border-border flex items-center justify-center">
                        <RadioIcon size={26} className="text-secondary" />
                      </div>
                      {/* Signal ring */}
                      <div className="absolute -inset-1 rounded-2xl border border-secondary/30 animate-ping opacity-30" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white">Radio Okapi</p>
                      <p className="text-xs text-secondary font-semibold">MONUSCO · Nations Unies · DRC</p>
                    </div>
                  </div>

                  <p className="text-base font-semibold text-white/90 mb-2 max-w-md">{t('radioSubtitle')}</p>
                  <p className="text-sm text-white/60 leading-relaxed max-w-md">{t('radioDescription')}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {['Français', 'Kiswahili', 'Lingala'].map((lang) => (
                    <span key={lang} className="text-xs px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/70 font-medium">{lang}</span>
                  ))}
                  <a
                    href={COMMUNITY_LINKS.radioOkapi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 bg-secondary hover:bg-secondary/80 text-white text-sm font-bold rounded-xl transition-all duration-200 hover:scale-105"
                  >
                    <RadioIcon size={14} />
                    {t('radioVisit')}
                    <ExternalLinkIcon size={11} />
                  </a>
                </div>
              </div>

              {/* Right: latest updates panel */}
              <div className="lg:col-span-2 bg-bg-darker/70 backdrop-blur-md border-t border-white/10 lg:border-t-0 lg:border-l lg:border-white/10">
                <div className="p-6 md:p-8 flex flex-col gap-4 h-full">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
                    <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">{t('liveUpdates')}</span>
                  </div>

                  <div className="flex flex-col gap-4 flex-1">
                    {[
                      { time: '09:37', text: 'Alerte foyer Mongbwalu — Province d\'Ituri', level: 'danger' },
                      { time: '07:15', text: 'Renforcement équipes OMS à Bunia', level: 'secondary' },
                      { time: '16 mai', text: 'MSF ouvre un centre de traitement à Rwampara', level: 'muted' },
                      { time: '15 mai', text: 'Africa CDC : épidémie officielle déclarée', level: 'muted' },
                    ].map(({ time, text, level }) => (
                      <div key={time} className="flex gap-3">
                        <div className="flex flex-col items-center gap-1 shrink-0 pt-1">
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${level === 'danger' ? 'bg-danger' : level === 'secondary' ? 'bg-secondary' : 'bg-text-muted'}`} />
                          <div className="w-px flex-1 bg-border/30" />
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary leading-snug">{text}</p>
                          <p className="text-[10px] text-text-muted mt-0.5 font-mono">{time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <a
                    href={COMMUNITY_LINKS.radioOkapi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/10 border border-secondary/20 hover:border-secondary/40 transition-colors group"
                  >
                    <span className="text-sm font-semibold text-text-primary">radiookapi.net</span>
                    <ExternalLinkIcon size={14} className="text-text-muted group-hover:text-secondary transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            <p className="absolute bottom-3 right-4 text-[10px] text-white/15 italic">{CDC_IMAGES.gomaScreening.credit}</p>
          </div>
        </section>

        {/* ── OFFICIAL SOURCES ── */}
        <section>
          <SectionDivider label={t('officialSources')} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                acronym: 'OMS',
                name: t('sourceWHO'),
                desc: t('sourceWHODesc'),
                href: COMMUNITY_LINKS.whoEbola,
                accentClass: 'bg-[#009EDB]/10 border-l-[#009EDB]',
                acronymClass: 'text-[#009EDB]/10',
                tagClass: 'bg-[#009EDB]/10 text-[#009EDB] border-[#009EDB]/25',
              },
              {
                acronym: 'CDC',
                name: t('sourceAfricaCDC'),
                desc: t('sourceAfricaCDCDesc'),
                href: COMMUNITY_LINKS.africaCdc,
                accentClass: 'bg-secondary/5 border-l-secondary',
                acronymClass: 'text-secondary/10',
                tagClass: 'bg-secondary/10 text-secondary border-secondary/25',
              },
              {
                acronym: 'MSF',
                name: t('sourceMSF'),
                desc: t('sourceMSFDesc'),
                href: COMMUNITY_LINKS.msf,
                accentClass: 'bg-warning/5 border-l-warning',
                acronymClass: 'text-warning/10',
                tagClass: 'bg-warning/10 text-warning border-warning/25',
              },
              {
                acronym: 'UN',
                name: t('sourceUNICEF'),
                desc: t('sourceUNICEFDesc'),
                href: COMMUNITY_LINKS.unicefDrc,
                accentClass: 'bg-success/5 border-l-success',
                acronymClass: 'text-success/10',
                tagClass: 'bg-success/10 text-success border-success/25',
              },
            ].map(({ acronym, name, desc, href, accentClass, acronymClass, tagClass }) => (
              <a
                key={acronym}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden flex flex-col gap-3 p-5 bg-bg-card border-l-2 border border-border rounded-2xl hover:shadow-lg transition-all duration-200 ${accentClass}`}
              >
                {/* Ghost acronym watermark */}
                <span className={`absolute right-4 top-2 text-6xl font-black pointer-events-none select-none ${acronymClass}`}>{acronym}</span>
                <div className="relative">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${tagClass}`}>{acronym}</span>
                </div>
                <p className="text-sm font-bold text-text-primary group-hover:text-secondary transition-colors relative">{name}</p>
                <p className="text-xs text-text-secondary leading-relaxed flex-1 relative">{desc}</p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary relative">
                  {t('visitSource')} <ExternalLinkIcon size={10} />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── WHATSAPP COMMUNITY ── full-bleed with TEM background ── */}
        <section className="relative rounded-3xl overflow-hidden">
          {/* Background: B&W TEM image */}
          <div className="absolute inset-0">
            <Image
              src={CDC_IMAGES.ebolaTEMBW.src}
              alt={CDC_IMAGES.ebolaTEMBW.alt}
              fill
              className="object-cover object-center opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/15 via-bg-card/95 to-bg-card" />
          </div>

          <div className="relative p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10">
              {/* Left */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative w-16 h-16 rounded-3xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center">
                    <WhatsAppIcon size={30} className="text-[#25D366]" />
                    <div className="absolute inset-0 rounded-3xl border border-[#25D366]/20 animate-breathe" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-text-primary">{t('communityTitle')}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <UsersIcon size={12} className="text-[#25D366]" />
                      <span className="text-xs text-[#25D366] font-semibold">350+ {t('memberCount')} · actifs 24/7</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed max-w-lg mb-5">{t('communitySubtitle')}</p>

                <div className="flex flex-wrap gap-2">
                  {['Alertes en direct', 'Coordination terrain', 'Ressources santé', 'Goma & Ituri', 'Ouganda'].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-bg-darker border border-border text-text-muted">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Right: action panel */}
              <div className="flex flex-col gap-4 shrink-0 w-full lg:w-72">
                <a
                  href={COMMUNITY_LINKS.whatsappGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black text-base transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl shadow-[#25D366]/25"
                >
                  <WhatsAppIcon size={22} />
                  {t('communityJoin')}
                </a>

                {/* Emergency contacts */}
                <div className="bg-bg-darker/80 backdrop-blur-sm border border-border rounded-2xl p-4 flex flex-col gap-2.5">
                  <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-0.5">Urgences médicales</p>
                  {[
                    { label: 'Ligne d\'urgence', number: EMERGENCY_CONTACTS.emergencyLine },
                    { label: 'DPS Ituri',        number: EMERGENCY_CONTACTS.congoDPS },
                  ].map(({ label, number }) => (
                    <a key={label} href={`tel:${number}`} className="flex items-center gap-2.5 group/tel">
                      <div className="w-7 h-7 rounded-lg bg-danger/10 border border-danger/20 flex items-center justify-center shrink-0">
                        <PhoneIcon size={12} className="text-danger" />
                      </div>
                      <div>
                        <p className="text-[10px] text-text-muted uppercase leading-none">{label}</p>
                        <p className="text-sm font-black text-text-primary group-hover/tel:text-danger transition-colors">{number}</p>
                      </div>
                    </a>
                  ))}
                </div>

                <p className="text-[10px] text-text-muted text-center leading-relaxed px-2">{t('communityDisclaimer')}</p>
              </div>
            </div>
          </div>
        </section>

        <p className="text-center text-xs text-text-muted pb-6">
          Sources : OMS · Africa CDC · Radio Okapi · MSF · UNICEF RDC &nbsp;·&nbsp; Mis à jour le {CURRENT_OUTBREAK.lastUpdateDate}
        </p>
      </main>
    </div>
  );
}
