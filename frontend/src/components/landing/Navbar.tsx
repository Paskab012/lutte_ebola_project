'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/utils/cn';
import { VirusIcon, MenuIcon, CloseIcon } from '@/components/icons';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { Button } from '@/components/ui/Button';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import type { Locale } from '@/types';

interface NavbarProps {
  readonly locale: Locale;
}

const SECTION_IDS = ['hero', 'about', 'symptom-checker', 'cta'] as const;

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;
  const isStatisticsPage = pathname.includes('/statistics');
  const isNewsPage = pathname.includes('/news');

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeSection, scrollToSection } = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    function handleScroll() { setIsScrolled(window.scrollY > 20); }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero',            label: t('home') },
    { id: 'about',           label: t('about') },
    { id: 'symptom-checker', label: t('check') },
    { id: 'cta',             label: t('contact') },
  ] as const;

  function handleSectionClick(sectionId: string) {
    if (isHomePage) scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  }

  const sectionHref = (id: string) => `/${locale}#${id}`;

  const navClass = isHomePage
    ? cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass-strong shadow-lg shadow-bg-darker/50' : 'bg-transparent'
      )
    : 'sticky top-0 z-50 glass-strong border-b border-border';

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          {isHomePage ? (
            <button onClick={() => scrollToSection('hero')} className="flex items-center gap-2.5 group">
              <div className="relative">
                <VirusIcon size={28} className="text-secondary transition-transform duration-300 group-hover:rotate-45" />
                <div className="absolute inset-0 bg-secondary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-lg font-bold text-text-primary">Lutte<span className="text-secondary">Ebola</span></span>
            </button>
          ) : (
            <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
              <div className="relative">
                <VirusIcon size={28} className="text-secondary transition-transform duration-300 group-hover:rotate-45" />
                <div className="absolute inset-0 bg-secondary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-lg font-bold text-text-primary">Lutte<span className="text-secondary">Ebola</span></span>
            </Link>
          )}

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              isHomePage ? (
                <button
                  key={link.id}
                  onClick={() => handleSectionClick(link.id)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    activeSection === link.id
                      ? 'text-secondary bg-secondary/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
                  )}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.id}
                  href={sectionHref(link.id)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-card transition-all duration-200"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href={`/${locale}/statistics`}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                isStatisticsPage
                  ? 'text-secondary bg-secondary/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
              )}
            >
              {t('statistics')}
            </Link>
            <Link
              href={`/${locale}/news`}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                isNewsPage
                  ? 'text-secondary bg-secondary/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full bg-secondary', !isNewsPage && 'animate-pulse')} />
              {t('news')}
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />
            {isHomePage ? (
              <Button size="sm" onClick={() => handleSectionClick('symptom-checker')} className="hidden sm:flex">
                {t('report')}
              </Button>
            ) : (
              <Link
                href={sectionHref('symptom-checker')}
                className="hidden sm:inline-flex items-center justify-center text-sm font-bold text-secondary border border-secondary/30 px-3 py-1.5 rounded-lg hover:bg-secondary/10 transition-colors"
              >
                {t('report')}
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-card transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-strong border-t border-border animate-slide-in-left">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) =>
              isHomePage ? (
                <button
                  key={link.id}
                  onClick={() => handleSectionClick(link.id)}
                  className={cn(
                    'block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                    activeSection === link.id
                      ? 'text-secondary bg-secondary/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
                  )}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.id}
                  href={sectionHref(link.id)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-card transition-all duration-200"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href={`/${locale}/statistics`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                isStatisticsPage
                  ? 'text-secondary bg-secondary/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
              )}
            >
              {t('statistics')}
            </Link>
            <Link
              href={`/${locale}/news`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'flex items-center gap-2 w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                isNewsPage
                  ? 'text-secondary bg-secondary/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full bg-secondary', !isNewsPage && 'animate-pulse')} />
              {t('news')}
            </Link>
            <div className="pt-2">
              <Link href={sectionHref('symptom-checker')} onClick={() => setIsMobileMenuOpen(false)}>
                <Button fullWidth>{t('report')}</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
