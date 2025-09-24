'use client';
import { useMemo, useState } from 'react';
import { FRUTAS } from '@/data/frutas';
import FruitGrid from '@/components/FruitGrid';

export default function Page() {
  const [soloTemporada, setSoloTemporada] = useState(false);
  const lista = useMemo(() => soloTemporada ? FRUTAS.filter(f => f.temporal) : FRUTAS, [soloTemporada]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-h1 mb-4">Fruta y precios</h1>
      <p className="text-small text-gray-500 mb-6">Actualizado: {FRUTAS[0]?.actualizadoEl ?? '-'}</p>
      <label className="inline-flex items-center gap-2 mb-6">
        <input type="checkbox" checked={soloTemporada} onChange={e => setSoloTemporada(e.target.checked)} />
        <span>Mostrar solo de temporada</span>
      </label>
      <FruitGrid fruits={lista} />
    </main>
  );
}
