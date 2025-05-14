'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import type { ReactNode } from 'react';

import { useTheme } from '@/app/providers/ThemeProvider';

import Styles from './index.module.scss';

export default function Map(): ReactNode {
    const locale = useLocale();
    const { theme } = useTheme();

    return (
        <div className={Styles.container}>
            <Image
                src={`/images/map/map_${locale}_${theme}.jpg`}
                alt="Map of the location"
                className={Styles.map}
                width={1000}
                height={1000}
                priority
            />
        </div >
    );
}
