'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { VirusIcon, PhoneIcon, LocationIcon, ExternalLinkIcon, ArrowRightIcon } from '@/components/icons';
import { EMERGENCY_CONTACTS } from '@/constants/riskLevels';
import { CURRENT_OUTBREAK, CDC_IMAGES } from '@/constants/epidemicData';
import { COMMUNITY_LINKS } from '@/constants/config';
import type { Locale } from '@/types';

interface FooterProps {
  readonly locale?: Locale;
}

function EmailIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <polyline points="2,7 12,13 22,7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Footer({ locale = 'fr' }: FooterProps) {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { key: 'home' as const,    sectionId: 'hero',            label: tNav('home') },
    { key: 'about' as const,   sectionId: 'about',           label: tNav('about') },
    { key: 'check' as const,   sectionId: 'symptom-checker', label: tNav('check') },
    { key: 'contact' as const, sectionId: 'cta',             label: tNav('contact') },
  ];

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg-darker">
      {/* Subtle TEM texture background */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={CDC_IMAGES.ebolaTEMBW.src}
          alt=""
          fill
          className="object-cover object-right opacity-[0.04]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-darker via-bg-darker/95 to-bg-darker/80" />
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-danger/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-8 pb-12 border-b border-border/60">

          {/* ── Col 1: Brand & mission ── */}
          <div className="xl:col-span-1 flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <VirusIcon size={26} className="text-secondary" />
                <div className="absolute inset-0 bg-secondary/20 rounded-full blur-md" />
              </div>
              <span className="text-xl font-black text-text-primary tracking-tight">
                Lutte<span className="text-secondary">Ebola</span>
              </span>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed">{t('aboutText')}</p>

            {/* PHEIC status badge */}
            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-danger/6 border border-danger/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-danger animate-pulse shrink-0" />
                <span className="text-[10px] font-black text-danger uppercase tracking-[0.2em]">{t('pheicStatus')}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                <div>
                  <p className="text-[9px] text-text-muted uppercase tracking-widest leading-none">{t('outbreakActive')}</p>
                  <p className="text-xs font-bold text-text-primary mt-0.5">{t('pheicDate')}</p>
                </div>
                <div>
                  <p className="text-[9px] text-text-muted uppercase tracking-widest leading-none">{t('variant')}</p>
                  <p className="text-xs font-bold text-secondary mt-0.5">{CURRENT_OUTBREAK.variant}</p>
                </div>
                <div className="col-span-2 mt-1 pt-2 border-t border-danger/15">
                  <p className="text-[9px] text-text-muted">
                    {CURRENT_OUTBREAK.stats.suspectedCases} cas · {CURRENT_OUTBREAK.stats.deaths} décès · {CURRENT_OUTBREAK.cfr}% létalité
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Col 2: Navigation ── */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.25em]">{t('quickLinks')}</h3>
            <nav className="flex flex-col gap-1">
              {navLinks.map(({ key, sectionId, label }) => (
                <button
                  key={key}
                  onClick={() => scrollTo(sectionId)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-bg-card transition-all duration-150 text-left group w-full"
                >
                  <ArrowRightIcon size={11} className="text-border group-hover:text-secondary transition-colors shrink-0" />
                  {label}
                </button>
              ))}
              <Link
                href={`/${locale}/statistics`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-bg-card transition-all duration-150 group"
              >
                <ArrowRightIcon size={11} className="text-border group-hover:text-secondary transition-colors shrink-0" />
                {t('statistics')}
              </Link>
              <Link
                href={`/${locale}/news`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-bg-card transition-all duration-150 group"
              >
                <ArrowRightIcon size={11} className="text-border group-hover:text-secondary transition-colors shrink-0" />
                <span className="flex items-center gap-1.5">
                  {t('news')}
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                </span>
              </Link>
            </nav>
          </div>

          {/* ── Col 3: OMS / WHO Contacts ── */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.25em]">OMS / WHO</h3>

            <div className="flex flex-col gap-4">
              {/* Goma sub-office */}
              <div className="p-4 rounded-2xl bg-bg-card border border-border flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#009EDB]/10 flex items-center justify-center shrink-0">
                    <LocationIcon size={12} className="text-[#009EDB]" />
                  </div>
                  <span className="text-xs font-bold text-text-primary">{t('emergencyDPS')}</span>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed pl-8">{EMERGENCY_CONTACTS.whoGomaAddress}</p>
                <a
                  href={`tel:${EMERGENCY_CONTACTS.congoDPS}`}
                  className="flex items-center gap-2 pl-8 group"
                >
                  <PhoneIcon size={11} className="text-[#009EDB] shrink-0" />
                  <span className="text-xs font-bold text-text-primary group-hover:text-[#009EDB] transition-colors">{EMERGENCY_CONTACTS.congoDPS}</span>
                </a>
                <a
                  href={`mailto:${EMERGENCY_CONTACTS.gomaEmail}`}
                  className="flex items-center gap-2 pl-8 group"
                >
                  <EmailIcon size={11} />
                  <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors">{EMERGENCY_CONTACTS.gomaEmail}</span>
                </a>
              </div>

              {/* Kinshasa national */}
              <div className="p-4 rounded-2xl bg-bg-card border border-border flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#009EDB]/10 flex items-center justify-center shrink-0">
                    <LocationIcon size={12} className="text-[#009EDB]/60" />
                  </div>
                  <span className="text-xs font-bold text-text-primary">{t('emergencyWHO')}</span>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed pl-8">{EMERGENCY_CONTACTS.whoKinshasaAddress}</p>
                <a
                  href={`tel:${EMERGENCY_CONTACTS.whoGoma}`}
                  className="flex items-center gap-2 pl-8 group"
                >
                  <PhoneIcon size={11} className="text-text-muted shrink-0" />
                  <span className="text-xs font-bold text-text-primary group-hover:text-secondary transition-colors">{EMERGENCY_CONTACTS.whoGoma}</span>
                </a>
                <a
                  href={`mailto:${EMERGENCY_CONTACTS.whoEmail}`}
                  className="flex items-center gap-2 pl-8 group"
                >
                  <EmailIcon size={11} />
                  <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors">{EMERGENCY_CONTACTS.whoEmail}</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Col 4: Emergency line + WHO link ── */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.25em]">{t('emergency')}</h3>

            {/* Emergency call — prominent */}
            <a
              href={`tel:${EMERGENCY_CONTACTS.emergencyLine}`}
              className="group flex flex-col gap-3 p-5 rounded-2xl bg-danger/8 border border-danger/25 hover:border-danger/50 hover:bg-danger/12 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-danger/70 uppercase tracking-widest">{t('emergencyLine')}</span>
                <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-danger/15 border border-danger/20 flex items-center justify-center shrink-0">
                  <PhoneIcon size={18} className="text-danger" />
                </div>
                <span className="text-4xl font-black text-danger tracking-tight leading-none group-hover:scale-105 transition-transform inline-block">
                  {EMERGENCY_CONTACTS.emergencyLine}
                </span>
              </div>
              <p className="text-[10px] text-danger/60 leading-relaxed">RDC · Gratuit · 24h/24 · 7j/7</p>
            </a>

            {/* WHO Africa link */}
            <a
              href={COMMUNITY_LINKS.whoEbola}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-bg-card border border-border hover:border-[#009EDB]/30 transition-all duration-200 group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#009EDB]/10 flex items-center justify-center shrink-0">
                  <ExternalLinkIcon size={13} className="text-[#009EDB]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-primary group-hover:text-[#009EDB] transition-colors">who.int/ebola</p>
                  <p className="text-[10px] text-text-muted">OMS — Informations officielles</p>
                </div>
              </div>
              <ExternalLinkIcon size={12} className="text-text-muted group-hover:text-[#009EDB] transition-colors" />
            </a>

            {/* Africa CDC link */}
            <a
              href={COMMUNITY_LINKS.africaCdc}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-bg-card border border-border hover:border-secondary/30 transition-all duration-200 group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                  <ExternalLinkIcon size={13} className="text-secondary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-primary group-hover:text-secondary transition-colors">africacdc.org</p>
                  <p className="text-[10px] text-text-muted">Africa CDC — Surveillance</p>
                </div>
              </div>
              <ExternalLinkIcon size={12} className="text-text-muted group-hover:text-secondary transition-colors" />
            </a>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <p className="text-xs text-text-muted">© {currentYear} LutteEbola · {t('rights')}</p>
            <span className="hidden sm:block text-border">·</span>
            <p className="text-xs text-text-muted">{t('disclaimer')}</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-text-muted/60 italic">{t('sourceNote')}</span>
            <span className="h-3 w-px bg-border" />
            <span className="text-xs text-text-muted">{t('builtWith')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
