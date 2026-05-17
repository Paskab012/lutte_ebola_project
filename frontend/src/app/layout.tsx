import "./globals.css";

// The [locale] layout owns <html> and <body> so it can set lang={locale}.
// This root layout only imports global styles.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
