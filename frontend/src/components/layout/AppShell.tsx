'use client';

import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { WhatsAppFAB } from '@/components/ui/WhatsAppFAB';
import type { Locale } from '@/types';

interface AppShellProps {
  readonly locale: Locale;
  readonly children: React.ReactNode;
}

export function AppShell({ locale, children }: AppShellProps) {
  return (
    <>
      <Navbar locale={locale} />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer locale={locale} />
      <WhatsAppFAB locale={locale} />
    </>
  );
}
