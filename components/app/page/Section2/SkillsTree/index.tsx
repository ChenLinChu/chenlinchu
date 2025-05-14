'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { useTheme } from '@/app/providers/ThemeProvider';
import { skillsData } from '@/components/app/skills/skillsData';

import Styles from './index.module.scss';

export default function SkillsTree(): ReactNode {
    const { theme } = useTheme();

    const t = useTranslations('main.skills');

    // 輪播內容複製兩份以實現無縫循環
    const renderItems = [...skillsData, ...skillsData];

    const getIconClassName = (isBlackIcon: boolean): string => {
        return `
            ${Styles.block__content__icon}
            ${theme === 'dark' && isBlackIcon ? Styles['icon--black'] : ''}
        `;
    };

    return (
        <Link
            href="/skills"
            className={Styles.container}
        >
            <div className={Styles.carousel}>
                {renderItems.map((block, index) => (
                    <div
                        className={Styles.block}
                        key={index}
                    >
                        <div className={Styles.block__title}>
                            {t(block.title)}
                        </div>

                        <div
                            className={Styles.block__content}
                            key={index}
                        >
                            {block.skills.map((skill) => {
                                const { fileName, isBlackIcon } = skill;

                                return (
                                    <Image
                                        key={`${index}-${fileName}-${theme}`}
                                        src={`/icons/${fileName}.svg`}
                                        className={getIconClassName(isBlackIcon)}
                                        alt={`${fileName} icon`}
                                        width={30}
                                        height={30}
                                        priority
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </Link>
    );
};
