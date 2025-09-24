import React from 'react';
import Hero from '../components/Hero';

const HomePage = async () => {
  return (
    <div>
      <Hero
        title="Welcome to Juzumo"
        subtitle="Fresh juices and more."
        ctaLabel="Order now"
      />
    </div>
  );
};

export default HomePage;