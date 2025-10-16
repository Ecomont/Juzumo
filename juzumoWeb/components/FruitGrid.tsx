"use client";

import Link from "next/link";
import type { Fruit } from "@/lib/types";

export type FruitGridProps = {
  fruits: Fruit[];
  className?: string;
  showBadges?: boolean; // Temporada / Ecológico / Nuevo
  newWindow?: boolean;  // abrir detalle en pestaña nueva
};

export default function FruitGrid({
  fruits,
  className = "",
  showBadges = true,
  newWindow = false,
}: FruitGridProps) {
  if (!fruits?.length) {
    return (
      <div className="rounded-2xl border border-gray-100 p-8 text-center text-gray-500">
        No hay productos que coincidan con los filtros.
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 ${className}`} role="list">
      {fruits.map(f => (
        <FruitCard key={f._id} f={f} showBadges={showBadges} newWindow={newWindow} />
      ))}
    </div>
  );
}

// ——— Card ———
function FruitCard({
  f,
  showBadges,
  newWindow,
}: {
  f: Fruit;
  showBadges: boolean;
  newWindow: boolean;
}) {
  const nuevo = isNewCard(f);
  const href = `/fruta/${encodeURIComponent(f._id)}`;

  return (
    <article role="listitem" className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md focus-within:shadow-md">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={f.foto || "/img/frutas/default.jpg"}
          alt={f.nombre}
          className="aspect-[4/3] w-full object-cover transition group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
        />

        {showBadges && (
          <div className="pointer-events-none absolute left-2 top-2 flex flex-wrap gap-2">
            {nuevo && <Badge variant="accent">Nuevo</Badge>}
            {f.temporal && <Badge>Temporada</Badge>}
            {f.ecologico && <Badge icon>Eco</Badge>}
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="line-clamp-1 text-sm font-medium text-gray-900">
          <Link
            href={href}
            className="outline-none focus:ring-2 focus:ring-brand-green-500/40"
            {...(newWindow ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {f.nombre}
          </Link>
        </h3>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-semibold">{formatPriceEuro(f.precio)}</span>
          <span className="text-xs text-gray-500">/ {f.unidad}</span>
        </div>

        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
          {f.origen && <span>Origen: {f.origen}</span>}
          {f.actualizadoEl && <span className="ml-auto" title="Última actualización">{friendlyDateShort(f.actualizadoEl)}</span>}
        </div>
      </div>
    </article>
  );
}

// ——— UI bits ———
function Badge({
  children,
  variant = "muted",
  icon = false,
}: {
  children: React.ReactNode;
  variant?: "muted" | "accent";
  icon?: boolean;
}) {
  const base = "pointer-events-none inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium";
  const styles = variant === "accent" ? "bg-brand-green-600 text-white" : "bg-white/95 text-gray-800 shadow-card";
  return (
    <span className={`${base} ${styles}`}>
      {icon && <span aria-hidden>🌿</span>}
      {children}
    </span>
  );
}

// ——— utils locales del componente ———
function isNewCard(f: Fruit, days = 14) {
  if (!f.actualizadoEl) return false;
  const updated = new Date(`${f.actualizadoEl}T00:00:00`);
  const now = new Date();
  return (now.getTime() - updated.getTime()) / 86400000 <= days;
}

function formatPriceEuro(n: number) {
  if (Number.isNaN(n)) return "-";
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n);
}

function friendlyDateShort(isoYYYYMMDD: string) {
  const [y, m, d] = isoYYYYMMDD.split("-").map(v => parseInt(v, 10));
  const date = new Date(y, (m || 1) - 1, d || 1);
  return date.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
}
