"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FRUTAS } from "@/data/frutas";
import type { Fruit } from "@/lib/types";
import { SITE } from "@/lib/site";

// ====== Tipos ======
interface LineItem {
  id: string;
  nombre: string;
  unidad: string; // kg | caja | pieza | manojo | bandeja | etc
  precio: number; // €/unidad
  qty: number;    // cantidad
}

// ====== Utils ======
const EUR = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
function formatEuro(n: number) { return EUR.format(n); }
function isNew(f: Fruit, days = 1) {
  if (!f.actualizadoEl) return false;
  const updated = new Date(`${f.actualizadoEl}T00:00:00`);
  const now = new Date();
  return (now.getTime() - updated.getTime()) / 86400000 <= days;
}
function friendlyDate(isoYYYYMMDD?: string) {
  if (!isoYYYYMMDD) return "-";
  const [y, m, d] = isoYYYYMMDD.split("-").map((v) => parseInt(v, 10));
  const date = new Date(y, (m || 1) - 1, d || 1);
  return date.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
}

// ====== Persistencia local ======
const CART_KEY = "bares_cart_v1";
const LAST_ORDER_KEY = "bares_last_order_v1";
const TPL_PREFIX = "bares_tpl_";

function loadCart(): Record<string, LineItem> {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "{}"); } catch { return {}; }
}
function saveCart(state: Record<string, LineItem>) {
  try { localStorage.setItem(CART_KEY, JSON.stringify(state)); } catch {}
}
function saveLastOrder(state: Record<string, LineItem>) {
  try { localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(state)); } catch {}
}
function loadLastOrder(): Record<string, LineItem> | null {
  try { const s = localStorage.getItem(LAST_ORDER_KEY); return s ? JSON.parse(s) : null; } catch { return null; }
}
function listTemplates(): string[] {
  try {
    const out: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i) || "";
      if (k.startsWith(TPL_PREFIX)) out.push(k.slice(TPL_PREFIX.length));
    }
    return out.sort((a, b) => a.localeCompare(b, "es"));
  } catch {
    return [];
  }
}
function saveTemplate(name: string, state: Record<string, LineItem>) {
  try { localStorage.setItem(TPL_PREFIX + name, JSON.stringify(state)); } catch {}
}
function loadTemplate(name: string): Record<string, LineItem> | null {
  try { const s = localStorage.getItem(TPL_PREFIX + name); return s ? JSON.parse(s) : null; } catch { return null; }
}
function deleteTemplate(name: string) {
  try { localStorage.removeItem(TPL_PREFIX + name); } catch {}
}

