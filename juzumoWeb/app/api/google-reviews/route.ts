// app/api/google-reviews/route.ts
import { NextResponse } from 'next/server';

// ===== Config por entorno =====
const IS_PROD = process.env.NODE_ENV === 'production' && process.env.REVIEWS_MODE !== 'mock';
// En producción cachea 24h; en dev/preview no cachees
export const revalidate = IS_PROD ? 60 * 60 * 24 : 0;
export const dynamic   = IS_PROD ? 'auto' : 'force-dynamic';

// Fallback en memoria por si recibimos 429 (no garantizado en serverless, pero ayuda)
let lastOkPayload: any | null = null;

export async function GET() {
  try {
    // 1) Modo MOCK para no gastar durante desarrollo/preview
    if (process.env.REVIEWS_MODE === 'mock') {
      const mock = {
        place: { name: 'JUZUMO', rating: 5, count: 13, mapsUri: '#', reviewsUri: '#' },
        reviews: [
          { author: 'Marta López', rating: 5, text: 'Fruta top 👌', publishTime: '2025-10-09T19:17:48Z' },
          { author: 'Frank Lucas', rating: 5, text: 'Tomates espectaculares', publishTime: '2025-05-14T14:35:54Z' },
        ],
      };
      return NextResponse.json(mock, { status: 200 });
    }

    // 2) LIVE: lee env vars (sin espacios y sin prefijo "places/")
    let placeId = (process.env.GOOGLE_PLACE_ID ?? '').trim().replace(/^places\//, '');
    const apiKey = (process.env.GOOGLE_MAPS_API_KEY ?? '').trim();

    if (!placeId || !apiKey) {
      return NextResponse.json(
        { error: 'Missing env', hasPlaceId: !!placeId, hasKey: !!apiKey },
        { status: 500 }
      );
    }

    const fieldMask = [
      'displayName',
      'googleMapsUri',
      'rating',
      'userRatingCount',
      'reviewSummary.reviewsUri',
      'reviews.authorAttribution.displayName',
      'reviews.authorAttribution.uri',
      'reviews.authorAttribution.photoUri',
      'reviews.rating',
      'reviews.text',
      'reviews.publishTime',
      'reviews.originalText',
    ].join(',');

    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=es&regionCode=ES`;

    const resp = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': fieldMask,
      },
      // En prod dejará que Next use ISR (revalidate); en dev evita caché
      cache: IS_PROD ? 'force-cache' : 'no-store',
      next: IS_PROD ? { revalidate } : undefined,
    });

    if (!resp.ok) {
      const details = await resp.text();

      // 3) Si hemos llegado al límite (429), servimos el último OK o un payload vacío
      if (resp.status === 429 && lastOkPayload) {
        return NextResponse.json(lastOkPayload, { status: 200 });
      }

      console.error('Places error', resp.status, details);
      return NextResponse.json(
        { error: 'Places error', status: resp.status, details },
        { status: 500 }
      );
    }

    const data = await resp.json();

    const normalized = {
      place: {
        name: data?.displayName?.text ?? '',
        rating: data?.rating ?? null,
        count: data?.userRatingCount ?? 0,
        mapsUri: data?.googleMapsUri ?? '',
        reviewsUri: data?.reviewSummary?.reviewsUri ?? data?.googleMapsUri ?? '',
      },
      reviews: (data?.reviews ?? []).map((r: any) => ({
        author: r?.authorAttribution?.displayName ?? 'Usuario de Google',
        authorUrl: r?.authorAttribution?.uri ?? null,
        authorPhoto: r?.authorAttribution?.photoUri ?? null,
        rating: r?.rating ?? 0,
        text: r?.text?.text ?? r?.originalText?.text ?? '',
        publishTime: r?.publishTime ?? null,
      })),
    };

    // Guarda último OK por si hay 429 después
    lastOkPayload = normalized;

    return NextResponse.json(normalized, { status: 200 });
  } catch (e: any) {
    console.error('Route crash', e);
    return NextResponse.json({ error: 'Route crash', details: String(e) }, { status: 500 });
  }
}
