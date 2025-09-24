import type { Fruit } from '@/lib/types';

export default function FruitGrid({ fruits }: { fruits: Fruit[] }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {fruits.map(f => (
        <div key={f._id} className="rounded-base border p-4 shadow-card bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {f.foto && <img src={f.foto} alt={f.nombre} className="w-full h-32 object-cover rounded-base" />}
          <h3 className="text-h3 mt-2">{f.nombre}</h3>
          <p className="text-gray-700">{f.precio.toFixed(2)} € / {f.unidad}</p>
          <p className="text-small text-gray-500">
            {f.temporal ? 'Temporada' : 'Todo el año'}{f.ecologico ? ' · Ecológico' : ''}{f.origen ? ` · ${f.origen}` : ''}
          </p>
        </div>
      ))}
    </div>
  );
}
