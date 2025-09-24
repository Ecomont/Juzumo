import { ReactNode } from 'react';
import Head from 'next/head';
import '../globals.css';

export const metadata = {
  title: 'Juzumo',
  description: 'Your description here',
  robots: 'index, follow',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content={metadata.robots} />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}