import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wwwn.cdc.gov',
        pathname: '/phil/**',
      },
      {
        protocol: 'https',
        hostname: 'africacdc.org',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.who.int',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
