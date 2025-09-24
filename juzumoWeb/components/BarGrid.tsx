import React from 'react';
import type { Bar } from '../lib/types';

interface BarGridProps {
  bars: Bar[];
}

const BarGrid: React.FC<BarGridProps> = ({ bars }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {bars.map((bar) => (
        <div key={bar.nombre} className="flex flex-col items-center">
          {bar.logo && (
            <img src={bar.logo} alt={bar.nombre} className="w-full h-auto mb-2" />
          )}
          <a href={bar.urlMaps} target="_blank" rel="noopener noreferrer" className="text-center">
            {bar.nombre}
          </a>
        </div>
      ))}
    </div>
  );
};

export default BarGrid;