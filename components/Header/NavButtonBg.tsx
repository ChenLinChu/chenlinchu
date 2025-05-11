'use client';

import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import React from 'react';

import Styles from './NavButtonBg.module.scss';

const NAV_POSITIONS = {
    all: 'left-5px',
    projects: 'left-165px',
    contact: 'left-325px'
} as const;

const getNavPositionClass = (
    pathname: string | null,
    locale: string
): string => {
    if (!pathname || pathname === `/${locale}`) return NAV_POSITIONS.all;
    if (pathname === `/${locale}/projects`) return NAV_POSITIONS.projects;
    return NAV_POSITIONS.contact;
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
