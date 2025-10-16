import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { POSTS } from "@/data/posts";
import Link from "next/link";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: "Artículo no encontrado · Blog" };
  const url = `https://juzumo.com/blog/${post.slug}`;
  return {
    title: `${post.titulo} · Blog`,
    description: post.extracto,
    alternates: { canonical: url },
    openGraph: {
      title: post.titulo,
      description: post.extracto,
      url,
      type: "article",
      images: post.portada ? [{ url: post.portada }] : undefined,
    },
  };
}

export default function PostPage({ params }: PageProps) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const fecha = new Date(post.fecha).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="mx-auto max-w-3xl px-4 pb-20">
      <nav className="mb-6 text-sm">
        <Link href="/blog" className="text-brand-green-700 hover:underline">
          ← Volver al blog
        </Link>
      </nav>

      <article className="prose prose-neutral max-w-none">
        <header className="not-prose mb-6">
          <h1 className="mb-2 text-3xl font-semibold text-gray-900">{post.titulo}</h1>
          <div className="text-sm text-gray-500">{fecha}</div>
        </header>

        {post.portada && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.portada}
            alt={post.titulo}
            className="mb-6 w-full rounded-xl border border-gray-100 object-cover"
          />
        )}

        {post.extracto && (
          <p className="text-lg text-gray-700">{post.extracto}</p>
        )}

        {!post.cuerpoMarkdown && (
          <p className="mt-6 text-gray-600">
            Estamos preparando el contenido completo de este artículo. Si quieres que te avisemos o necesitas detalles ya, escríbenos por WhatsApp y te ayudamos.
          </p>
        )}

        <div className="not-prose mt-8">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(post.titulo)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-green-700 px-4 py-2 text-white shadow hover:bg-brand-green-800"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </article>
    </main>
  );
}