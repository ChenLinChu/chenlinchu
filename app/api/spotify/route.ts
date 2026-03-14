import { getNowPlaying, getRecentlyPlayed } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<Response> {
    try {
        let data = await getNowPlaying();
        data ??= await getRecentlyPlayed();

        if (!data) {
            return Response.json({ isPlaying: false });
        }

        return Response.json(data);
    } catch {
        return Response.json({ isPlaying: false });
    }
}
