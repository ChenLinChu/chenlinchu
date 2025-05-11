import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import Block from '@/components/Block/Block';
import LocaleSwitch from '@/components/BlockComponents/LocaleSwitch';
import Profile from '@/components/BlockComponents/Profile';
import ToggleTheme from '@/components/BlockComponents/ToggleTheme';

import Styles from './page.module.scss';

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string; }> }
): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.page' });

    return {
        title: t('title'),
        description: t('description')
    };
}

export default function Index(): React.ReactNode {
    return (
        <div className={Styles.container}>
            {/* Profile */}
            <Block
                column={'1 / span 3'}
                row={'1 / span 3'}
            >
                <Profile />
            </Block>

            <Block
                column={'4 / span 3'}
                row={'1 / span 1'}
            >
                <p>當地時間</p>
            </Block>

            {/* Locale Switch */}
            <Block
                column={'7 / span 2'}
                row={'1 / span 1'}
            >
                <p>語系切換</p>
                <LocaleSwitch />
            </Block>

            <Block
                column={'4 / span 2'}
                row={'2 / span 2'}
            >
                <p>地圖</p>
            </Block>

            <Block
                column={'6 / span 3'}
                row={'2 / span 1'}
            >
                <p>履歷</p>
            </Block>

            {/* Toggle Theme */}
            <Block
                column={'6 / span 4'}
                row={'3 / span 1'}
            >
                <p>主題切換</p>
                <ToggleTheme />
            </Block>

            <Block
                column={'1 / span 1'}
                row={'4 / span 1'}
            >
                <p>LinkedIn</p>
            </Block>

            <Block
                column={'1 / span 1'}
                row={'5 / span 1'}
            >
                <p>Email</p>
            </Block>

            <Block
                column={'1 / span 1'}
                row={'6 / span 1'}
            >
                <p>GitHub</p>
            </Block>

            <Block
                column={'2 / span 3'}
                row={'4 / span 3'}
            >
                <p>技能樹</p>
            </Block>

            <Block
                column={'5 / span 4'}
                row={'4 / span 4'}
            >
                <p>職涯經歷</p>
            </Block>
        </div>
    );
}
