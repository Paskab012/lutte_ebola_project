'use client';

import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { SymptomChecker } from './SymptomChecker';
import { CallToAction } from './CallToAction';

export function LandingPage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SymptomChecker />
      <CallToAction />
    </main>
  );
}
