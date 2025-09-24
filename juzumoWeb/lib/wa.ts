import { SITE } from './site';

export function waPedidoUrl(payload: {
  nombre?: string; barODireccion?: string;
  items?: Array<{ producto: string; cantidad: string }>;
  dia?: string; franja?: string;
}) {
  const lineas = [
    `Hola, soy ${payload.nombre ?? '—'}`,
    `Bar/Dirección: ${payload.barODireccion ?? '—'}`,
    `Pedido:`,
    ...(payload.items ?? []).map(i => `• ${i.producto} x ${i.cantidad}`),
    `Preferencia: ${payload.dia ?? '—'} ${payload.franja ?? ''}`,
  ];
  const text = encodeURIComponent(lineas.join('\n'));
  return `https://wa.me/${SITE.whatsapp}?text=${text}`;
}
