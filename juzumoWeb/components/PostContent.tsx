import React from 'react';

import type { Post } from '../lib/types';

interface PostContentProps {
  post: Post;
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <article>
      <h1>{post.titulo}</h1>
      
  
      <footer>
        <p>Published on: {new Date(post.fecha).toLocaleDateString()}</p>
        <a href={`https://wa.me/?text=${encodeURIComponent(post.titulo)}`}>Contact via WhatsApp</a>
      </footer>
    </article>
  );
};

export default PostContent;