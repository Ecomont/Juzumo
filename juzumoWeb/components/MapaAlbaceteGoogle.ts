// app/components/MapaAlbaceteGoogle.tsx
"use client";

import { useEffect, useRef } from "react";
import { LUGARES, mapsLink } from "@/data/lugares";

declare global {
  interface Window {
    initMap: () => void;
  }
}

export default function MapaAlbaceteGoogle() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Carga el script si no existe
    if (!document.getElementById("google-maps")) {
      const s = document.createElement("script");
      s.id = "google-maps";
      s.async = true;
      s.src =
        `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&callback=initMap`;
      document.body.appendChild(s);
    } else {
      // ya cargado
      init();
    }

    window.initMap = init;

    function init() {
      if (!ref.current || !(window as any).google) return;
      const { google } = window as any;

      const map = new google.maps.Map(ref.current, {
        center: { lat: 38.994349, lng: -1.858542 },
        zoom: 13,
        mapId: "DEMO_MAP", // opcional si usas estilos
      });

      LUGARES.forEach((l) => {
        const marker = new google.maps.Marker({
          position: { lat: l.lat, lng: l.lng },
          map,
          title: l.nombre,
          // icon: "URL_A_TU_PIN_ROJO_SI_QUIERES_PERSONALIZAR"
        });

        marker.addListener("click", () => {
          window.open(mapsLink(l), "_blank", "noopener,noreferrer");
        });
      });
    }
  }, []);

  return <div ref={ref} className="w-full h-[520px] rounded-2xl" />;
}
