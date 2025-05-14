import '@/styles/global.scss';

import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { ReactElement, ReactNode } from 'react';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

import { ThemeProvider } from '../providers/ThemeProvider';
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
