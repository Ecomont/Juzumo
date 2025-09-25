// components/MapaAlbacete.client.tsx
"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LUGARES, mapsLink } from "@/data/lugares";

export default function MapaAlbaceteClient() {
  const center: [number, number] = [38.994349, -1.858542];
  return (
    <div className="w-full h-[520px] rounded-2xl overflow-hidden">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        style={{ width: "100%", height: "100%" }}
        preferCanvas
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {LUGARES.filter(l => l.lat && l.lng).map((l) => (
          <CircleMarker
            key={l.id}
            center={[l.lat!, l.lng!]}
            radius={8}
            pathOptions={{ color: "#e11d48", fillOpacity: 0.9 }}
            eventHandlers={{ click: () => window.open(mapsLink(l), "_blank", "noopener,noreferrer") }}
          >
            <Tooltip direction="top" offset={[0, -6]} opacity={1}>
              {l.nombre}
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
