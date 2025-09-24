import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { sanityClient } from '../../../sanity/client';
import { Post } from '../../../lib/types';
import PostContent from '../../../components/PostContent';

const PostPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        const query = `*[_type == "post" && slug.current == $slug][0]{
          title,
          slug,
          date,
          mainImage,
          excerpt,
          body
        }`;
        const postData = await sanityClient.fetch(query, { slug });
        setPost(postData);
        setLoading(false);
      };

      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.mainImage.asset.url} alt={post.title} />
      <PostContent content={post.body} />
      <a href={`https://wa.me/?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer">
        Contact us on WhatsApp
      </a>
    </div>
  );
};

export default PostPage;