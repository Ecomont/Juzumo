import React from 'react';
import { groq } from 'next-sanity';
import { client } from '../sanity/client';
import Hero from '../components/Hero';
import FruitGrid from '../components/FruitGrid';
import BarGrid from '../components/BarGrid';
import ReviewList from '../components/ReviewList';

const query = groq`
  *[_type == "siteSettings"][0] {
    name,
    shortDescription,
    nap,
    socialLinks
  },
  *[_type == "hero"][0] {
    title,
    subtitle,
    ctaLabel,
    videoPoster,
    notes
  },
  *[_type == "fruit" && featured == true][0..6] {
    name,
    price,
    unit,
    season,
    origin,
    ecological,
    photo
  },
  *[_type == "bar"][0..12] {
    name,
    logo,
    urlMaps
  },
  *[_type == "reviewManual"][0..3] {
    author,
    text,
    rating,
    date
  }
`;

const HomePage = async () => {
  const data = await client.fetch(query);

  return (
    <div>
      <Hero data={data.hero} />
      <FruitGrid fruits={data.fruit} />
      <BarGrid bars={data.bar} />
      <ReviewList reviews={data.reviewManual} />
    </div>
  );
};

export default HomePage;