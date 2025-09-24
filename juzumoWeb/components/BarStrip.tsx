'use client';
import { BARES } from '@/data/bares';
export default function BarStrip() {
  return (
    <section className="py-8 bg-cream">
      <div className="overflow-hidden">
        <div className="flex gap-12 animate-[scroll_40s_linear_infinite] hover:[animation-play-state:paused]">
          {[...BARES, ...BARES].map((b, i) => (
            <a key={i} href={b.urlMaps} aria-label={`Logo del bar ${b.nombre}`}>
              {/* usa next/image si quieres optimización */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.logo ?? '/img/bares/default.png'} alt={`Logo del bar ${b.nombre}`}
                   className="h-12 w-auto object-contain" />
            </a>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @media (prefers-reduced-motion: reduce){ .animate-[scroll_40s_linear_infinite]{ animation: none } }
      `}</style>
    </section>
  );
}
