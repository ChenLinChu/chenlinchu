import { getLocale, getTranslations } from 'next-intl/server';
import React from 'react';

import { Link } from '@/i18n/navigation';

import Styles from './index.module.scss';

export default async function LocaleSwitch(): Promise<React.ReactNode> {
    const locale = await getLocale();
    const t = await getTranslations('main.page.block.localeSwitch');

    return (
        <div className={Styles.container}>
            <div className={Styles.title}>
                {t('title')}
            </div>

            <div className={Styles.locale}>
                <Link
                    href="/"
                    locale='en'
                    className={`
                        ${Styles.locale__link}
                        ${locale === 'en' ? Styles.active : ''}
                    `}
                >
                    {t('locale.en')}
                </Link>

                <Link
                    href="/"
                    locale='zh-TW'
                    className={`
                        ${Styles.locale__link}
                        ${locale === 'zh-TW' ? Styles.active : ''}
                    `}
                >
                    {t('locale.zh-TW')}
                </Link>
            </div>
        </div>
    );
}
