import React from 'react';
import { Fruit } from '../lib/types';

interface FruitGridProps {
  fruits: Fruit[];
}

const FruitGrid: React.FC<FruitGridProps> = ({ fruits }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {fruits.map((fruit) => (
        <div key={fruit._id} className="border rounded-lg p-4">
          <img src={fruit.photo.asset.url} alt={fruit.name} className="w-full h-32 object-cover rounded" />
          <h3 className="text-lg font-semibold mt-2">{fruit.name}</h3>
          <p className="text-gray-600">{fruit.price} {fruit.unit}</p>
        </div>
      ))}
    </div>
  );
};

export default FruitGrid;