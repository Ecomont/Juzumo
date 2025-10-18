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
import QuizBienestar from '../components/QuizBienestar';



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

      <div id="nav-sentinel" className="h-px" />


      {/* Full-bleed del BarStrip */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen isolate z-0 mb-8 md:mb-12">
        <div className="mx-auto transform-gpu md:scale-[1.01] relative z-0">
          <BarStrip />
        </div>
      </div>

      {/* 👇 Sentinel: cuando desaparece del viewport, activamos el nav compacto */}
      

      {/* Cards stacked vertically */}
      <section className="mx-auto max-w-6xl px-4 relative z-10 mt-0 md:mt-4 space-y-10 md:space-y-12">
        <SectionCard className="p-6 md:p-8">
          <h2 className="text-h2 mb-6">Fruta destacada</h2>
          <FruitGrid fruits={FRUTAS.slice(0,6)} />
          <div className="mt-6"><Link className="underline" href="/fruta">Ver lista completa</Link></div>
        </SectionCard>
      </section>

      {/* Split section: full-width, left image, right quiz */}
      <section className="flex flex-col md:flex-row gap-0 items-stretch my-10 md:my-12">
        <div className="md:w-1/2 w-full h-64 md:h-auto">
          <img
            src="/img/split50.jpeg"
            alt="Fruta fresca y saludable"
            className="object-cover w-full h-full min-h-[16rem] md:min-h-[500px]"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="md:w-1/2 w-full flex flex-col justify-center p-6 md:p-12 bg-cream">
          <h2 className="text-h2 mb-6">Quiz bienestar</h2>
          <QuizBienestar whatsapp={SITE.whatsapp} />
        </div>
      </section>

      {/* Reseñas without card */}
      <section className="mx-auto max-w-6xl px-4 relative z-10 my-10 md:my-12">
        <h2 className="text-h2 mb-6">Reseñas</h2>
        <GoogleReviews /> {/* ⬅️ usa las reseñas de Google */}
        {/* El propio componente incluye botón "Ver en Google" */}
      </section>


      <section className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h2 className="text-h2 mb-4">¿Empezamos hoy?</h2>
        <a className="inline-block rounded-base px-16 py-8 shadow-card duration-ui ease-motion bg-brand-green-600 text-white hover:bg-brand-green-700"
           href={`https://wa.me/${SITE.whatsapp}`}>Contactar por WhatsApp</a>
      </section>
    </main>
  );
}
