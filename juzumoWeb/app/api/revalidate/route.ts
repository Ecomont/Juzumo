import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Ensure this route isn't cached
export const dynamic = 'force-dynamic';

function getPathsFromRequest(request: Request): string[] {
  const url = new URL(request.url);
  const params = url.searchParams;

  const repeated = params.getAll('path'); // e.g. ?path=/a&path=/b
  const commaSeparated = (params.get('paths') || '') // e.g. ?paths=/a,/b
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);

  const merged = [...repeated, ...commaSeparated]
    .map((p) => (p.startsWith('/') ? p : `/${p}`))
    .map((p) => p.replace(/\/{2,}/g, '/')); // normalize double slashes

  return Array.from(new Set(merged)); // unique
}

export async function GET(request: Request) {
  try {
    const paths = getPathsFromRequest(request);
    if (paths.length === 0) {
      return NextResponse.json(
        {
          revalidated: false,
          error: 'Provide one or more paths via ?path=/a or ?paths=/a,/b',
        },
        { status: 400 }
      );
    }

    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: true, paths, now: Date.now() });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { revalidated: false, error: message },
      { status: 500 }
    );
  }
}