'use client';

import React from 'react';

import { usePathname } from '@/i18n/navigation';

import Styles from './NavButtonBg.module.scss';

const NAV_POSITIONS = {
    all: 'left-5px',
    experience: 'left-165px',
    projects: 'left-325px',
    skills: 'left-485px'
} as const;

const getNavPositionClass = (
    pathname: string | null
): string => {
    if (!pathname || pathname === '/') return NAV_POSITIONS.all;
    else if (pathname === '/experience') return NAV_POSITIONS.experience;
    else if (pathname.includes('/project')) return NAV_POSITIONS.projects;
    else if (pathname === '/skills') return NAV_POSITIONS.skills;
    else return NAV_POSITIONS.all;
};

export default function NavButtonBg(): React.ReactNode {
    const pathname = usePathname();
    const navPositionClass = getNavPositionClass(pathname);

    return (
        <div
            className={`
                ${Styles.nav_button_bg}
                ${Styles[navPositionClass]}
        `}
        />
    );
};
