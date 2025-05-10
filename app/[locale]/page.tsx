import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import Block from '@/components/Block/Block';
import LocaleSwitch from '@/components/BlockComponents/LocaleSwitch';
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
            <Block
                column={'1 / span 5'}
                row={'1 / span 3'}
            >
                <h1>Hello</h1>
                <p>Lorem ipsum dolor sit amet</p>
            </Block>
            <Block
                column={'6 / span 1'}
                row={'1 / span 1'}
            >
                <ToggleTheme />
            </Block>
            <Block
                column={'7 / span 1'}
                row={'1 / span 1'}
            >
                <LocaleSwitch />
            </Block>
            <Block
                column={'8 / span 1'}
                row={'1 / span 1'}
            >
                <h1>Hello</h1>
                <p>elit. Eum iusto vel perspiciatis sint</p>
            </Block>
            <Block
                column={'6 / span 1'}
                row={'2 / span 1'}
            >
                <h1>Hello</h1>
                <p>elit. Eum iusto vel perspiciatis sint</p>
            </Block>
            <Block
                column={'7 / span 1'}
                row={'2 / span 1'}
            >
                <h1>Hello</h1>
                <p>elit. Eum iusto vel perspiciatis sint</p>
            </Block>
            <Block
                column={'8 / span 1'}
                row={'2 / span 1'}
            >
                <h1>Hello</h1>
                <p>elit. Eum iusto vel perspiciatis sint</p>
            </Block>
            <Block
                column={'6 / span 1'}
                row={'3 / span 1'}
            >
                <h1>Hello</h1>
                <p>elit. Eum iusto vel perspiciatis sint</p>
            </Block>
            <Block
                column={'7 / span 1'}
                row={'3 / span 1'}
            >
                <h1>Hello</h1>
                <p>elit. Eum iusto vel perspiciatis sint</p>
            </Block>
            <Block
                column={'8 / span 1'}
                row={'3 / span 1'}
            >
                <h1>Hello</h1>
                <p>elit. Eum iusto vel perspiciatis sint</p>
            </Block>
            <Block
                column={'1 / span 8'}
                row={'4 / span 5'}
            >
                <h1>Hello</h1>
                <p>elit. Eum iusto vel perspiciatis sint</p>
            </Block>
        </div>
    );
}
