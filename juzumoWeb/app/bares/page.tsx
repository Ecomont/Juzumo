import React from 'react';
import BarGrid from '../../components/BarGrid';

const BaresPage = () => {
  // Replace with your own data source or API call
  const bars: Array<{ name: string; logo?: string; urlMaps?: string }> = [];

  return (
    <div>
      <h1>Bares</h1>
      <BarGrid bars={bars} />
    </div>
  );
};

export default BaresPage;