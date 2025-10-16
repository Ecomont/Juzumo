
import { NextResponse } from 'next/server';

export const revalidate = 60 * 60; // 1 hora de revalidación (CDN + ISR)

export async function GET() {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!placeId || !apiKey) {
    return NextResponse.json({ error: 'Falta GOOGLE_PLACE_ID o GOOGLE_MAPS_API_KEY' }, { status: 500 });
  }

  const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=es&regionCode=ES`;

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

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': fieldMask,
    },
    // Sugerencia: añade caché a nivel de fetch también
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: 'Error al pedir Place Details', details: text }, { status: 500 });
  }

  const data = await res.json();

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

  return NextResponse.json(normalized, { status: 200 });
}