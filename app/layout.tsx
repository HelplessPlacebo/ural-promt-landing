import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

const SITE_URL = 'https://ural-promt-landing-s27k.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Подъёмные платформы — УРАЛПРОМТ | Самоходные ножничные и мачтовые подъёмники',
  description:
    'Самоходные ножничные и мачтовые подъёмные платформы для высотных работ. Доставка по России и СНГ. Гарантия 3 года.',
  keywords: [
    'ножничные платформы',
    'самоходные подъёмники',
    'мачтовые платформы',
    'подъёмная техника',
    'вышки',
    'автовышки',
    'подъёмники для строительства',
    'УРАЛПРОМТ',
  ],
  openGraph: {
    title: 'УРАЛПРОМТ — подъёмные платформы',
    description: 'Самоходные ножничные и мачтовые подъёмные платформы для высотных работ.',
    type: 'website',
    images: [
      {
        url: '/og-main.webp',
        width: 1200,
        height: 630,
        alt: 'УРАЛПРОМТ — подъёмные платформы',
      },
    ],
    locale: 'ru_RU',
    siteName: 'УРАЛПРОМТ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'УРАЛПРОМТ — подъёмные платформы',
    description: 'Высотные подъёмники самходного типа.',
    images: ['/og-main.webp'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0077ff" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'УРАЛПРОМТ',
              url: SITE_URL,
              logo: `${SITE_URL}/icons/icon-512x512.png`,
              sameAs: [],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
