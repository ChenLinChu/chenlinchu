import { unstable_cache } from 'next/cache';

import { getNowPlaying, getRecentlyPlayed } from '@/lib/spotify';

type SpotifyResponse =
    | { isPlaying: false }
    | Awaited<ReturnType<typeof getNowPlaying>>;

async function fetchSpotifyData(): Promise<SpotifyResponse> {
    let data = await getNowPlaying();
    data ??= await getRecentlyPlayed();

    if (!data) {
        return { isPlaying: false };
    }

    return data;
}

const getCachedSpotifyData = unstable_cache(
    fetchSpotifyData,
    ['spotify-now-playing'],
    { revalidate: 180 }
);

export async function GET(): Promise<Response> {
    try {
        const data = await getCachedSpotifyData();
        return Response.json(data);
    } catch {
        return Response.json({ isPlaying: false });
    }
}
