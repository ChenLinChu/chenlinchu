import { getTranslations } from 'next-intl/server';
import React from 'react';

import { Link } from '@/i18n/navigation';
import experience from '@/lib/experience';

import Styles from './index.module.scss';

function calculateYearsSince(startDate: string): number {
    const today = new Date();
    const start = new Date(startDate);

    const diffInMs = today.getTime() - start.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    const years = diffInDays / 365.25;

    return Math.round(years * 10) / 10;
}

export default async function Experience(): Promise<React.ReactNode> {
    const t = await getTranslations('main.experience');
    const tForBlock = await getTranslations('main.page.block.experience');

    const total_years = calculateYearsSince('2020-09-07');

    return (
        <Link
            href="/experience"
            className={Styles.container}
        >
            <div className={Styles.total_years}>
                {tForBlock('total_years', { total_years })}
            </div>

            <div className={Styles.title}>
                {tForBlock('title')}
            </div>

            <div className={Styles.experience_list}>
                {experience.map((item, index) => (
                    <div
                        key={index}
                        className={Styles.experience_item}
                    >
                        <div className={Styles.experience_item_position}>
                            {t(`positions.${item.position}`)}
                        </div>

                        <div className={Styles.experience_item_company_date_container}>
                            <div className={Styles.experience_item_company}>
                                {t(`companies.${item.company}`)}
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
                    </div>
                ))}
            </div>
        </Link>
    );
}
