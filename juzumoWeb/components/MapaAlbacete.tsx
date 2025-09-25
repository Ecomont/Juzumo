// components/MapaAlbacete.tsx  (this is the one you import elsewhere)
import dynamic from "next/dynamic";

const MapaAlbacete = dynamic(() => import("./MapaAlbacete.client"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] rounded-2xl bg-neutral-200 flex items-center justify-center">
      Cargando mapa…
    </div>
  ),
});

export default MapaAlbacete;
