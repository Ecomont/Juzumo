"use client";

import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LUGARES, mapsLink } from "@/data/lugares";

export default function MapaAlbaceteClient({ size = 560 }: { size?: number }) {
  // Icono tipo “pin” (gota) con sombra
  const pinIcon = L.divIcon({
    className: "", // sin clases para evitar estilos por defecto
    html: `
      <svg width="32" height="44" viewBox="0 0 24 34"
           aria-hidden="true"
           style="display:block; filter: drop-shadow(0 2px 2px rgba(0,0,0,.25));">
        <!-- cuerpo del pin -->
        <path d="M12 0C7.03 0 3 4.03 3 9c0 5.82 9 15 9 15s9-9.18 9-15C21 4.03 16.97 0 12 0z"
              fill="#e11d48" stroke="white" stroke-width="2" />
        <!-- “punto” central -->
        <circle cx="12" cy="9" r="3.2" fill="white"/>
      </svg>
    `,
    iconSize: [32, 44],
    iconAnchor: [16, 38],   // punta del pin
    popupAnchor: [0, -38],
  });

  return (
    <div className="rounded-2xl overflow-hidden mx-auto" style={{ width: size, height: size }}>
      <MapContainer
        center={[38.994349, -1.858542]}
        zoom={14}
        scrollWheelZoom
        style={{ width: "100%", height: "100%" }}
        preferCanvas
        whenCreated={(map) => {
          // Encaja todos los lugares y limita el zoom para que entre “cerca”
          const pts = LUGARES.filter(l => l.lat && l.lng).map(l => [l.lat!, l.lng!] as [number, number]);
          if (pts.length) {
            const bounds = L.latLngBounds(pts);
            map.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
          }
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {LUGARES.filter(l => l.lat && l.lng).map((l) => (
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
