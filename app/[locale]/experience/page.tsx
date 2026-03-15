import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import experience from '@/lib/experience';
import { createSeoMetadata } from '@/lib/seo/metadata';
import { createBreadcrumbSchema } from '@/lib/seo/schemas';

import Styles from './page.module.scss';

function generateCommitHash(
    company: string,
    position: string,
    startDate: { year: string; month: string },
    endDate: { year: string | null; month: string | null }
): string {
    const endYear = endDate.year ?? 'x';
    const endMonth = endDate.month ?? '';
    const str = `${company}-${position}-${startDate.year}${startDate.month}-${endYear}${endMonth}`;
    let h1 = 5381;
    let h2 = 33;
    for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i);
        h1 = ((h1 << 5) + h1 + c) >>> 0;
        h2 = ((h2 * 31) + c * 7) >>> 0;
    }
    const combined = (h1 ^ (h2 << 13) ^ (h2 >>> 19)) >>> 0;
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 7; i++) {
        hash += chars[(combined >>> (i * 4)) & 0xf];
    }
    return hash;
}

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations('metadata.experience');

    return createSeoMetadata({
        locale,
        path: '/experience',
        title: t('title'),
        description: t('description'),
        keywords: t('keywords')
    });
}

export default async function Experience(
    { params }: { params: Promise<{ locale: string }> }
): Promise<React.ReactNode> {
    const { locale } = await params;
    const t = await getTranslations('main.experience');
    const tBreadcrumb = await getTranslations('metadata.breadcrumb');
    const breadcrumbSchema = createBreadcrumbSchema(locale, [
        { name: tBreadcrumb('home'), path: '/' },
        { name: tBreadcrumb('experience'), path: '/experience' }
    ]);

    return (
        <div className={Styles.wrapper}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className={Styles.terminal}>
                <div className={Styles.terminalHeader}>
                    <span className={Styles.terminalDot} />
                    <span className={Styles.terminalDot} />
                    <span className={Styles.terminalDot} />
                    <span className={Styles.terminalTitle}>career.log</span>
                </div>
                <div className={Styles.terminalContent}>
                    <div className={Styles.promptLine}>
                        <span className={Styles.prompt}>{t('terminalPrompt')}</span>
                    </div>
                    <div className={Styles.logOutput}>
                        {experience.map((item, index) => {
                            const hash = generateCommitHash(
                                item.company,
                                item.position,
                                item.startDate,
                                item.endDate
                            );
                            const start = `${item.startDate.year}-${item.startDate.month}`;
                            const dateRange =
                                item.endDate.year === null
                                    ? `${start} – ${t('dateFormat.present')}`
                                    : `${start} – ${item.endDate.year}-${item.endDate.month}`;
                            const content = t.raw(`content.${item.company}_${item.position}`) as {
                                title: string;
                                list: string[];
                            }[];

                            return (
                                <div
                                    className={Styles.commitBlock}
                                    key={index}
                                >
                                    <div className={Styles.commitHeader}>
                                        <span className={Styles.commitHash}>{hash}</span>
                                        <span className={Styles.commitMessage}>
                                            {t(`positions.${item.position}`)}{' '}
                                            @ {t(`companies.${item.company}`)}
                                        </span>
                                        <span className={Styles.commitDate}>{dateRange}</span>
                                    </div>
                                    <div className={Styles.commitBody}>
                                        {content.map((section, sectionIndex) => (
                                            <div
                                                className={Styles.commitSection}
                                                key={sectionIndex}
                                            >
                                                <div className={Styles.commitSectionTitle}>
                                                    {section.title}
                                                </div>
                                                <ul className={Styles.commitList}>
                                                    {section.list.map((listItem, listIndex) => (
                                                        <li key={listIndex}>{listItem}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={Styles.promptLine}>
                        <span className={Styles.prompt}>$</span>
                        <span className={Styles.cursor}>_</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
