// app/components/MapaAlbacete.tsx
"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LUGARES, mapsLink } from "@/data/lugares";

export default function MapaAlbacete() {
  const center: [number, number] = [38.994349, -1.858542]; // Plaza del Altozano aprox

  const onPinClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

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
          // Tiles OSM libres
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {LUGARES.map((l) => (
          <CircleMarker
            key={l.id}
            center={[l.lat, l.lng]}
            radius={8}
            pathOptions={{ color: "#e11d48", fillOpacity: 0.9 }} // rojo (tailwind rose-600)
            eventHandlers={{
              click: () => onPinClick(mapsLink(l)),
            }}
          >
            <Tooltip direction="top" offset={[0, -6]} opacity={1} permanent={false}>
              {l.nombre}
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
