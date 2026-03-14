import { getMetadataBase } from './metadata';

export interface BreadcrumbItem {
    name: string;
    path: string;
}

/**
 * 建立 BreadcrumbList 結構化資料
 */
export function createBreadcrumbSchema(
    locale: string,
    items: BreadcrumbItem[]
): object {
    const baseUrl = getMetadataBase().toString();

    const itemListElement = items.map((item, index) => {
        const path = item.path.startsWith('/') ? item.path : `/${item.path}`;
        const url = `${baseUrl}/${locale}${path}`.replace(/\/$/, '') || `${baseUrl}/${locale}`;

        return {
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: url
        };
    });

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement
    };
}

/**
 * 建立 WebSite 結構化資料
 */
export function createWebSiteSchema(locale: string): object {
    const baseUrl = getMetadataBase().toString();

    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: locale === 'zh-TW' ? '朱晨霖 | 資深前端工程師' : 'Chen Lin Chu | Senior Front-End Engineer',
        url: baseUrl,
        description:
            locale === 'zh-TW'
                ? '專注於 React、Vue 及現代網頁技術的資深前端工程師。擅長效能優化、響應式設計及使用者體驗。'
                // eslint-disable-next-line max-len
                : 'Senior frontend engineer with expertise in React, Vue, and modern web technologies.',
        inLanguage: [locale === 'zh-TW' ? 'zh-Hant' : 'en'],
        publisher: {
            '@type': 'Person',
            name: locale === 'zh-TW' ? '朱晨霖' : 'Chen Lin Chu',
            url: baseUrl
        }
    };
}
