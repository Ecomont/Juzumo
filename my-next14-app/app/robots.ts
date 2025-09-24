User requested the contents of the file: /my-next14-app/my-next14-app/app/robots.ts

User specification for the file:

The app/robots.ts file generates the robots.txt for SEO.

Here are the contents for the file:

export const runtime = 'edge';

export default function handler(req: Request) {
  const res = new Response(
    `User-agent: *
Disallow: /api/
Disallow: /dashboard/
Allow: /`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );

  return res;
}