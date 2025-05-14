'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useTheme } from '@/app/providers/ThemeProvider';

import Styles from './index.module.scss';

export default function ToggleTheme(): React.ReactNode {
    const { theme, toggleTheme } = useTheme();
    const t = useTranslations('main.page.block.toggleTheme');

    const themeText = theme === 'light'
        ? t('dark')
        : t('light');

    return (
        <div className={Styles.container}>
            <p className={Styles.title}>
                {t('title')}
            </p>

            <button
                className={`
                    ${Styles['theme__button']}
                    ${Styles[`theme--${theme}`]}
                `}
                onClick={toggleTheme}
                aria-label={t('button.ariaLabel', {
                    theme: themeText
                })}
            >
                <div className={Styles.theme__button_icon}>
                    <Image
                        src={`/images/theme/${theme}.png`}
                        alt={t('button.text', {
                            theme: themeText
                        })}
                        width={24}
                        height={24}
                        priority
                    />
                </div>

                <div className={Styles.theme__button_text}>
                    {t('button.text', {
                        theme: t(theme)
                    })}
                </div>
            </button>
        </div>
    );
}
