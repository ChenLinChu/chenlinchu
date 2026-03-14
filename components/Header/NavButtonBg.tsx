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
    switch (pathname) {
        case '/':
            return NAV_POSITIONS.all;
        case '/experience':
            return NAV_POSITIONS.experience;
        case '/projects':
            return NAV_POSITIONS.projects;
        case '/skills':
            return NAV_POSITIONS.skills;
        default:
            return NAV_POSITIONS.all;
    }
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
