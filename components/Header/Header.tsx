
'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import Styles from './Header.module.scss';

export default function Header(): React.ReactNode {
    const [theme, setTheme] = useState('dark');

    const t = useTranslations('Header');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            const prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;
            const initialTheme = prefersDark ? 'dark' : 'light';

            setTheme(initialTheme);
            document.documentElement.setAttribute('data-theme', initialTheme);
        }
    }, []);

    const toggleTheme = (): void => {
        const newTheme = theme === 'light' ? 'dark' : 'light';

        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className={Styles.container}>
            <Link
                href="/"
                style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}
            >
                <h1 className={Styles.title}>
                    CHEN LIN <span className={Styles['title__red']}>CHU</span>
                </h1>
            </Link>

            <nav className={Styles.nav}>
                <Link
                    className={Styles['nav__button']}
                    href="/projects"
                >
                    {t('projects')}
                </Link>

                <Link
                    className={Styles['nav__button']}
                    href="/contact"
                >
                    {t('contact')}
                </Link>

                <button
                    className={Styles['nav__button--theme']}
                    onClick={toggleTheme}
                    aria-label={`切換至${theme === 'light' ? '深色' : '淺色'}模式`}
                >
                    {theme === 'light' ? 'DARK' : 'LIGHT'}
                </button>
            </nav>
        </div>
    );
}
