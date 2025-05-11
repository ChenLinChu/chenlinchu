'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    toggleTheme: () => { }
});

export function ThemeProvider({
    children
}: {
    children: React.ReactNode;
}): React.ReactNode {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            setTheme(savedTheme);

            document.documentElement.setAttribute('data-theme', savedTheme);

            localStorage.setItem('theme', savedTheme);
        } else {
            const initialTheme = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches ? 'dark' : 'light';

            setTheme(initialTheme);

            document.documentElement.setAttribute('data-theme', initialTheme);

            localStorage.setItem('theme', initialTheme);
        }
    }, []);

    const toggleTheme = (): void => {
        const newTheme = theme === 'light' ? 'dark' : 'light';

        setTheme(newTheme);

        document.documentElement.setAttribute('data-theme', newTheme);

        localStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = (): ThemeContextType => useContext(ThemeContext);
