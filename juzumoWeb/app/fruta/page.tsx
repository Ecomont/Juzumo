"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import FruitGrid from "@/components/FruitGrid";
import { FRUTAS } from "@/data/frutas";
import type { Fruit } from "@/lib/types";

// ——— helpers locales de la página ———
function isNew(f: Fruit, days = 14) {
  if (!f.actualizadoEl) return false;
  const updated = new Date(`${f.actualizadoEl}T00:00:00`);
  const now = new Date();
  return (now.getTime() - updated.getTime()) / 86400000 <= days;
}

const ORIGENES = Array.from(new Set(FRUTAS.map(f => f.origen).filter(Boolean))).sort();

export default function Page() {
  const [soloTemporada, setSoloTemporada] = useState(false);
  const [soloEco, setSoloEco] = useState(false);
  const [origen, setOrigen] = useState<string | "">("");
  const [q, setQ] = useState("");
  const [orden, setOrden] = useState<"novedades" | "precioAsc" | "precioDesc">("novedades");

  const filtrada = useMemo(() => {
    let base = [...FRUTAS];
    if (soloTemporada) base = base.filter(f => f.temporal);
    if (soloEco) base = base.filter(f => f.ecologico);
    if (origen) base = base.filter(f => f.origen === origen);
    if (q.trim()) {
      const t = q.trim().toLowerCase();
      base = base.filter(f => [f.nombre, f.origen].some(s => s?.toLowerCase().includes(t)));
    }
    switch (orden) {
      case "precioAsc":  base.sort((a, b) => a.precio - b.precio); break;
      case "precioDesc": base.sort((a, b) => b.precio - a.precio); break;
      default:           base.sort((a, b) => Number(isNew(b)) - Number(isNew(a))); break;
    }
    return base;
  }, [soloTemporada, soloEco, origen, q, orden]);

  const fechaUltima = FRUTAS
    .map(f => f.actualizadoEl)
    .filter(Boolean)
    .sort()
    .reverse()[0] ?? "-";

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20">
      {/* HERO */}
      <section className="relative mb-8 overflow-hidden rounded-2xl shadow-card">
        <div
          className="h-[260px] w-full bg-cover bg-center sm:h-[320px]"
          style={{ backgroundImage: "url(/img/hero-fruta.png)" }}
          aria-label="Fruta fresca de temporada"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-3 p-6 sm:p-8">
          <h1 className="text-3xl font-semibold text-white drop-shadow sm:text-4xl">
            Fruta fresca de temporada
          </h1>
          <p className="text-white/90 sm:text-lg">Precios claros, entrega rápida en Albacete.</p>
          <div className="mt-1 flex gap-3">
            <a href="#novedades" className="rounded-base bg-brand-green-600 px-4 py-2 text-white shadow-card transition hover:brightness-110">Ver novedades</a>
            <a href="#catalogo" className="rounded-base bg-white/95 px-4 py-2 text-gray-900 shadow-card transition hover:bg-white">Ver precios</a>
          </div>
        </div>
      </section>

      {/* barra informativa */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-green-700">🌿 De la finca a tu mesa</span>
          <span className="hidden sm:inline">·</span>
          <span>Actualizado: {fechaUltima}</span>
        </div>
        <Link href="/resenas" className="underline hover:text-gray-900">Ver reseñas locales</Link>
      </div>

      {/* FILTROS sticky */}
      <section id="catalogo" className="sticky top-0 z-10 mb-6 -mx-4 border-b border-gray-100 bg-white/90 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
          <div className="relative grow sm:grow-0 sm:basis-72">
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Busca… (p. ej., naranja, Huelva)"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 pl-9 text-sm outline-none ring-brand-green-500/30 focus:ring"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
          </div>

          <button onClick={() => setSoloTemporada(v => !v)}
                  className={`rounded-full px-3 py-1 text-sm transition ${soloTemporada ? "bg-brand-green-600 text-white shadow" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}>
            Temporada
          </button>

          <button onClick={() => setSoloEco(v => !v)}
                  className={`rounded-full px-3 py-1 text-sm transition ${soloEco ? "bg-brand-green-600 text-white shadow" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}>
            Ecológico
          </button>

          <select value={origen} onChange={e => setOrigen(e.target.value)} className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm">
            <option value="">Origen: todos</option>
            {ORIGENES.map(o => <option key={o} value={o}>{o}</option>)}
          </select>

          <div className="ml-auto">
            <select value={orden} onChange={e => setOrden(e.target.value as any)} className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm" title="Ordenar">
              <option value="novedades">Novedades primero</option>
              <option value="precioAsc">Precio: más barato</option>
              <option value="precioDesc">Precio: más caro</option>
            </select>
          </div>
        </div>
      </section>

      {/* NOVEDADES */}
      <section id="novedades" className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">Novedades</h2>
        <p className="mb-4 text-sm text-gray-500">Productos actualizados en los últimos 14 días.</p>
        <FruitGrid fruits={FRUTAS.filter(isNew).slice(0, 8)} />
      </section>

      {/* CATÁLOGO */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Catálogo</h2>
          <span className="text-sm text-gray-500">{filtrada.length} productos</span>
        </div>
        <FruitGrid fruits={filtrada} />
        <div className="mt-10 text-center">
          <a className="inline-block rounded-base bg-brand-green-600 px-6 py-3 text-white shadow-card transition hover:brightness-110" href="https://wa.me/">
            ¿Tienes dudas? Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
