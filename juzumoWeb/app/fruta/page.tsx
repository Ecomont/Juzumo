"use client";

import { useEffect, useMemo, useState } from "react";
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

function updatedTime(f: Fruit) {
  return f.actualizadoEl ? new Date(`${f.actualizadoEl}T00:00:00`).getTime() : 0;
}

const ORIGENES = Array.from(new Set(FRUTAS.map(f => f.origen).filter(Boolean))).sort();

export default function Page() {
  const [soloTemporada, setSoloTemporada] = useState(false);
  const [soloEco, setSoloEco] = useState(false);
  const [origen, setOrigen] = useState<string | "">("");
  const [q, setQ] = useState("");
  const [orden, setOrden] = useState<"novedades" | "precioAsc" | "precioDesc">("novedades");
  
  // Visibles por sección (mostrar más incremental)
  const MAX_ITEMS = 10;
  const [visibleNovedades, setVisibleNovedades] = useState(MAX_ITEMS);
  const [visibleTemporada, setVisibleTemporada] = useState(MAX_ITEMS);
  const [visibleEcologico, setVisibleEcologico] = useState(MAX_ITEMS);
  const [visibleResto, setVisibleResto] = useState(MAX_ITEMS);

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
      case "precioAsc":
        base.sort((a, b) => a.precio - b.precio);
        break;
      case "precioDesc":
        base.sort((a, b) => b.precio - a.precio);
        break;
      default:
        // Novedades primero y, a igualdad, más reciente primero
        base.sort((a, b) => {
          const byNew = Number(isNew(b)) - Number(isNew(a));
          if (byNew !== 0) return byNew;
          const byUpdated = updatedTime(b) - updatedTime(a);
          if (byUpdated !== 0) return byUpdated;
          // desempate por precio asc para estabilidad
          return a.precio - b.precio;
        });
        break;
    }
    return base;
  }, [soloTemporada, soloEco, origen, q, orden]);

  // Agrupar productos por categoría
  const novedades = useMemo(() => FRUTAS.filter(isNew).sort((a, b) => updatedTime(b) - updatedTime(a)), []);
  const temporada = useMemo(() => filtrada.filter(f => f.temporal), [filtrada]);
  const ecologico = useMemo(() => filtrada.filter(f => f.ecologico), [filtrada]);
  const resto = useMemo(() => filtrada.filter(f => !f.temporal && !f.ecologico), [filtrada]);

  // Cálculo de siguiente cantidad visible: +2 la primera vez; luego +10; reset si ya está completo
  const nextVisible = (current: number, total: number) => {
    if (current >= total) return MAX_ITEMS; // "Ver menos"
    if (current === MAX_ITEMS) return Math.min(total, current + 2);
    return Math.min(total, current + 10);
  };

  // Reiniciar listas visibles cuando cambian los filtros/búsqueda/orden
  useEffect(() => {
    setVisibleNovedades(MAX_ITEMS);
    setVisibleTemporada(MAX_ITEMS);
    setVisibleEcologico(MAX_ITEMS);
    setVisibleResto(MAX_ITEMS);
  }, [soloTemporada, soloEco, origen, q, orden]);

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

      {/* FILTROS sticky */}
      <section id="catalogo" className="sticky top-16 z-10 mb-8 -mx-4 border-b border-gray-100 bg-white/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-sm">
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

      {/* NOVEDADES (solo sin filtros activos y con orden = novedades) */}
      {!q && !soloTemporada && !soloEco && !origen && orden === "novedades" && (
        <section id="novedades" className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">✨ Novedades</h2>
            <p className="text-gray-600">Lo más reciente y fresco que tenemos para ti</p>
          </div>
          <FruitGrid fruits={novedades.slice(0, visibleNovedades)} className="gap-6" />
          {novedades.length > MAX_ITEMS && (
            <div className="text-center mt-6">
              <button
                onClick={() => setVisibleNovedades(nextVisible(visibleNovedades, novedades.length))}
                className="rounded-full border border-gray-300 px-6 py-2 text-sm hover:bg-gray-50 transition-colors"
              >
                {visibleNovedades >= novedades.length ? '↑ Ver menos' : '↓ Ver más'}
              </button>
            </div>
          )}
        </section>
      )}

      {/* CATÁLOGO POR CATEGORÍAS */}
      {!q && !soloTemporada && !soloEco && !origen && orden === "novedades" ? (
        // Vista por categorías cuando no hay filtros activos
        <>
          {temporada.length > 0 && (
            <section className="mb-12">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">🍊 De Temporada</h2>
                <p className="text-gray-600">Frutas y verduras en su mejor momento</p>
              </div>
                <FruitGrid fruits={temporada.slice(0, visibleTemporada)} className="gap-6" />
                {temporada.length > MAX_ITEMS && (
                  <div className="text-center mt-6">
                    <button
                      onClick={() => setVisibleTemporada(nextVisible(visibleTemporada, temporada.length))}
                      className="rounded-full border border-gray-300 px-6 py-2 text-sm hover:bg-gray-50 transition-colors"
                    >
                      {visibleTemporada >= temporada.length ? '↑ Ver menos' : '↓ Ver más'}
                    </button>
                  </div>
                )}
            </section>
          )}

          {ecologico.length > 0 && (
            <section className="mb-12">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">🌿 Ecológico</h2>
                <p className="text-gray-600">Cultivado con respeto al medio ambiente</p>
              </div>
                <FruitGrid fruits={ecologico.slice(0, visibleEcologico)} className="gap-6" />
                {ecologico.length > MAX_ITEMS && (
                  <div className="text-center mt-6">
                    <button
                      onClick={() => setVisibleEcologico(nextVisible(visibleEcologico, ecologico.length))}
                      className="rounded-full border border-gray-300 px-6 py-2 text-sm hover:bg-gray-50 transition-colors"
                    >
                      {visibleEcologico >= ecologico.length ? '↑ Ver menos' : '↓ Ver más'}
                    </button>
                  </div>
                )}
            </section>
          )}

          {resto.length > 0 && (
            <section className="mb-12">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">🥝 Todo el año</h2>
                <p className="text-gray-600">Disponibles siempre para ti</p>
              </div>
                <FruitGrid fruits={resto.slice(0, visibleResto)} className="gap-6" />
                {resto.length > MAX_ITEMS && (
                  <div className="text-center mt-6">
                    <button
                      onClick={() => setVisibleResto(nextVisible(visibleResto, resto.length))}
                      className="rounded-full border border-gray-300 px-6 py-2 text-sm hover:bg-gray-50 transition-colors"
                    >
                      {visibleResto >= resto.length ? '↑ Ver menos' : '↓ Ver más'}
                    </button>
                  </div>
                )}
            </section>
          )}
        </>
      ) : (
        // Vista unificada cuando hay filtros activos
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Resultados</h2>
              <p className="text-gray-600">{filtrada.length} productos encontrados</p>
            </div>
          </div>
          <FruitGrid fruits={filtrada} className="gap-6" />
        </section>
      )}
      </main>
  );
}
