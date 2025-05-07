'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Styles from './Header.module.scss';

export default function Header() {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initialTheme = prefersDark ? 'dark' : 'light';
            setTheme(initialTheme);
            document.documentElement.setAttribute('data-theme', initialTheme);
        }
    }, []);

    const toggleTheme = () => {
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
                    CHEN LIN <span className={Styles.redText}>CHU</span>
                </h1>
            </Link>

            <nav className={Styles.nav}>
                <Link
                    className={Styles.navButton}
                    href="/projects"
                >
                    projects
                </Link>

                <Link
                    className={Styles.navButton}
                    href="/contact"
                >
                    contact
                </Link>

                <button
                    className={Styles.themeButton}
                    onClick={toggleTheme}
                    aria-label={`切換至${theme === 'light' ? '深色' : '淺色'}模式`}
                >
                    {theme === 'light' ? 'DARK' : 'LIGHT'}
                </button>
            </nav>
        </div>
    );
}