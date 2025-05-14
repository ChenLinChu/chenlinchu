import React from 'react';

import LocaleSwitch from '@/components/app/page/Section1/LocaleSwitch';
import Map from '@/components/app/page/Section1/Map';
import Profile from '@/components/app/page/Section1/Profile';
import Resume from '@/components/app/page/Section1/Resume';
import ToggleTheme from '@/components/app/page/Section1/ToggleTheme';
import Block from '@/components/Block';

import DinoGameComponent from './DinoGame';
import LocalTime from './LocalTime';

export default function Section1(): React.ReactNode {
    return (
        <>
            {/* Profile */}
            <Block
                column={'1 / span 3'}
                row={'1 / span 3'}
            >
                <Profile />
            </Block>

            {/* Local Time */}
            <Block
                column={'4 / span 3'}
                row={'1 / span 1'}
            >
                <LocalTime />
            </Block>

            {/* Locale Switch */}
            <Block
                column={'7 / span 2'}
                row={'1 / span 1'}
            >
                <LocaleSwitch />
            </Block>

            {/* Map */}
            <Block
                column={'4 / span 2'}
                row={'2 / span 2'}
                noPadding
            >
                <Map />
            </Block>

            {/* Toggle Theme */}
            <Block
                column={'6 / span 2'}
                row={'3 / span 1'}
            >
                <ToggleTheme />
            </Block>

            {/* Dino Game */}
            <Block
                column={'6 / span 3'}
                row={'2 / span 1'}
                noPadding
            >
                <DinoGameComponent />
            </Block>

            {/* Resume */}
            <Block
                column={'8 / span 1'}
                row={'3 / span 1'}
            >
                <Resume />
            </Block>
        </>
    );
}
