// lib/types.ts

export type Unit = 'kg' | 'g' | 'unit' | 'pcs' | string;

/** Fruits (supports your old Sanity shape and a local shape) */
export type FruitSanity = {
  _id: string;
  name: string;
  price: number;
  unit: Unit;
  photo: { asset: { url: string } };
};

export type FruitLocal = {
  _id: string;
  name: string;
  price: number;
  unit: Unit;
  imageUrl: string;
};

export type Fruit = FruitSanity | FruitLocal;

export function getFruitImageUrl(f: Fruit): string {
  return 'photo' in f ? f.photo.asset.url : f.imageUrl;
}

/** Bars */
export type Bar = {
  name: string;
  urlMaps?: string;     // Google Maps or similar URL
  logo?: string;       // optional image URL
};

/** Blog posts */
export type Post = {
  slug: string;
  title: string;
  date: string;        // ISO date string (e.g., "2025-09-24")
  excerpt?: string;
  coverImage?: string; // image URL
  content?: string;    // optional full content/markdown
};

/** Reviews */
export type Review = {
  author: string;
  text: string;
  rating: number;      // 0..5
  date: string;        // ISO date string
};
