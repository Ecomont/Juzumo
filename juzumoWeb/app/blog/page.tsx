import Link from "next/link";
import BlogList from "@/components/BlogList";
import { POSTS } from "@/data/posts";

function getParam(sp: Record<string, string | string[] | undefined> | undefined, key: string): string {
  const v = sp?.[key];
  if (Array.isArray(v)) return v[0] ?? "";
  return v ?? "";
}

export const metadata = {
  title: "Blog · Juzumo",
  description: "Consejos de temporada, logística de reparto y guías para bares y clientes.",
};

export default function BlogPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const q = getParam(searchParams, "q").toLowerCase().trim();
  const pageParam = parseInt(getParam(searchParams, "page") || "1", 10);
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const PAGE_SIZE = 9;

  // ordenar por fecha desc (ISO YYYY-MM-DD)
  let list = [...POSTS].sort((a, b) => (b.fecha > a.fecha ? 1 : -1));

  // filtro por búsqueda en título + extracto
  if (q) {
    list = list.filter((p) =>
      `${p.titulo} ${p.extracto}`.toLowerCase().includes(q)
    );
  }

  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const pageItems = list.slice(start, start + PAGE_SIZE);

  const featured = page === 1 && pageItems.length ? pageItems[0] : null;
  const rest = page === 1 ? pageItems.slice(1) : pageItems;

  const buildHref = (pageNum: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (pageNum > 1) params.set("page", String(pageNum));
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
    };

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20">
      {/* HERO */}
      <section className="relative mb-8 overflow-hidden rounded-2xl shadow-card">
        <div
          className="h-[220px] w-full bg-cover bg-center sm:h-[280px]"
          style={{ backgroundImage: "url(/img/hero-blog.png)" }}
          aria-label="Blog de fruta, verdura y hostelería"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-3 p-6 sm:p-8">
          <h1 className="text-3xl font-semibold text-white drop-shadow sm:text-4xl">Blog</h1>
          <p className="text-white/90 sm:text-lg">Consejos de temporada, logística y producto para bares y clientes.</p>
          <form method="get" action="/blog" className="mt-2 w-full max-w-md">
            <div className="relative">
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Buscar artículos (p. ej., naranja, temporada, logística)"
                className="w-full rounded-xl border border-white/70 bg-white/95 px-4 py-2 pl-9 text-sm text-gray-900 outline-none ring-brand-green-500/30 focus:ring"
              />
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
            </div>
          </form>
        </div>
      </section>

      {/* Resultado búsqueda */}
      {q && (
        <div className="mb-6 text-sm text-gray-600">
          Mostrando resultados para <span className="font-medium">“{q}”</span> · {total} artículo{total !== 1 ? "s" : ""}
          {total === 0 && (
            <>
              <span> · </span>
              <Link href="/blog" className="underline">Limpiar búsqueda</Link>
            </>
          )}
        </div>
      )}

      {/* Destacado en la primera página si hay items */}
      {featured && (
        <section className="mb-10">
          <Link href={`/blog/${featured.slug}`} className="block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.portada || "/img/blog/default.jpg"}
                alt={featured.titulo}
                className="h-56 w-full object-cover sm:h-full"
                loading="lazy"
              />
              <div className="p-4 sm:p-6">
                <div className="text-xs text-gray-500">{new Date(featured.fecha).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}</div>
                <h2 className="mt-1 line-clamp-2 text-xl font-semibold text-gray-900">{featured.titulo}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-gray-600">{featured.extracto}</p>
                <span className="mt-3 inline-block text-sm font-medium text-brand-green-700">Leer más →</span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Lista del resto */}
      <section>
        <BlogList posts={rest} />
      </section>

      {/* Paginación */}
      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-2 text-sm">
          <Link
            href={buildHref(Math.max(1, current - 1))}
            aria-disabled={current === 1}
            className={`rounded-base border px-3 py-2 ${current === 1 ? "pointer-events-none border-gray-200 text-gray-300" : "border-gray-300 hover:bg-gray-50"}`}
          >
            ← Anteriores
          </Link>
          <span className="px-2 text-gray-600">Página {current} de {totalPages}</span>
          <Link
            href={buildHref(Math.min(totalPages, current + 1))}
            aria-disabled={current === totalPages}
            className={`rounded-base border px-3 py-2 ${current === totalPages ? "pointer-events-none border-gray-200 text-gray-300" : "border-gray-300 hover:bg-gray-50"}`}
          >
            Siguientes →
          </Link>
        </nav>
      )}
      </main>
  );
}
