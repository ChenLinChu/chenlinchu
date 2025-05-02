'use client';

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
            <h1 className={Styles.title}>
                Chen Lin Chu's Portfolio
            </h1>

            <button
                className="theme-toggle-btn btn"
                onClick={toggleTheme}
            >
                {theme === 'light' ? 'dark' : 'light'} mode
            </button>
        </div>
    )
}