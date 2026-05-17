import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lutte Ebola',
    short_name: 'LutteEbola',
    description: 'Ensemble contre Ebola — Détection et signalement des cas en RDC orientale',
    start_url: '/fr',
    display: 'standalone',
    background_color: '#0A1628',
    theme_color: '#0B4F6C',
    orientation: 'portrait',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
