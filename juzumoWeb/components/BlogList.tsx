import React from "react";
import type { Post } from "@/lib/types";
import Link from "next/link";

interface BlogListProps {
  posts: Post[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const fecha = new Date(post.fecha).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        return (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
          >
            {post.portada && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.portada}
                alt={post.titulo}
                className="h-44 w-full object-cover transition duration-300 group-hover:opacity-95 sm:h-40"
                loading="lazy"
              />
            )}
            <div className="p-4">
              <div className="text-xs text-gray-500">{fecha}</div>
              <h2 className="mt-1 line-clamp-2 text-lg font-semibold text-gray-900">
                {post.titulo}
              </h2>
              {post.extracto && (
                <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                  {post.extracto}
                </p>
              )}
              <span className="mt-3 inline-block text-sm font-medium text-brand-green-700">Leer más →</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogList;