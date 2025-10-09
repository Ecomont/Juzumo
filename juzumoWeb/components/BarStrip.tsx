'use client';
import { BARES } from '@/data/bares';

export default function BarStrip() {
  return (
    // Full-bleed: ocupa el ancho total de la pantalla, salga donde salga
  <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-transparent">
      <div className="w-full overflow-hidden">
        <div
          className="
            flex items-stretch gap-12 h-64 sm:h-72 md:h-80 lg:h-96
            min-w-[200%]                      /* track largo para el scroll infinito */
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
              className="flex h-full items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.logo ?? '/img/bares/default.svg'}
                alt={`Logo del bar ${b.nombre}`}
                className="h-full w-auto max-h-full object-contain opacity-90"
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
