import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { skillsData } from '@/components/app/skills/skillsData';
import { Link } from '@/i18n/navigation';

import Styles from './page.module.scss';

const getContrastColor = (brandColor: string): string => {
    const r = parseInt(brandColor.slice(1, 3), 16);
    const g = parseInt(brandColor.slice(3, 5), 16);
    const b = parseInt(brandColor.slice(5, 7), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? '#000' : '#fff';
};

const rootStyles = (brandColor: string): { [key: string]: string } => ({
    '--brand-color': brandColor,
    '--contrast-color': getContrastColor(brandColor)
});

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('metadata.skills');

    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords')
    };
}

export default async function SkillsPage(): Promise<React.ReactElement> {
    const t = await getTranslations('main.skills');

    return (
        <main className={Styles.container}>
            {skillsData.map((block) => (
                <section
                    className={Styles.section}
                    key={block.title}
                >
                    <h2 className={Styles.sectionTitle}>
                        {t(block.title)}
                    </h2>

                    <ul className={Styles.skillsList}>
                        {block.skills.map((skill) => (
                            <li
                                className={Styles.skillItem}
                                key={skill.fileName}
                                style={rootStyles(skill.brandColor)}
                            >
                                <Link
                                    className={Styles.skillLink}
                                    href={`/projects/${skill.fileName}`}
                                >
                                    <Image
                                        className={Styles.skillIcon}
                                        src={`/icons/${skill.fileName}.svg`}
                                        alt={skill.fileName}
                                        width={24}
                                        height={24}
                                    />

                                    {skill.fileName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </main>
    );
}
