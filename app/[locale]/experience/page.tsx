import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import experience from '@/lib/experience';

import Styles from './page.module.scss';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('metadata.experience');

    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords')
    };
}

export default async function Experience(): Promise<React.ReactNode> {
    const t = await getTranslations('main.experience');

    return (
        <div>
            {experience.map((item, index) => (
                <div
                    className={Styles.experience_item_container}
                    key={index}
                >
                    <div className={Styles.experience_item}>
                        <div className={Styles.experience_item_position_company_container}>
                            <h2 className={Styles.experience_item_position}>
                                {t(`positions.${item.position}`)}
                            </h2>

                            <p className={Styles.experience_item_company}>
                                {t(`companies.${item.company}`)}
                            </p>
                        </div>

                        <div className={Styles.experience_item_date}>
                            {t('dateFormat.date', {
                                year: item.startDate.year,
                                month: item.startDate.month
                            })}

                            <span className={Styles.experience_item_date_separator}>
                                -
                            </span>

                            {item.endDate.year === null
                                ? t('dateFormat.present')
                                : t('dateFormat.date', {
                                    year: item.endDate.year,
                                    month: item.endDate.month
                                })
                            }
                        </div>
                    </div>

                    <div className={Styles.experience_item_content}>
                        {t.raw(`content.${item.company}_${item.position}`).map(
                            (
                                content: {
                                    title: string;
                                    list: string[]
                                },
                                contentIndex: number
                            ) => (
                                <div
                                    key={contentIndex}
                                    className={Styles.experience_item_content_item}
                                >
                                    <h3 className={Styles.experience_item_content_item_title}>
                                        {content.title}
                                    </h3>

                                    <ul>
                                        {content.list.map((listItem, listItemIndex) => (
                                            <li key={listItemIndex}>
                                                {listItem}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
