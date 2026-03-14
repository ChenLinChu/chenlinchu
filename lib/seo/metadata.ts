import type { Metadata } from 'next';

export const LOCALES = ['en', 'zh-TW'] as const;

const DEFAULT_LOCALE = 'en';

function getBaseUrl(): string {
    return process.env.SITE_URL ?? 'https://chenlinchu.com';
}

/**
 * 建立 hreflang alternates 物件，供 metadata 或自訂頁面使用
 */
export function createAlternates(basePath: string): Metadata['alternates'] {
    const baseUrl = getBaseUrl();
    const pathSegment = basePath.startsWith('/') ? basePath : `/${basePath}`;
    const normalizedPath = pathSegment.replace(/\/$/, '') || '';

    const languages: Record<string, string> = {};
    for (const loc of LOCALES) {
        const locPath = normalizedPath ? `/${loc}${normalizedPath}` : `/${loc}`;
        languages[loc] = `${baseUrl}${locPath}`;
    }

    const defaultUrl = normalizedPath
        ? `${baseUrl}/${DEFAULT_LOCALE}${normalizedPath}`
        : `${baseUrl}/${DEFAULT_LOCALE}`;

    return {
        canonical: defaultUrl,
        languages: { ...languages, 'x-default': defaultUrl }
    };
}

/**
 * 建立包含 Open Graph、Twitter、Canonical、hreflang 的完整 metadata
 */
export function createSeoMetadata(params: {
    locale: string;
    path: string;
    title: string;
    description: string;
    image?: string;
    keywords?: string;
    /** 自訂各語系路徑，用於 project 等可能有不同 slug 的頁面 */
    alternatePaths?: Partial<Record<(typeof LOCALES)[number], string>>;
}): Metadata {
    const baseUrl = getBaseUrl();
    const { locale, path, title, description, image, keywords, alternatePaths } = params;

    // 完整路徑：/{locale}{path}，例如 /zh-TW/experience
    const pathSegment = path.startsWith('/') ? path : `/${path}`;
    const currentPath = `/${locale}${pathSegment}`.replace(/\/$/, '') || `/${locale}`;
    const canonicalUrl = `${baseUrl}${currentPath}`;

    const languages: Record<string, string> = {};
    for (const loc of LOCALES) {
        const customPath = alternatePaths?.[loc];
        const segment = customPath !== undefined
            ? (customPath.startsWith('/') ? customPath : `/${customPath}`).replace(/\/$/, '')
            : pathSegment.replace(/\/$/, '');
        const locPath = segment ? `/${loc}${segment}` : `/${loc}`;
        languages[loc] = `${baseUrl}${locPath}`;
    }

    const ogImage = image ?? `${baseUrl}/favicon-96x96.png`;

    return {
        title,
        description,
        keywords: keywords ?? undefined,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                ...languages,
                'x-default':
                    languages[DEFAULT_LOCALE] ||
                    `${baseUrl}/${DEFAULT_LOCALE}${pathSegment}`.replace(/\/$/, '') ||
                    `${baseUrl}/${DEFAULT_LOCALE}`
            }
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: 'Chen Lin Chu | 朱晨霖',
            type: 'website',
            locale: locale === 'zh-TW' ? 'zh_TW' : 'en_US',
            alternateLocale: locale === 'zh-TW' ? ['en_US'] : ['zh_TW'],
            images: [{ url: ogImage, width: 96, height: 96, alt: title }]
        },
        twitter: {
            card: 'summary',
            title,
            description
        }
    };
}

export function getMetadataBase(): URL {
    return new URL(getBaseUrl());
}
