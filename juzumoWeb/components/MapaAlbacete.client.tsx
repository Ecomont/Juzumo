"use client";

import { useEffect, useMemo, useState, useLayoutEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LUGARES, mapsLink } from "@/data/lugares";

type Props = { size?: number };

export default function MapaAlbaceteClient({ size = 560 }: Props) {
  // 1) Render sólo en cliente
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // 2) Fase de render en el siguiente frame (evita doble init con Strict+HMR)
  const [phase, setPhase] = useState<0 | 1>(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setPhase(1));
    return () => cancelAnimationFrame(id);
  }, []);

  // 3) Keys para forzar DOM nuevo (padre + MapContainer)
  const [seed] = useState(() => Math.random().toString(36).slice(2));
  const [bump, setBump] = useState(0);
  useLayoutEffect(() => { setBump(1); }, []);
  const parentKey = `leaflet-parent-${seed}-${bump}`;
  const mapKey    = `leaflet-map-${seed}-${bump}`;

  // 4) Limpieza de contenedor si se reutiliza por HMR/Strict
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    return () => {
      const el = wrapperRef.current?.querySelector(".leaflet-container") as any;
      if (el && el._leaflet_id) {
        try { delete el._leaflet_id; } catch { /* noop */ }
      }
    };
  }, []);

  // Icono
  const pinIcon = useMemo(() => L.divIcon({
    className: "",
    html: `
      <svg width="32" height="44" viewBox="0 0 24 34"
           aria-hidden="true"
           style="display:block; filter: drop-shadow(0 2px 2px rgba(0,0,0,.25));">
        <path d="M12 0C7.03 0 3 4.03 3 9c0 5.82 9 15 9 15s9-9.18 9-15C21 4.03 16.97 0 12 0z"
              fill="#e11d48" stroke="white" stroke-width="2" />
        <circle cx="12" cy="9" r="3.2" fill="white"/>
      </svg>
    `,
    iconSize: [32, 44],
    iconAnchor: [16, 38],
    popupAnchor: [0, -38],
  }), []);

  // Puntos
  const points = useMemo(
    () => LUGARES.filter(l => l.lat && l.lng).map(l => [l.lat!, l.lng!] as [number, number]),
    []
  );

  function FitBoundsOnLoad({ pts }: { pts: [number, number][] }) {
    const map = useMap();
    useEffect(() => {
      if (pts.length) {
        const bounds = L.latLngBounds(pts);
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
      }
    }, [map, pts]);
    return null;
  }

  // Esqueleto si aún no podemos montar el mapa
  if (!mounted || phase === 0) {
    return (
      <div
        className="rounded-2xl overflow-hidden mx-auto bg-neutral-200"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      ref={wrapperRef}
      key={parentKey}
      className="rounded-2xl overflow-hidden mx-auto"
      style={{ width: size, height: size }}
    >
      <MapContainer
        key={mapKey}
        center={[38.994349, -1.858542]}
        zoom={14}
        scrollWheelZoom
        style={{ width: "100%", height: "100%" }}
        preferCanvas
      >
        <FitBoundsOnLoad pts={points} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {LUGARES.filter(l => l.lat && l.lng).map(l => (
          <Marker
            key={l.id}
            position={[l.lat!, l.lng!]}
            icon={pinIcon}
            eventHandlers={{
              click: () => window.open(mapsLink(l), "_blank", "noopener,noreferrer"),
            }}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={1}>
              {l.nombre}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
