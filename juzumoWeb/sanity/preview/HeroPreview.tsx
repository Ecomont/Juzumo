import React from 'react';
import { Hero } from '../../components/Hero';
import { SanityDocument } from '@sanity/client';

interface HeroPreviewProps {
  value: SanityDocument;
}

const HeroPreview: React.FC<HeroPreviewProps> = ({ value }) => {
  return (
    <Hero
      title={value.title}
      subtitle={value.subtitle}
      ctaLabel={value.ctaLabel}
      videoPoster={value.videoPoster}
      notes={value.notes}
    />
  );
};

export default HeroPreview;