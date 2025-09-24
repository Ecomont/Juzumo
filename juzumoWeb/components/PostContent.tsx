import React from 'react';
import { PortableText } from '@portabletext/react';
import { Post } from '../lib/types';

interface PostContentProps {
  post: Post;
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <article>
      <h1>{post.title}</h1>
      <img src={post.coverImage} alt={post.title} />
      <div>
        <PortableText value={post.content} />
      </div>
      <footer>
        <p>Published on: {new Date(post.date).toLocaleDateString()}</p>
        <a href={`https://wa.me/?text=${encodeURIComponent(post.title)}`}>Contact via WhatsApp</a>
      </footer>
    </article>
  );
};

export default PostContent;