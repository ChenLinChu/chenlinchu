'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Link, usePathname } from '@/i18n/navigation';

import Styles from './NavLinks.module.scss';

export default function NavLinks(): React.ReactNode {
    const pathname = usePathname();
    const t = useTranslations('header');

    return (
        <>
            <Link
                className={Styles['nav__button']}
                href="/"
                aria-current={
                    pathname === '/' ? 'page' : undefined
                }
            >
                {t('all')}
            </Link>

            <Link
                className={Styles['nav__button']}
                href="/experience"
                aria-current={
                    pathname === '/experience' ? 'page' : undefined
                }
            >
                {t('experience')}
            </Link>

            <Link
                className={Styles['nav__button']}
                href="/projects"
                aria-current={
                    pathname?.includes('/project') ? 'page' : undefined
                }
            >
                {t('projects')}
            </Link>

            <Link
                className={Styles['nav__button']}
                href="/skills"
                aria-current={
                    pathname === '/skills' ? 'page' : undefined
                }
            >
                {t('skills')}
            </Link>
        </>
    );
}
