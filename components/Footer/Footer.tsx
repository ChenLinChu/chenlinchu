import { getLocale, getTranslations } from 'next-intl/server';
import React from 'react';

import Styles from './Footer.module.scss';

export default async function Footer(): Promise<React.ReactNode> {
    const locale = await getLocale();
    const t = await getTranslations({ locale, namespace: 'footer' });

    return (
        <div className={Styles.copyright}>
            {t('copyright')}
        </div>
    );
}
