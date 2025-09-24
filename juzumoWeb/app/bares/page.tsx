import React from 'react';
import { groq } from 'next-sanity';
import { sanityClient } from '../../sanity/client';
import BarGrid from '../../components/BarGrid';

const query = groq`
  *[_type == "bar"] {
    name,
    logo,
    urlMaps
  }
`;

const BaresPage = async () => {
  const bars = await sanityClient.fetch(query);

  return (
    <div>
      <h1>Bares</h1>
      <BarGrid bars={bars} />
    </div>
  );
};

export default BaresPage;