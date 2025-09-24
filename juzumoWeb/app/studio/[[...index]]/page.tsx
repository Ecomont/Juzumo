import React from 'react';
import { NextStudio } from 'next-sanity/studio';
import { sanityConfig } from '../../../sanity/config';

const StudioPage = () => {
  return (
    <NextStudio config={sanityConfig} />
  );
};

export default StudioPage;