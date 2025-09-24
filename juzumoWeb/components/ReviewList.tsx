import type { Review } from '@/lib/types';
import { formatDateEs } from '@/lib/date';

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {reviews.map(r => (
        <article key={r.autor + r.fecha} className="rounded-base border p-4 bg-white shadow-card">
          <h3 className="text-h3">{r.autor}</h3>
          <p className="text-gray-700 mt-2">{r.texto}</p>
          <p className="text-small text-gray-500 mt-2">
            {`Valoración: ${r.rating}/5 · ${formatDateEs(r.fecha)}${r.fuente ? ` · Fuente: ${r.fuente}` : ''}`}
          </p>
        </article>
      ))}
    </div>
  );
}
