// components/SectionCard.tsx
import React from 'react';
export default function SectionCard({children, className=""}:{children:React.ReactNode; className?:string}) {
  return (
    <section className={`mx-auto max-w-5xl px-4 py-12 bg-white rounded-base shadow-card ${className}`}>
      {children}
    </section>
  );
}
