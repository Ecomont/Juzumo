
'use client';
import * as React from 'react';

interface ReviewItem {
  author: string;
  authorUrl?: string | null;
  authorPhoto?: string | null;
  rating: number;
  text: string;
  publishTime?: string | null;
}

interface ReviewsPayload {
  place: { name: string; rating: number | null; count: number; mapsUri: string; reviewsUri: string };
  reviews: ReviewItem[];
}

const Star: React.FC<{ filled?: boolean }> = ({ filled }) => (
  <svg viewBox="0 0 20 20" className={`h-4 w-4 ${filled ? '' : 'opacity-30'}`} aria-hidden="true">
    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.953L10 0l2.951 5.957 6.561.953-4.756 4.635 1.122 6.545z" />
  </svg>
);

export default function GoogleReviews() {
  const [data, setData] = React.useState<ReviewsPayload | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/google-reviews')
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then((json) => setData(json))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 text-sm text-neutral-500">Cargando reseñas…</div>;
  if (error) return <div className="p-6 text-sm text-red-600">No se pudieron cargar las reseñas.</div>;
  if (!data) return null;

  const { place, reviews } = data;

  return (
    <section aria-labelledby="google-reviews" className="not-prose">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 id="google-reviews" className="text-xl font-semibold">Reseñas de Google</h2>
          <p className="text-sm text-neutral-600">
            {place.name} · {place.rating ?? '—'} ★ · {place.count} opiniones
          </p>
        </div>
        <a
          className="rounded-full border px-3 py-1 text-sm hover:bg-neutral-50"
          href={place.reviewsUri || place.mapsUri}
          target="_blank" rel="noopener noreferrer"
        >
          Ver en Google
        </a>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r, i) => (
          <li key={i} className="rounded-2xl border p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-3">
              {r.authorPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.authorPhoto} alt="" className="h-8 w-8 rounded-full object-cover" />
              ) : (
                <div className="h-8 w-8 rounded-full bg-neutral-200" />
              )}
              <div className="min-w-0">
                <a
                  href={r.authorUrl ?? undefined}
                  target={r.authorUrl ? '_blank' : undefined}
                  rel={r.authorUrl ? 'noopener noreferrer' : undefined}
                  className="truncate text-sm font-medium hover:underline"
                >
                  {r.author}
                </a>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} filled={idx < Math.round(r.rating)} />
                  ))}
                </div>
                {r.publishTime && (
                  <time className="block text-xs text-neutral-500" dateTime={r.publishTime}>
                    {new Date(r.publishTime).toLocaleDateString('es-ES')}
                  </time>
                )}
              </div>
            </div>
            <p className="text-sm leading-relaxed text-neutral-800 line-clamp-6">{r.text}</p>
          </li>
        ))}
      </ul>

      {/* Atribución requerida por Google cuando no hay un mapa */}
      <div className="mt-4 text-right">
        <span className="inline-flex items-center gap-2 rounded-md bg-neutral-50 px-2 py-1 text-xs text-neutral-600">
          <span>Datos de reseñas</span>
          <span className="font-semibold">Google</span>
        </span>
      </div>
    </section>
  );
}