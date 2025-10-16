// app/layout.tsx
import './globals.css'
import type { Metadata, Viewport } from 'next';
import React from 'react';
import Header from '@/components/Header';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Juzumo | Frutería a bares',
  description: 'Fruta fresca para bares y restaurantes. Pedidos por WhatsApp.',
  // (tema movido a viewport)
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0b' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      {/* Fondo crema global + color de texto base */}
      <body className="bg-cream text-gray-700 antialiased">
        <Header />
        {/* Barra de progreso de lectura fija arriba */}
        <div className="progress-scroll" aria-hidden="true" />
        {children}

        {/* CTA flotante de WhatsApp */}
        <a
          href={`https://wa.me/${SITE.whatsapp}`}
          className="fab-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chatea por WhatsApp"
        >
          <span className="sr-only">WhatsApp</span>
          {/* Icono simple de WhatsApp */}
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
            <path d="M12 2a10 10 0 00-8.94 14.56L2 22l5.6-1.47A10 10 0 1012 2zm0 2a8 8 0 110 16 7.96 7.96 0 01-4.07-1.12l-.29-.17-3.24.85.87-3.16-.18-.3A8 8 0 0112 4zm-3.2 3.2c-.18 0-.41.01-.63.34-.22.32-.83 1.02-.83 2.48s.85 2.87.97 3.07c.12.2 1.63 2.6 4.02 3.54 1.99.78 2.39.64 2.82.6.43-.04 1.38-.56 1.58-1.12.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.38-.68-1.6-.76-.22-.08-.38-.12-.54.12-.16.24-.62.76-.76.92-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.2-.72-.62-1.2-1.4-1.34-1.64-.14-.24-.02-.38.1-.5.1-.1.24-.26.36-.4.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.32-.74-1.8-.18-.44-.36-.4-.54-.4z"/>
          </svg>
          <span className="ml-2 hidden text-sm md:inline">Respondemos en minutos</span>
        </a>
      </body>
    </html>
  );
}
