"use client";
import dynamic from "next/dynamic";

type Props = { size?: number };

const MapaAlbacete = dynamic<Props>(
  () => import("./MapaAlbacete.client").then(m => m.default),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] rounded-2xl bg-neutral-200 flex items-center justify-center">
        Cargando mapa…
      </div>
    ),
  }
);

export default MapaAlbacete;
