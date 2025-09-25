import React from 'react';
import type { Post } from '@/lib/types';

import Link from 'next/link';

interface BlogListProps {
  posts: Post[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div className="blog-list">
      {posts.map((post) => (
        <div key={post.slug} className="blog-item">
          <Link href={`/blog/${post.slug}`}>
            <h2>{post.titulo}</h2>
            <p>{new Date(post.fecha).toLocaleDateString()}</p>
            <p>{post.extracto}</p>
            {post.portada && (
              <img src={post.portada} alt={post.titulo} />
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;