import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://tu-dominio.com';
  const routes = ['', '/sobre', '/fruta', '/bares', '/resenas', '/blog', '/zona', '/contacto', '/aviso-legal', '/privacidad', '/cookies'];
  return routes.map(p => ({ url: base + p, lastModified: new Date().toISOString() }));
}
