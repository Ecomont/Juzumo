
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
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);

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

  // Detect reduced motion preference
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);

  // Auto-advance every ~7s when not paused and not reduced motion
  const reviewsLength = data?.reviews?.length ?? 0;
  React.useEffect(() => {
    if (paused || reducedMotion || reviewsLength <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % reviewsLength);
    }, 7000);
    return () => clearInterval(id);
  }, [paused, reducedMotion, reviewsLength]);

  if (loading) return <div className="p-6 text-sm text-neutral-500">Cargando reseñas…</div>;
  if (error) return <div className="p-6 text-sm text-red-600">No se pudieron cargar las reseñas.</div>;
  if (!data) return null;

  const { place, reviews } = data;

  return (
    <section aria-labelledby="google-reviews" className="not-prose reveal">
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

      {/* Carousel */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex transition-transform duration-ui ease-motion"
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live="polite"
        >
          {reviews.map((r, i) => (
            <div key={i} className="w-full shrink-0 px-1 sm:px-2">
              <div className="rounded-2xl border p-4 shadow-sm transition hover:shadow-md hover-lift">
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
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        {reviews.length > 1 && (
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Ir a reseña ${i + 1}`}
                  className={`h-2 w-2 rounded-full transition-colors ${i === index ? 'bg-brand-green-600' : 'bg-neutral-300 hover:bg-neutral-400'}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-md border px-2 py-1 text-sm hover:bg-neutral-50"
                onClick={() => setIndex((i) => (i - 1 + reviews.length) % reviews.length)}
              >
                Anterior
              </button>
              <button
                type="button"
                className="rounded-md border px-2 py-1 text-sm hover:bg-neutral-50"
                onClick={() => setIndex((i) => (i + 1) % reviews.length)}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

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