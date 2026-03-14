import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    htmlLimitedBots: /.*/,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.public.blob.vercel-storage.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
                port: ''
            }
        ]
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
                ]
            }
        ];
    }
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
