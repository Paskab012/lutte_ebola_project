'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { ShieldIcon, ArrowRightIcon } from '@/components/icons';
import { CURRENT_OUTBREAK, CDC_IMAGES } from '@/constants/epidemicData';

export function HeroSection() {
  const t = useTranslations('hero');

  function scrollToChecker() {
    document.getElementById('symptom-checker')?.scrollIntoView({ behavior: 'smooth' });
  }

  function scrollToAbout() {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* CDC Ebola TEM image — atmospheric background */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none">
        <div className="relative w-full md:w-1/2 h-full opacity-[0.07]">
          <Image
            src={CDC_IMAGES.ebolaTEM.src}
            alt={CDC_IMAGES.ebolaTEM.alt}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="flex flex-col items-center text-center">

          {/* PHEIC Alert Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-danger/10 border border-danger/30 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-danger uppercase tracking-wide">
              {t('alertBadge')}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
            <span className="gradient-text">{t('title')}</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-lg sm:text-xl text-text-secondary leading-relaxed mb-10 animate-fade-in-up stagger-2">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-up stagger-3">
            <Button
              size="lg"
              onClick={scrollToChecker}
              rightIcon={<ArrowRightIcon size={20} />}
              className="animate-pulse-glow"
            >
              {t('checkSymptoms')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToAbout}
              leftIcon={<ShieldIcon size={20} />}
            >
              {t('learnMore')}
            </Button>
          </div>

          {/* Real Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 animate-fade-in-up stagger-4">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-bold text-danger">
                <AnimatedCounter end={CURRENT_OUTBREAK.stats.suspectedCases} />
              </span>
              <span className="text-sm text-text-secondary mt-1">
                {t('suspectedCases')}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-bold text-secondary">
                <AnimatedCounter end={CURRENT_OUTBREAK.stats.deaths} />
              </span>
              <span className="text-sm text-text-secondary mt-1">
                {t('deaths')}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-bold text-primary-light">
                <AnimatedCounter end={CURRENT_OUTBREAK.stats.countriesAffected} />
              </span>
              <span className="text-sm text-text-secondary mt-1">
                {t('countriesAlert')}
              </span>
            </div>
          </div>

          {/* Image credit */}
          <p className="mt-8 text-xs text-text-secondary/40 animate-fade-in-up stagger-4">
            {CDC_IMAGES.ebolaTEM.credit}
          </p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-dark to-transparent" />
    </section>
  );
}
