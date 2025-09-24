import React from 'react';
import { SanityImageAsset } from '@sanity/image-url/lib/types/types';
import { urlFor } from '../sanity/client';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  videoPoster: SanityImageAsset;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaLabel, videoPoster }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <button>{ctaLabel}</button>
      </div>
      {videoPoster && (
        <div className="hero-video">
          <img src={urlFor(videoPoster).url()} alt={title} />
        </div>
      )}
    </section>
  );
};

export default Hero;