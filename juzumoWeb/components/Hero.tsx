import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  imageUrl?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaLabel, imageUrl }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <button>{ctaLabel}</button>
      </div>
      {imageUrl && (
        <div className="hero-image">
          <img src={imageUrl} alt={title} />
        </div>
      )}
    </section>
  );
};

export default Hero;