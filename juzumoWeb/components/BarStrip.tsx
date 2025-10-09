'use client';
import { BARES } from '@/data/bares';

export default function BarStrip() {
  return (
    // Ya NO hacemos full-bleed aquí. Eso lo gestiona la página.
    <section className="w-full bg-transparent">
      <div className="w-full overflow-hidden">
        <div
          className="
            flex items-center gap-8
            h-24 sm:h-28 md:h-32 lg:h-36          /* ↓ mucho más bajo que h-64…h-96 */
            min-w-[200%]                          /* para scroll infinito */
            animate-[scroll_40s_linear_infinite]
            hover:[animation-play-state:paused]
            motion-reduce:animate-none
          "
          aria-label="Bares a los que servimos"
          style={{ willChange: 'transform' }}
        >
          {[...BARES, ...BARES].map((b, i) => (
            <a
              key={i}
              href={b.urlMaps}
              target="_blank" rel="noopener noreferrer"
              aria-label={`Logo del bar ${b.nombre}`} title={b.nombre}
              className="flex h-full items-center px-2 shrink-0"  /* menos “aire” lateral */
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.logo ?? '/img/bares/default.svg'}
                alt={`Logo del bar ${b.nombre}`}
                className="w-auto max-h-[90%] md:max-h-[92%] object-contain opacity-95"
                loading="lazy" decoding="async"
              />
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @media (prefers-reduced-motion: reduce) {
          .motion-reduce\\:animate-none { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
