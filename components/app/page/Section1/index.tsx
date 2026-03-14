import React from 'react';

import LocaleSwitch from '@/components/app/page/Section1/LocaleSwitch';
import Map from '@/components/app/page/Section1/Map';
import Profile from '@/components/app/page/Section1/Profile';
import Resume from '@/components/app/page/Section1/Resume';
import ToggleTheme from '@/components/app/page/Section1/ToggleTheme';
import Block from '@/components/shared/Block';

import LocalTime from './LocalTime';
import SpotifyNowPlaying from './SpotifyNowPlaying';

export default function Section1(): React.ReactNode {
    return (
        <>
            {/* Profile */}
            <Block
                column={{
                    default: '1 / span 3',
                    xl: '1 / span 3',
                    lg: '1 / span 8'
                }}
                row={{
                    default: '1 / span 3',
                    xl: '1 / span 3',
                    lg: '1 / span 3'
                }}
            >
                <Profile />
            </Block>

            {/* Local Time */}
            <Block
                column={{
                    default: '4 / span 3',
                    xl: '4 / span 3',
                    lg: '4 / span 5'
                }}
                row={{
                    default: '1 / span 1',
                    xl: '1 / span 1',
                    lg: '4 / span 1'
                }}
            >
                <LocalTime />
            </Block>

            {/* Locale Switch */}
            <Block
                column={{
                    default: '7 / span 2',
                    xl: '7 / span 2',
                    lg: '1 / span 4'
                }}
                row={{
                    default: '1 / span 1',
                    xl: '1 / span 1',
                    lg: '5 / span 1'
                }}
            >
                <LocaleSwitch />
            </Block>

            {/* Map */}
            <Block
                column={{
                    default: '4 / span 2',
                    xl: '4 / span 2',
                    lg: '5 / span 4'
                }}
                row={{
                    default: '2 / span 2',
                    xl: '2 / span 2',
                    lg: '5 / span 1'
                }}
                noPadding
            >
                <Map />
            </Block>

            {/* Toggle Theme */}
            <Block
                column={{
                    default: '6 / span 2',
                    xl: '6 / span 2',
                    lg: '1 / span 3'
                }}
                row={{
                    default: '3 / span 1',
                    xl: '3 / span 1',
                    lg: '4 / span 1'
                }}
            >
                <ToggleTheme />
            </Block>

            {/* Spotify Now Playing */}
            <Block
                column={{
                    default: '6 / span 3',
                    xl: '6 / span 3',
                    lg: '1 / span 8'
                }}
                row={{
                    default: '2 / span 1',
                    xl: '2 / span 1',
                    lg: '6 / span 1'
                }}
            >
                <SpotifyNowPlaying />
            </Block>

            {/* Resume */}
            <Block
                column={{
                    default: '8 / span 1',
                    xl: '8 / span 1',
                    lg: '1 / span 2'
                }}
                row={{
                    default: '3 / span 1',
                    xl: '3 / span 1',
                    lg: '7 / span 1'
                }}
            >
                <Resume />
            </Block>
        </>
    );
}
