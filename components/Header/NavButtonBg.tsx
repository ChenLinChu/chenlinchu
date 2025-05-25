'use client';

import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import React from 'react';

import Styles from './NavButtonBg.module.scss';

const NAV_POSITIONS = {
    all: 'left-5px',
    experience: 'left-165px',
    projects: 'left-325px',
    skills: 'left-485px'
} as const;

const getNavPositionClass = (
    pathname: string | null,
    locale: string
): string => {
    if (!pathname || pathname === `/${locale}`) return NAV_POSITIONS.all;
    else if (pathname === `/${locale}/experience`) return NAV_POSITIONS.experience;
    else if (pathname.includes(`/${locale}/project`)) return NAV_POSITIONS.projects;
    else return NAV_POSITIONS.skills;
};

export default function NavButtonBg(): React.ReactNode {
    const locale = useLocale();
    const pathname = usePathname();

    const [navPositionClass, setNavPositionClass] = React.useState(pathname);

    React.useEffect(() => {
        const className = getNavPositionClass(pathname, locale);

        setNavPositionClass(className);
    }, [pathname, locale]);

    return (
        <div
            className={`
                ${Styles.nav_button_bg}
                ${Styles[navPositionClass]}
        `}
        />
    );
};
