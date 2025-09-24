import { useEffect, useState } from 'react';
import { client } from '../../../sanity/client';
import { BlogList } from '../../../components/BlogList';
import { groq } from 'next-sanity';

const query = groq`
  *[_type == "post"] | order(date desc) {
    title,
    slug,
    date,
    excerpt,
    mainImage {
      asset -> {
        _id,
        url
      }
    }
  }
`;

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await client.fetch(query);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Blog</h1>
      <BlogList posts={posts} />
    </div>
  );
};

export default BlogPage;