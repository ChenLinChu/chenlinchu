const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT =
    'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT =
    'https://api.spotify.com/v1/me/player/recently-played';

interface SpotifyTokenResponse {
    access_token: string;
}

interface SpotifyTrack {
    name: string;
    external_urls: { spotify: string };
    artists: Array<{ name: string }>;
    album: {
        name: string;
        images: Array<{ url: string }>;
    };
}

interface SpotifyCurrentlyPlayingResponse {
    is_playing: boolean;
    item: SpotifyTrack;
}

export interface NowPlayingData {
    title: string;
    artist: string;
    albumArt: string;
    songUrl: string;
    isPlaying: boolean;
    source?: 'now_playing' | 'recently_played';
}

interface SpotifyPlayHistoryItem {
    track: SpotifyTrack;
}

interface SpotifyRecentlyPlayedResponse {
    items: SpotifyPlayHistoryItem[];
}

async function getAccessToken(): Promise<string> {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error('Spotify credentials not configured');
    }

    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        })
    });

    if (!response.ok) {
        throw new Error('Failed to refresh Spotify token');
    }

    const data = (await response.json()) as SpotifyTokenResponse;
    return data.access_token;
}

export async function getNowPlaying(): Promise<NowPlayingData | null> {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (response.status === 204) {
            return null;
        }

        if (!response.ok) {
            return null;
        }

        const data =
            (await response.json()) as SpotifyCurrentlyPlayingResponse;

        if (!data.item) {
            return null;
        }

        const image = data.item.album.images?.[0]?.url ?? '';

        return {
            title: data.item.name,
            artist: data.item.artists.map((a) => a.name).join(', '),
            albumArt: image,
            songUrl: data.item.external_urls.spotify,
            isPlaying: data.is_playing ?? false,
            source: 'now_playing'
        };
    } catch {
        return null;
    }
}

export async function getRecentlyPlayed(): Promise<NowPlayingData | null> {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch(
            `${RECENTLY_PLAYED_ENDPOINT}?limit=1`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        if (!response.ok) {
            return null;
        }

        const data =
            (await response.json()) as SpotifyRecentlyPlayedResponse;

        if (!data.items?.length || !data.items[0].track) {
            return null;
        }

        const track = data.items[0].track;
        const image = track.album.images?.[0]?.url ?? '';

        return {
            title: track.name,
            artist: track.artists.map((a) => a.name).join(', '),
            albumArt: image,
            songUrl: track.external_urls.spotify,
            isPlaying: false,
            source: 'recently_played'
        };
    } catch {
        return null;
    }
}
