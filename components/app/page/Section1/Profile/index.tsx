import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import React from 'react';

import Styles from './index.module.scss';

export default async function Profile(): Promise<React.ReactNode> {
    const locale = await getLocale();
    const t = await getTranslations({
        locale,
        namespace: 'main.block.profile'
    });

    return (
        <div className={Styles.profile}>
            <div className={Styles.profile_info}>
                <Image
                    src="/profile.png"
                    alt="Memoji of the author"
                    className={Styles.profile_info_image}
                    width={100}
                    height={100}
                    priority
                />

                <h2 className={Styles.profile_info_name}>
                    {t('name')}
                </h2>
            </div>

            <p className={Styles.profile_info_quote}>
                {t('quote')}
            </p>

            <p className={Styles.profile_info_description}>
                {t('description')}
            </p>
        </div>
    );
}
