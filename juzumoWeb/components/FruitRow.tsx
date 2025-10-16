"use client";

import Link from 'next/link';
import { FRUTAS } from '@/data/frutas';

type Props = {
  slugs?: string[];
};

const DEFAULT_SLUGS = ['manzana', 'platano', 'naranja', 'pera', 'uva'];

export default function FruitRow({ slugs = DEFAULT_SLUGS }: Props) {
  const items = slugs.map((slug) => FRUTAS.find((f) => f._id === slug) ?? { _id: slug, nombre: capitalizar(slug) } as any);

  return (
    <div className="overflow-x-auto">
      <ul className="mx-auto flex max-w-5xl items-stretch gap-4 px-1 py-2">
        {items.map((f) => (
          <li key={f._id} className="min-w-32 flex-1">
            <Link
              href={`/fruta/${f._id}`}
              className="group flex h-full items-center gap-3 rounded-base border bg-white p-3 shadow-card transition-colors hover:bg-cream"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {f.foto ? (
                <img src={f.foto} alt={f.nombre} className="h-10 w-10 rounded-full object-cover" />
              ) : (
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 text-sm text-gray-500">
                  {iniciales(f.nombre)}
                </span>
              )}
              <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900">{f.nombre}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function capitalizar(slug: string) {
  return slug.replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}

function iniciales(nombre: string) {
  return nombre
    .split(' ')
    .map((s) => s[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