// ====== Página principal ======
export default function BaresPage() {
  const [q, setQ] = useState("");
  const [soloTemporada, setSoloTemporada] = useState(false);
  const [soloLlegadoHoy, setSoloLlegadoHoy] = useState(false);
  const [orden, setOrden] = useState<"alpha" | "precioAsc" | "precioDesc">("alpha");

  const [cart, setCart] = useState<Record<string, LineItem>>({});
  const [tplNames, setTplNames] = useState<string[]>([]);

  // cargar carrito al montar
  useEffect(() => {
    setCart(loadCart());
    setTplNames(listTemplates());
  }, []);
  // guardar carrito cuando cambia
  useEffect(() => { saveCart(cart); }, [cart]);

  const productos = useMemo(() => {
    let base = [...FRUTAS];
    if (soloTemporada) base = base.filter((f) => f.temporal);
    if (soloLlegadoHoy) base = base.filter((f) => isNew(f, 1));
    if (q.trim()) {
      const t = q.trim().toLowerCase();
      base = base.filter((f) => [f.nombre, f.origen, f.unidad].some((s) => s?.toLowerCase().includes(t)));
    }
    switch (orden) {
      case "precioAsc": base.sort((a, b) => a.precio - b.precio); break;
      case "precioDesc": base.sort((a, b) => b.precio - a.precio); break;
      default: base.sort((a, b) => a.nombre.localeCompare(b.nombre, "es")); break;
    }
    return base;
  }, [q, soloTemporada, soloLlegadoHoy, orden]);

  const lines = Object.values(cart);
  const total = lines.reduce((s, l) => s + l.precio * l.qty, 0);

  function add(f: Fruit, inc = 1) {
    setCart((prev) => {
      const cur = prev[f._id];
      const nextQty = (cur?.qty || 0) + inc;
      if (nextQty <= 0) {
        const { [f._id]: _omit, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [f._id]: {
          id: f._id,
          nombre: f.nombre,
          unidad: f.unidad,
          precio: f.precio,
          qty: nextQty,
        },
      };
    });
  }

  function setQty(f: Fruit, qty: number) {
    setCart((prev) => {
      if (qty <= 0 || Number.isNaN(qty)) {
        const { [f._id]: _omit, ...rest } = prev; return rest;
      }
      return {
        ...prev,
        [f._id]: { id: f._id, nombre: f.nombre, unidad: f.unidad, precio: f.precio, qty },
      };
    });
  }

  function clearCart() { setCart({}); }
  function repeatLast() { const last = loadLastOrder(); if (last) setCart(last); }

  // WhatsApp message
  function buildWhatsApp(): string {
    const header = `Pedido para BARES`;
    const body = lines
      .map((l) => `• ${l.nombre} · ${l.qty} ${l.unidad} × ${formatEuro(l.precio)} = ${formatEuro(l.precio * l.qty)}`)
      .join("");
    const totalTxt = `Total: ${formatEuro(total)}`;
    const footer = `Entrega: Hoy/Mañana (indicar)
Observaciones:`;
    const url = typeof window !== "undefined" ? window.location.origin : "";
    const origin = `

Visto en: ${url}/bares`;
    return [header, body, totalTxt, footer, origin].filter(Boolean).join("");
  }

  const waHref = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(buildWhatsApp())}`;

  // Plantillas
  function saveTplFlow() {
    const name = prompt("Nombre de la plantilla (p. ej., Desayunos)")?.trim();
    if (!name) return;
    saveTemplate(name, cart);
    setTplNames(listTemplates());
  }
  function loadTplFlow() {
    if (!tplNames.length) return alert("No hay plantillas guardadas");
    const name = prompt(`Escribe el nombre de la plantilla a cargar:
${tplNames.join(", ")}`)?.trim();
    if (!name) return;
    const data = loadTemplate(name);
    if (data) setCart(data); else alert("No se encontró esa plantilla");
  }
  function delTplFlow() {
    if (!tplNames.length) return alert("No hay plantillas");
    const name = prompt(`Nombre de la plantilla a borrar:
${tplNames.join(", ")}`)?.trim();
    if (!name) return;
    deleteTemplate(name);
    setTplNames(listTemplates());
  }

  // Guardar último pedido al enviar (lo hacemos al hacer click por si vuelve atrás)
  function handleBeforeSend() { saveLastOrder(cart); }

  const fechaUltima = FRUTAS.map(f => f.actualizadoEl).filter(Boolean).sort().reverse()[0] ?? "-";

  return (
    <main className="mx-auto max-w-7xl px-4 pb-28">
      {/* HERO */}
      <section className="relative mb-6 overflow-hidden rounded-2xl shadow-card">
        <div
          className="h-[200px] w-full bg-cover bg-center sm:h-[260px]"
          style={{ backgroundImage: "url(/img/bares/hero.jpg)" }}
          aria-label="Pedido rápido para bares"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-2 p-6 sm:p-8">
          <h1 className="text-3xl font-semibold text-white drop-shadow sm:text-4xl">Bares · Pedido rápido</h1>
          <p className="text-white/90 sm:text-base">Corte 12:00 · Entrega en Albacete. Actualizado: {fechaUltima}</p>
          <div className="mt-1 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-white/90 px-3 py-1 text-gray-900">Repite tu último pedido en 1 clic</span>
            <button onClick={repeatLast} className="rounded-full bg-brand-green-600 px-3 py-1 text-white shadow-card transition hover:brightness-110">Repetir último</button>
          </div>
        </div>
      </section>

      {/* FILTROS sticky */}
      <section className="sticky top-0 z-20 -mx-4 mb-4 border-b border-gray-100 bg-white/90 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 sm:grid-cols-12 sm:items-center">
          <div className="sm:col-span-5">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Busca rápido (p. ej., naranja, eco, kg)"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 pl-9 text-sm outline-none ring-brand-green-500/30 focus:ring"
              />
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:col-span-5">
            <button onClick={() => setSoloTemporada((v) => !v)}
              className={`rounded-full px-3 py-1 text-sm transition ${soloTemporada ? "bg-brand-green-600 text-white shadow" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}>Temporada</button>
            <button onClick={() => setSoloLlegadoHoy((v) => !v)}
              className={`rounded-full px-3 py-1 text-sm transition ${soloLlegadoHoy ? "bg-brand-green-600 text-white shadow" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}>Llegado hoy</button>
            <select value={orden} onChange={(e) => setOrden(e.target.value as any)} className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm">
              <option value="alpha">A‑Z</option>
              <option value="precioAsc">Precio ↑</option>
              <option value="precioDesc">Precio ↓</option>
            </select>
          </div>

          <div className="flex items-center gap-2 sm:col-span-2 sm:justify-end">
            <button onClick={saveTplFlow} className="rounded-base border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50">Guardar plantilla</button>
            <button onClick={loadTplFlow} className="rounded-base border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50">Cargar</button>
            <button onClick={delTplFlow} className="rounded-base border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50" title="Borrar plantilla">Borrar</button>
          </div>
        </div>
      </section>

      {/* LAYOUT: lista + dock */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* LISTA COMPACTA */}
        <section className="md:col-span-8 lg:col-span-9">
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="sticky top-[64px] z-10 bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-3 py-3 text-left">Producto</th>
                  <th className="px-3 py-3 text-right">Precio</th>
                  <th className="px-3 py-3 text-left">Unidad</th>
                  <th className="px-3 py-3 text-center">Cantidad</th>
                  <th className="px-3 py-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((f) => {
                  const line = cart[f._id];
                  const sub = line ? line.precio * line.qty : 0;
                  return (
                    <tr key={f._id} className="border-t border-gray-100 hover:bg-gray-50/60">
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={f.foto || "/img/frutas/default.jpg"} alt="" className="h-10 w-12 rounded object-cover" loading="lazy" />
                          <div>
                            <Link href={`/fruta/${f._id}`} className="font-medium text-gray-900 hover:underline">{f.nombre}</Link>
                            <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
                              {f.origen && <span>Origen: {f.origen}</span>}
                              {isNew(f, 1) && <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-700">Hoy</span>}
                              {f.temporal && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-700">Temporada</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-right whitespace-nowrap">{formatEuro(f.precio)}</td>
                      <td className="px-3 py-3">{f.unidad}</td>
                      <td className="px-3 py-3">
                        <div className="mx-auto flex max-w-[180px] items-center justify-center gap-2">
                          <button onClick={() => add(f, -1)} className="h-8 w-8 rounded border border-gray-300 leading-none hover:bg-gray-50" aria-label={`Quitar ${f.nombre}`}>−</button>
                          <input
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className="w-14 rounded border border-gray-300 px-2 py-1 text-center"
                            value={line?.qty ?? 0}
                            onChange={(e) => setQty(f, Math.max(0, parseInt(e.target.value || "0", 10)))}
                          />
                          <button onClick={() => add(f, +1)} className="h-8 w-8 rounded border border-gray-300 leading-none hover:bg-gray-50" aria-label={`Añadir ${f.nombre}`}>＋</button>
                          {/* atajos */}
                          <button onClick={() => setQty(f, 5)} className="rounded border border-gray-300 px-2 py-1 text-xs hover:bg-gray-50">x5</button>
                          <button onClick={() => setQty(f, 10)} className="rounded border border-gray-300 px-2 py-1 text-xs hover:bg-gray-50">x10</button>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-right font-medium">{sub ? formatEuro(sub) : "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* DOCK DE PEDIDO */}
        <aside className="md:col-span-4 lg:col-span-3">
          <div className="sticky top-[92px] rounded-2xl border border-gray-100 bg-white p-4 shadow-card">
            <h2 className="mb-2 text-lg font-semibold">Tu pedido</h2>
            {lines.length === 0 ? (
              <p className="text-sm text-gray-500">Añade productos desde la lista para construir tu pedido.</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {lines.map((l) => (
                  <li key={l.id} className="py-2 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="font-medium text-gray-900">{l.nombre}</div>
                        <div className="text-xs text-gray-500">{l.qty} {l.unidad} × {formatEuro(l.precio)}</div>
                      </div>
                      <div className="text-right font-medium">{formatEuro(l.precio * l.qty)}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">{formatEuro(total)}</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <button onClick={clearCart} className="rounded-base border border-gray-300 px-3 py-2 hover:bg-gray-50">Vaciar</button>
              <button onClick={saveTplFlow} className="rounded-base border border-gray-300 px-3 py-2 hover:bg-gray-50">Guardar tpl</button>
              <button onClick={loadTplFlow} className="rounded-base border border-gray-300 px-3 py-2 hover:bg-gray-50">Cargar tpl</button>
              <button onClick={delTplFlow} className="rounded-base border border-gray-300 px-3 py-2 hover:bg-gray-50">Borrar tpl</button>
            </div>

            <a href={waHref} onClick={handleBeforeSend} className={`mt-4 block rounded-base px-4 py-3 text-center text-white shadow-card transition ${lines.length ? "bg-brand-green-600 hover:brightness-110" : "pointer-events-none bg-gray-300"}`}>
              Enviar por WhatsApp
            </a>

            <p className="mt-2 text-xs text-gray-500">
              Al enviar, guardamos este pedido como “último” para que puedas repetirlo.
            </p>
          </div>
        </aside>
      </div>

      {/* DOCK inferior para móvil (duplicado simple del CTA) */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-200 bg-white/95 p-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="flex-1 text-sm">
            <div className="font-medium">Total</div>
            <div className="text-gray-600">{formatEuro(total)}</div>
          </div>
          <a href={waHref} onClick={handleBeforeSend} className={`flex-1 rounded-base px-4 py-3 text-center text-white shadow-card transition ${lines.length ? "bg-brand-green-600 hover:brightness-110" : "pointer-events-none bg-gray-300"}`}>
            WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}

