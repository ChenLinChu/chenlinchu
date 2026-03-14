import React from 'react';

import Styles from './Header.module.scss';
import NavButtonBg from './NavButtonBg';
import NavLinks from './NavLinks';

export default function Header(): React.ReactNode {
    return (
        <header className={Styles.header}>
            <nav className={Styles.nav}>
                <NavButtonBg />
                <NavLinks />
            </nav>
        </header>
    );
}
