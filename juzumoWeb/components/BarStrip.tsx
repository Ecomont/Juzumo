'use client';
import { BARES } from '@/data/bares';

export default function BarStrip() {
  return (
    <section className="py-8">
      <div className="overflow-hidden">
        <div
          className="
            flex gap-12
            animate-[scroll_40s_linear_infinite]
            hover:[animation-play-state:paused]
            motion-reduce:animate-none
          "
          style={{ willChange: 'transform' }}
          aria-label="Bares a los que servimos"
        >
          {[...BARES, ...BARES].map((b, i) => (
            <a
              key={i}
              href={b.urlMaps}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Logo del bar ${b.nombre}`}
              title={b.nombre}
              className="inline-flex items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.logo ?? '/img/bares/default.svg'}
                alt={`Logo del bar ${b.nombre}`}
                className="h-12 w-auto object-contain opacity-90"
                loading="lazy"
                decoding="async"
                height={48} // ayuda a evitar CLS
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
