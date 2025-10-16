// components/Hero.tsx
import React from 'react';

export interface HeroProps {
  titulo: string;
  subtitulo: string;
  ctaLabel: string;
  ctaHref: string;
  videoSrc?: string;   // mp4 opcional
  poster?: string;     // imagen de poster
  caption?: string;    // texto accesible
  imageUrl?: string;   // fallback si no hay video
}

const Hero: React.FC<HeroProps> = ({
  titulo,
  subtitulo,
  ctaLabel,
  ctaHref,
  videoSrc,
  poster,
  caption,
  imageUrl,
}) => {
  return (
    <section id="hero" className="relative isolate hero-overlay">
      {videoSrc ? (
        <video
          className="w-full h-[60vh] object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="w-full h-[60vh] object-cover"
          src={imageUrl}
          alt={titulo}
        />
      ) : null}

  <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <div className="max-w-3xl text-center text-white">
          <h1 className="text-h1">{titulo}</h1>
          <p className="mt-4 text-body">{subtitulo}</p>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-base px-16 py-8 shadow-card duration-ui ease-motion bg-brand-green-600 text-white hover:bg-brand-green-700"
          >
            {ctaLabel}
          </a>
          {caption ? <p className="sr-only">{caption}</p> : null}
        </div>
      </div>

      {/* Respeto a reduced motion */}
      <style>{`@media (prefers-reduced-motion: reduce){ video{ animation: none!important } }`}</style>
    </section>
  );
};

export default Hero;
