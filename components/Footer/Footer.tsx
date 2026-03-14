import { getTranslations } from 'next-intl/server';
import React from 'react';

import Styles from './Footer.module.scss';

export default async function Footer(): Promise<React.ReactNode> {
    const t = await getTranslations('footer');

    return (
        <div className={Styles.wrapper}>
            <p className={Styles.copyright}>{t('copyright')}</p>
            <p className={Styles.aiCitation}>{t('aiCitation')}</p>
        </div>
    );
}
