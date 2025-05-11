import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import Section1 from '@/components/app/page/Section1';
import Section2 from '@/components/app/page/Section2';

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
            <Section1 />
            <Section2 />
        </div>
    );
}
