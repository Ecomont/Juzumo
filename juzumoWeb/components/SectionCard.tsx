// components/SectionCard.tsx
import React from 'react';

type SectionCardProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function SectionCard({ children, className = "", style }: SectionCardProps) {
  return (
    <section className={`mx-auto max-w-5xl px-4 py-12 bg-white rounded-base shadow-card reveal ${className}`} style={style}>
      {children}
    </section>
  );
}
