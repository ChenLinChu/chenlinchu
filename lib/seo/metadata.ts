import type { Metadata } from 'next';

const LOCALES = ['zh-TW', 'en'] as const;
const DEFAULT_LOCALE = 'en';

function getBaseUrl(): string {
    return process.env.SITE_URL ?? 'https://chenlinchu.com';
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
}): Metadata {
    const baseUrl = getBaseUrl();
    const { locale, path, title, description, image, keywords } = params;

    // 完整路徑：/{locale}{path}，例如 /zh-TW/experience
    const pathSegment = path.startsWith('/') ? path : `/${path}`;
    const currentPath = `/${locale}${pathSegment}`.replace(/\/$/, '') || `/${locale}`;
    const canonicalUrl = `${baseUrl}${currentPath}`;

    const languages: Record<string, string> = {};
    for (const loc of LOCALES) {
        const locPath = `/${loc}${pathSegment}`.replace(/\/$/, '') || `/${loc}`;
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
