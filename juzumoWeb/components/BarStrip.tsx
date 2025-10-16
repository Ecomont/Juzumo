'use client';
import { BARES } from '@/data/bares';

export default function BarStrip() {
  return (
    // Ya NO hacemos full-bleed aquí. Eso lo gestiona la página.
    <section className="w-full bg-transparent">
      <div className="w-full overflow-hidden">
        <div
          className="marquee h-24 sm:h-28 md:h-32 lg:h-36 min-w-[200%] motion-reduce:animate-none"
          aria-label="Bares a los que servimos"
        >
          {[...BARES, ...BARES].map((b, i) => (
            <a
              key={i}
              href={b.urlMaps}
              target="_blank" rel="noopener noreferrer"
              aria-label={`Logo del bar ${b.nombre}`} title={b.nombre}
              className="flex h-full items-center px-2 shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.logo ?? '/img/bares/default.svg'}
                alt={`Logo del bar ${b.nombre}`}
                className="logo w-auto max-h-[90%] md:max-h-[92%] object-contain opacity-95"
                loading="lazy" decoding="async"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
