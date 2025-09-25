// /data/lugares.ts
export type Lugar = {
    id: string;               
    nombre: string;           // nombre visible
    lat?: number;             // coordenadas (si se conocen)
    lng?: number;
    gmapsUrl?: string;        // enlace directo a Google Maps si se conoce
    placeId?: string;         // opcional: place_id estable de Google
    estado?: "ok" | "pendiente";
    notas?: string;           // observaciones (ej. discrepancias o TODOs)
  };
  
  /** Devuelve el mejor enlace de Maps disponible para el lugar. */
  export const mapsLink = (l: Lugar): string => {
    if (l.gmapsUrl) return l.gmapsUrl;
    if (l.placeId) return `https://www.google.com/maps/place/?q=place_id:${l.placeId}`;
    if (typeof l.lat === "number" && typeof l.lng === "number") {
      return `https://www.google.com/maps/search/?api=1&query=${l.lat},${l.lng}`;
    }
    return "#";
  };
  
  export const LUGARES: Lugar[] = [
    {
      id: "iruna-bar-cafe",
      nombre: "Iruña Bar Café",
      lat: 38.9994135,
      lng: -1.8609105,
      gmapsUrl: "https://maps.google.com/?q=38.9994135,-1.8609105",
      estado: "ok",
    },
    {
      id: "cafeteria-cabo-suceso",
      nombre: "Cafetería Cabo Suceso",
      lat: 38.9980943,
      lng: -1.8661613,
      gmapsUrl: "https://maps.google.com/?q=38.9980943,-1.8661613",
      estado: "ok",
    },
    {
      id: "cerveceria-boulevard",
      nombre: "Cervecería Boulevard",
      estado: "pendiente",
      notas: "Falta enlace/dir exacta de Maps para fijar coordenadas.",
    },
    {
      id: "cerveceria-santa-marta",
      nombre: "Cervecería Santa Marta",
      lat: 38.9853868,
      lng: -1.8564998,
      gmapsUrl: "https://maps.google.com/?q=38.9853868,-1.8564998",
      estado: "ok",
    },
    {
      id: "cerveceria-santa-carla",
      nombre: "Cervecería Santa Carla",
      lat: 39.005773,
      lng: -1.8675902,
      gmapsUrl: "https://maps.google.com/?q=39.005773,-1.8675902",
      estado: "ok",
      notas: "Nombre recibido como 'Santa Carla'. Verificar si es 'Santa Clara'.",
    },
    {
      id: "cafeteria-tentaciones",
      nombre: "Cafetería Tentaciones",
      lat: 38.9838708,
      lng: -1.8557958,
      gmapsUrl: "https://maps.google.com/?q=38.9838708,-1.8557958",
      estado: "ok",
    },
    {
      id: "taperia-triana",
      nombre: "Tapería Triana",
      lat: 38.9916272,
      lng: -1.8596972,
      gmapsUrl: "https://maps.google.com/?q=38.9916272,-1.8596972",
      estado: "ok",
    },
    {
      id: "cafe-bar-estadio",
      nombre: "Café-Bar Estadio",
      lat: 38.9837667,
      lng: -1.8526167,
      gmapsUrl: "https://maps.google.com/?q=38.9837667,-1.8526167",
      estado: "ok",
    },
    {
      id: "freiduria",
      nombre: "(Freiduría)",
      estado: "pendiente",
      notas: "Nombre genérico: falta enlace de Maps del local concreto.",
    },
    {
      id: "cafe-bar-miriam",
      nombre: "Café Bar Miriam",
      lat: 38.9849416,
      lng: -1.8447627,
      gmapsUrl: "https://maps.google.com/?q=38.9849416,-1.8447627",
      estado: "ok",
    },
    {
      id: "oleana-bar-taperia",
      nombre: "Oleana (Bar Tapería)",
      lat: 38.993509,
      lng: -1.8592978,
      gmapsUrl: "https://maps.google.com/?q=38.993509,-1.8592978",
      estado: "ok",
    },
    {
      id: "cuba-cafe",
      nombre: "Cuba Café",
      lat: 38.9932158,
      lng: -1.8580926,
      gmapsUrl: "https://maps.google.com/?q=38.9932158,-1.8580926",
      estado: "ok",
    },
    {
      id: "plantaciones-de-origen",
      nombre: "Plantaciones de Origen",
      lat: 38.9931642,
      lng: -1.8576733,
      gmapsUrl: "https://maps.google.com/?q=38.9931642,-1.8576733",
      estado: "ok",
    },
    {
      id: "avila-10-centro-mayores",
      nombre: "Ávila (C/ Ávila 10, Centro de Mayores)",
      estado: "pendiente",
      notas: "Sin ficha directa: falta enlace de Maps o confirmar nombre exacto.",
    },
    {
      id: "restaurante-los-molinos",
      nombre: "Restaurante Los Molinos",
      estado: "pendiente",
      notas: "Tengo 'C/ Marqués de Villores 16'; falta enlace de Maps para coordenadas.",
    },
    {
      id: "meson-las-rejas",
      nombre: "Mesón Las Rejas",
      estado: "pendiente",
      notas: "Falta enlace de Google Maps para fijarlo.",
    },
    {
      id: "restaurante-asiatico-soho",
      nombre: "Restaurante Asiático Soho",
      estado: "pendiente",
      notas: "Tengo 'C/ Hellín, 33'; falta enlace o ficha de Maps para coordenadas.",
    },
    {
      id: "kyoto-asiatico",
      nombre: "Kyoto (asiático)",
      estado: "pendiente",
      notas: "Falta enlace de Maps de la sede de Albacete.",
    },
    {
      id: "himawari-ramen",
      nombre: "Himawari Ramen",
      lat: 38.9924969,
      lng: -1.8585844,
      gmapsUrl: "https://maps.google.com/?q=38.9924969,-1.8585844",
      estado: "ok",
    },
    {
      id: "casa-de-oro",
      nombre: "Casa de Oro",
      lat: 38.997656,
      lng: -1.862753,
      gmapsUrl: "https://maps.google.com/?q=38.997656,-1.862753",
      estado: "ok",
    },
    {
      id: "san-juan-taperia",
      nombre: "San Juan Tapería",
      lat: 38.9951238,
      lng: -1.8566706,
      gmapsUrl: "https://maps.google.com/?q=38.9951238,-1.8566706",
      estado: "ok",
    },
    {
      id: "los-almendros",
      nombre: "Los Almendros",
      lat: 38.9824659,
      lng: -1.8555179,
      gmapsUrl: "https://maps.google.com/?q=38.9824659,-1.8555179",
      estado: "ok",
      notas: "Tu enlace abre 'Restaurante Bistro & Jazz El Almendro' — verificar que sea el local correcto.",
    },
    {
      id: "pasteleria-roldan",
      nombre: "Pastelería Roldán",
      lat: 38.9862627,
      lng: -1.8543907,
      gmapsUrl: "https://maps.google.com/?q=38.9862627,-1.8543907",
      estado: "ok",
    },
    {
      id: "zebende",
      nombre: "Zebende",
      lat: 38.9793787,
      lng: -1.8547456,
      gmapsUrl: "https://maps.google.com/?q=38.9793787,-1.8547456",
      estado: "ok",
    },
    {
      id: "cafeteria-politecnica",
      nombre: "Cafetería Politécnica",
      lat: 38.9786579,
      lng: -1.8577072,
      gmapsUrl: "https://maps.google.com/?q=38.9786579,-1.8577072",
      estado: "ok",
    },
  ];
  
  /** Solo los lugares con coordenadas (útil para pintar en el mapa). */
  export const LUGARES_OK: Lugar[] = LUGARES.filter(
    (l) => typeof l.lat === "number" && typeof l.lng === "number"
  );
  