import { useEffect, useState } from 'react';
import { client } from '../../../sanity/client';
import { groq } from 'next-sanity';
import FruitGrid from '../../../components/FruitGrid';

const query = groq`
  *[_type == "fruit"] {
    _id,
    name,
    price,
    unit,
    seasonality,
    origin,
    ecological,
    photo
  }
`;

const FrutaPage = () => {
  const [fruits, setFruits] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const fetchFruits = async () => {
      const data = await client.fetch(query);
      setFruits(data);
      if (data.length > 0) {
        const lastModified = data.reduce((latest, fruit) => {
          const fruitDate = new Date(fruit._createdAt);
          return fruitDate > latest ? fruitDate : latest;
        }, new Date(0));
        setLastUpdated(lastModified.toLocaleDateString());
      }
    };

    fetchFruits();
  }, []);

  return (
    <div>
      <h1>Frutas</h1>
      {lastUpdated && <p>Última actualización: {lastUpdated}</p>}
      <FruitGrid fruits={fruits} />
    </div>
  );
};

export default FrutaPage;