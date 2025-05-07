import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import '@/styles/global.scss';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    display: 'swap'
});

export const metadata: Metadata = {
    title: 'Chen Lin Chu',
    description: "Chen Lin Chu's portfolio"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
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

                {children}

                <Footer />
            </body>
        </html>
    );
}
