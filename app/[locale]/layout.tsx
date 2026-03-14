import '@/styles/global.scss';

import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { ReactElement, ReactNode } from 'react';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { getMetadataBase } from '@/lib/seo/metadata';
import { createWebSiteSchema } from '@/lib/seo/schemas';

import { ThemeProvider } from '../providers/ThemeProvider';
import Styles from './layout.module.scss';

export const metadata = {
    metadataBase: getMetadataBase(),
    title: {
        default: 'Chen Lin Chu | Senior Front-End Engineer',
        template: '%s'
    },
    // eslint-disable-next-line max-len
    description: 'Frontend engineer with expertise in React, Vue, and modern web technologies. Specializing in performance optimization, responsive design, and user experience.'
};

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    display: 'swap'
});

export default async function RootLayout({
    children, params
}: {
    children: ReactNode;
    params: Promise<{ locale: string; }>;
}): Promise<ReactElement> {
    const { locale } = await params;
    const baseUrl = getMetadataBase().toString();

    setRequestLocale(locale);

    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: locale === 'zh-TW' ? '朱晨霖' : 'Chen Lin Chu',
        alternateName: locale === 'zh-TW' ? 'Chen Lin Chu' : '朱晨霖',
        jobTitle: locale === 'zh-TW' ? '資深前端工程師' : 'Senior Front-End Engineer',
        url: baseUrl,
        description:
            locale === 'zh-TW'
                ? '專注於 React、Vue 及現代網頁技術的資深前端工程師。擅長效能優化、響應式設計及使用者體驗。'
                // eslint-disable-next-line max-len
                : 'Senior frontend engineer with expertise in React, Vue, and modern web technologies.'
    };

    const webSiteSchema = createWebSiteSchema(locale);

    return (
        <html lang={locale}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
                />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href="/favicon.ico"
                    sizes="16x16"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/favicon-32x32.png"
                    sizes="32x32"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/favicon-96x96.png"
                    sizes="96x96"
                />
            </head>

            <body className={inter.className}>
                <NextIntlClientProvider>
                    <Header />

                    <main className={Styles.main}>
                        <ThemeProvider>
                            {children}
                        </ThemeProvider>
                    </main>

                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
