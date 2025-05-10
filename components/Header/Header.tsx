import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { Link } from '@/i18n/navigation';

import Styles from './Header.module.scss';

export default async function Header(
    { params }: { params: Promise<{ locale: string; }> }
): Promise<React.ReactNode> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Header' });
    const headersList = await headers();
    const pathname = headersList.get('x-current-path');

    return (
        <header className={Styles.header}>
            <nav className={Styles.nav}>
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
                    href="/contact"
                    aria-current={
                        pathname === `/${locale}/contact` ? 'page' : undefined
                    }
                >
                    {t('contact')}
                </Link>
            </nav>
        </header>
    );
}
