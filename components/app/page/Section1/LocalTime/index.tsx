'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import Styles from './index.module.scss';

export default function LocalTime(): React.ReactNode {
    const t = useTranslations('main.page.block.localTime');

    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const updateTime = (): void => {
            const now = new Date();
            const taipeiTime = new Date(
                now.toLocaleString('en-US', { timeZone: 'Asia/Taipei' })
            );

            const month = String(taipeiTime.getMonth() + 1).padStart(2, '0');
            const day = String(taipeiTime.getDate()).padStart(2, '0');
            const year = taipeiTime.getFullYear();
            const hours = String(taipeiTime.getHours()).padStart(2, '0');
            const minutes = String(taipeiTime.getMinutes()).padStart(2, '0');
            const seconds = String(taipeiTime.getSeconds()).padStart(2, '0');

            setTime(
                `${month}/${day}/${year} ${hours}:${minutes}:${seconds} (GMT+8)`
            );
        };

        updateTime();

        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={Styles.container}>
            <div className={Styles.title}>{t('title')}</div>
            <div className={Styles.time}>{time}</div>
        </div>
    );
}
