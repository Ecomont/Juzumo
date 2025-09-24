import { NextResponse } from 'next/server';
import { groq } from 'next-sanity';
import { sanityClient } from '../../../sanity/client';

const revalidatePaths = async () => {
  const query = groq`*[_type == "post"]{slug}`;
  const posts = await sanityClient.fetch(query);
  return posts.map(post => `/blog/${post.slug}`);
};

export async function GET() {
  const paths = await revalidatePaths();
  
  // Revalidate each path
  paths.forEach(path => {
    NextResponse.revalidate(path);
  });

  return NextResponse.json({ revalidated: true, now: Date.now() });
}