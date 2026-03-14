'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useState } from 'react';

import type { NowPlayingData } from '@/lib/spotify';

import Styles from './index.module.scss';

export default function SpotifyNowPlaying(): React.ReactNode {
    const t = useTranslations('main.page.block.spotifyNowPlaying');
    const [data, setData] = useState<NowPlayingData | { isPlaying: false } | null>(
        null
    );

    const fetchNowPlaying = useCallback(async (): Promise<void> => {
        try {
            const response = await fetch('/api/spotify');
            const result = await response.json();
            setData(result);
        } catch {
            setData({ isPlaying: false });
        }
    }, []);

    useEffect(() => {
        void fetchNowPlaying();

        const interval = setInterval(() => void fetchNowPlaying(), 30_000);

        return () => clearInterval(interval);
    }, [fetchNowPlaying]);

    if (data === null) {
        return (
            <div className={Styles.container}>
                <div className={Styles.loading}>{t('loading')}</div>
            </div>
        );
    }

    if (!('title' in data)) {
        return (
            <div className={Styles.container}>
                <div className={Styles.spotifyIcon} />
                <div className={Styles.content}>
                    <div className={Styles.title}>{t('title')}</div>
                    <div className={Styles.notPlaying}>{t('notPlaying')}</div>
                </div>
            </div>
        );
    }

    const track = data;
    const sectionTitle =
        track.source === 'recently_played'
            ? t('recentlyPlayed')
            : t('title');

    return (
        <a
            className={Styles.container}
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className={Styles.albumArt}>
                {track.albumArt ? (
                    <Image
                        src={track.albumArt}
                        alt={track.title}
                        width={64}
                        height={64}
                    />
                ) : (
                    <div className={Styles.albumArtPlaceholder} />
                )}
                {track.isPlaying && (
                    <span
                        className={Styles.playingIndicator}
                        aria-hidden
                    >
                        ♪
                    </span>
                )}
            </div>
            <div className={Styles.content}>
                <div className={Styles.title}>{sectionTitle}</div>
                <div className={Styles.trackName}>{track.title}</div>
                <div className={Styles.artist}>{track.artist}</div>
            </div>
        </a>
    );
}
