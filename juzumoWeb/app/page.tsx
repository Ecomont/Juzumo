import Hero from '@/components/Hero';
import BarStrip from '@/components/BarStrip';
import FruitGrid from '@/components/FruitGrid';
import ReviewList from '@/components/ReviewList';
import Link from 'next/link';
import { FRUTAS } from '@/data/frutas';
import { RESENAS } from '@/data/resenas';
import { SITE } from '@/lib/site';

export default function Page() {
  return (
    <main>
      <Hero
        titulo="Fruta fresca para tu bar"
        subtitulo="Entrega rápida, precios claros y producto de temporada."
        ctaLabel="Pedir por WhatsApp"
        ctaHref={`https://wa.me/${SITE.whatsapp}`}
        videoSrc="/video/hero.mp4"
        poster="/img/hero-poster.jpg"
        caption="Vídeo sin audio mostrando fruta fresca y reparto."
      />

      {/* 3 bullets de valor */}
      <section className="mx-auto max-w-5xl px-4 py-12 grid gap-6 md:grid-cols-3">
        <div><h3 className="text-h3">Fresco</h3><p>Seleccionamos a diario.</p></div>
        <div><h3 className="text-h3">Transparente</h3><p>Precios por kg/ud visibles.</p></div>
        <div><h3 className="text-h3">Rápido</h3><p>Ventanas de entrega claras.</p></div>
      </section>

      <BarStrip />

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-h2 mb-6">Fruta destacada</h2>
        <FruitGrid fruits={FRUTAS.slice(0,6)} />
        <div className="mt-6"><Link className="underline" href="/fruta">Ver lista completa</Link></div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-h2 mb-6">Reseñas</h2>
        <ReviewList reviews={RESENAS.slice(0,3)} />
        <div className="mt-6"><Link className="underline" href="/resenas">Ver todas</Link></div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h2 className="text-h2 mb-4">¿Empezamos hoy?</h2>
        <a className="inline-block rounded-base px-16 py-8 shadow-card duration-ui ease-motion bg-brand-green-600 text-white"
           href={`https://wa.me/${SITE.whatsapp}`}>Contactar por WhatsApp</a>
      </section>
    </main>
  );
}
