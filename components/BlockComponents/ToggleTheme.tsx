'use client';

import React, { useEffect, useState } from 'react';

import Styles from './ToggleTheme.module.scss';

export default function ToggleTheme(): React.ReactNode {
    const [theme, setTheme] = useState('dark');

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
        <button
            className={Styles['nav__button--theme']}
            onClick={toggleTheme}
            aria-label={`切換至${theme === 'light' ? '深色' : '淺色'}模式`}
        >
            {theme === 'light' ? 'DARK' : 'LIGHT'}
        </button>
    );
}
