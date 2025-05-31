import { getTranslations } from 'next-intl/server';
import React from 'react';

import Styles from './Footer.module.scss';

export default async function Footer(): Promise<React.ReactNode> {
    const t = await getTranslations('footer');

    return (
        <div className={Styles.copyright}>
            {t('copyright')}
        </div>
    );
}
