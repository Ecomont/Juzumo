export type Unit = 'kg' | 'ud' | 'g' | 'caja' | string;

export type Fruit = {
  _id: string;
  nombre: string;
  precio: number;
  unidad: Unit;
  temporal?: boolean;   // seasonal
  origen?: string;
  ecologico?: boolean;
  foto?: string;        // URL
  actualizadoEl: string; // ISO (YYYY-MM-DD)
};

export type Bar = {
  nombre: string;
  urlMaps: string;      // enlace a Google Maps
  logo?: string;        // URL
};

export type Review = {
  autor: string;
  texto: string;
  rating: number;       // 1..5
  fecha: string;        // ISO
  fuente?: 'google' | 'manual';
};

export type Post = {
  slug: string;
  titulo: string;
  fecha: string;        // ISO
  extracto?: string;
  portada?: string;     // URL
  cuerpoMarkdown?: string; // opcional si luego metes MD
};
