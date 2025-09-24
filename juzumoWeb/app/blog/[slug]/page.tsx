type PageProps = {
  params: { slug: string };
};

export default function PostPage({ params }: PageProps) {
  const { slug } = params;
  const title = decodeURIComponent(slug)
    .split('-')
    .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s))
    .join(' ');

  return (
    <div>
      <h1>{title}</h1>
      {/* Content source removed (Sanity). Add your own content source here. */}
      <p>Content is unavailable.</p>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Contact us on WhatsApp
      </a>
    </div>
  );
}