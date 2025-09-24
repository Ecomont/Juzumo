import React from 'react';
import { Post } from '../../lib/types';

interface PostPreviewProps {
  value: Post;
}

const PostPreview: React.FC<PostPreviewProps> = ({ value }) => {
  return (
    <div>
      <h2>{value.title}</h2>
      <p>{value.excerpt}</p>
      <img src={value.portada} alt={value.title} />
      <p>{new Date(value.fecha).toLocaleDateString()}</p>
    </div>
  );
};

export default PostPreview;