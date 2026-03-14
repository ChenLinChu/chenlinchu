import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import experience from '@/lib/experience';
import { createSeoMetadata } from '@/lib/seo/metadata';
import { createBreadcrumbSchema } from '@/lib/seo/schemas';

import Styles from './page.module.scss';

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
            <div className={Styles.timeline}>
                {experience.map((item, index) => (
                    <article
                        className={Styles.card}
                        key={index}
                    >
                        <div className={Styles.cardHeader}>
                            <div className={Styles.cardMeta}>
                                <h2 className={Styles.position}>
                                    {t(`positions.${item.position}`)}
                                </h2>
                                <p className={Styles.company}>
                                    {t(`companies.${item.company}`)}
                                </p>
                            </div>
                            <span className={Styles.dateBadge}>
                                {t('dateFormat.date', {
                                    year: item.startDate.year,
                                    month: item.startDate.month
                                })}
                                <span className={Styles.dateSeparator}>–</span>
                                {item.endDate.year === null
                                    ? t('dateFormat.present')
                                    : t('dateFormat.date', {
                                        year: item.endDate.year,
                                        month: item.endDate.month
                                    })
                                }
                            </span>
                        </div>

                        <div className={Styles.cardContent}>
                            {t.raw(`content.${item.company}_${item.position}`).map(
                                (
                                    content: {
                                        title: string;
                                        list: string[]
                                    },
                                    contentIndex: number
                                ) => (
                                    <section
                                        key={contentIndex}
                                        className={Styles.contentSection}
                                    >
                                        <h3 className={Styles.contentTitle}>
                                            {content.title}
                                        </h3>
                                        <ul className={Styles.contentList}>
                                            {content.list.map((listItem, listItemIndex) => (
                                                <li key={listItemIndex}>
                                                    {listItem}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                ))}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
