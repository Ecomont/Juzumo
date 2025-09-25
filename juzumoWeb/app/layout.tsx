// app/layout.tsx
import type { Metadata } from 'next';
import '@/styles/globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'Juzumo | Frutería a bares',
  description: 'Fruta fresca para bares y restaurantes. Pedidos por WhatsApp.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      {/* Fondo crema global + color de texto base */}
      <body className="bg-cream text-gray-700 antialiased">
        {children}
      </body>
    </html>
  );
}
