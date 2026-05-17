import { LandingPage } from '@/components/landing/LandingPage';

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: LocalePageProps) {
  await params; // locale consumed by layout
  return <LandingPage />;
}
