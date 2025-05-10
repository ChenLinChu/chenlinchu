import React from 'react';

import { Link } from '@/i18n/navigation';

import Styles from './LocaleSwitch.module.scss';

export default function LocaleSwitch(): React.ReactNode {
    return (
        <div className={Styles.container}>
            <Link
                href="/"
                locale='en'
            >
                English
            </Link>

            <Link
                href="/"
                locale='zh-TW'
            >
                Chinese
            </Link>
        </div>
    );
}
