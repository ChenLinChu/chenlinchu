import '@/styles/global.scss';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

import Styles from './layout.module.scss';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    display: 'swap'
});

export const metadata: Metadata = {
    title: 'Chen Lin Chu - Portfolio',
    description: "Chen Lin Chu's portfolio"
};

export default function RootLayout({
    children
}: Readonly<{ children: React.ReactNode; }>): React.ReactElement {
    return (
        <html lang="en">
            <head>
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
            </head>
            <body className={inter.className}>
                <Header />
                <main className={Styles.main}>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
