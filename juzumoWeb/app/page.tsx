import Hero from '@/components/Hero';
import BarStrip from '@/components/BarStrip';
import FruitGrid from '@/components/FruitGrid';
import ReviewList from '@/components/ReviewList';
import SectionCard from '@/components/SectionCard';
import Link from 'next/link';
import { FRUTAS } from '@/data/frutas';
import { RESENAS } from '@/data/resenas';
import { SITE } from '@/lib/site';
import GoogleReviews from '@/components/GoogleReviews';


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

      {/* Full-bleed wrapper to make the bar strip span the entire screen */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
        <div className="mx-auto transform-gpu md:scale-105">
          <BarStrip />
        </div>
      </div>



      <SectionCard className="-mt-8">
        <div className="grid gap-6 md:grid-cols-3">
          <SectionCard>
            <h2 className="text-h2 mb-6">Fruta destacada</h2>
            <FruitGrid fruits={FRUTAS.slice(0,6)} />
            <div className="mt-6"><Link className="underline" href="/fruta">Ver lista completa</Link></div>
          </SectionCard>

          <SectionCard>
            <h2 className="text-h2 mb-6">Reseñas</h2>
            <GoogleReviews /> {/* ⬅️ usa las reseñas de Google */}
            {/* El propio componente incluye botón “Ver en Google” */}
          </SectionCard>

          {/* ...tu tercera columna si la hay... */}
        </div>
      </SectionCard>


      <section className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h2 className="text-h2 mb-4">¿Empezamos hoy?</h2>
        <a className="inline-block rounded-base px-16 py-8 shadow-card duration-ui ease-motion bg-brand-green-600 text-white"
           href={`https://wa.me/${SITE.whatsapp}`}>Contactar por WhatsApp</a>
      </section>
    </main>
  );
}
