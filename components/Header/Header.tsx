import { headers } from 'next/headers';
import { getLocale, getTranslations } from 'next-intl/server';
import React from 'react';

import { Link } from '@/i18n/navigation';

import Styles from './Header.module.scss';
import NavButtonBg from './NavButtonBg';

export default async function Header(): Promise<React.ReactNode> {
    const locale = await getLocale();
    const t = await getTranslations({ locale, namespace: 'header' });
    const headersList = await headers();
    const pathname = headersList.get('x-current-path');

    return (
        <header className={Styles.header}>
            <nav className={Styles.nav}>
                <NavButtonBg />

                <Link
                    className={Styles['nav__button']}
                    href="/"
                    aria-current={
                        pathname === `/${locale}` ? 'page' : undefined
                    }
                >
                    {t('all')}
                </Link>

                <Link
                    className={Styles['nav__button']}
                    href="/projects"
                    aria-current={
                        pathname === `/${locale}/projects` ? 'page' : undefined
                    }
                >
                    {t('projects')}
                </Link>

                <Link
                    className={Styles['nav__button']}
                    href="/skills"
                    aria-current={
                        pathname === `/${locale}/skills` ? 'page' : undefined
                    }
                >
                    {t('skills')}
                </Link>
            </nav>
        </header>
    );
}
