import Image from 'next/image';

export default function MapaAlbacete() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="text-h2 mb-4">Área de servicio</h2>

      <div className="relative w-full overflow-hidden rounded-base shadow-card">
        {/* Ajusta el width/height a la proporción real de tu PNG */}
        <Image
          src="/img/mapa.png"
          alt="Mapa de barrios de Albacete"
          width={1600}
          height={900}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>

      <p className="mt-2 text-sm text-gray-500">Mapa ilustrativo (versión temporal).</p>
    </section>
  );
}
