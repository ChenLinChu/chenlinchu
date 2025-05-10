import '@/styles/global.scss';

import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { ReactElement, ReactNode } from 'react';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

import Styles from './layout.module.scss';

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

    setRequestLocale(locale);

    return (
        <html lang={locale}>
            <head>
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
            </head>
            <body className={inter.className}>
                <NextIntlClientProvider>
                    <Header params={params} />

                    <main className={Styles.main}>
                        {children}
                    </main>

                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
