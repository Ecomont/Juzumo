import React from 'react';
import { Post } from '../lib/types';
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
            <h2>{post.title}</h2>
            <p>{new Date(post.date).toLocaleDateString()}</p>
            <p>{post.excerpt}</p>
            {post.coverImage && (
              <img src={post.coverImage} alt={post.title} />
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;