import { getTranslations } from 'next-intl/server';
import React from 'react';

import Styles from './index.module.scss';

export default async function Experience(): Promise<React.ReactNode> {
    const t = await getTranslations('main.page.block.experience');
    return (
        <div className={Styles.container}>
            <div className={Styles.title}>
                {t('title')}
            </div>
        </div>
    );
}
