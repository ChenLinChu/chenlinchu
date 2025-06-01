import { neon } from '@neondatabase/serverless';
import type { IConfig, ISitemapField } from 'next-sitemap';

const sql = neon(process.env.DATABASE_URL ?? '');

const config: IConfig = {
    siteUrl: process.env.SITE_URL ?? '',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: 'daily',
    priority: 0.7,
    autoLastmod: true,
    exclude: [
        '/404',
        '/500',
        '/server-sitemap.xml'
    ],

    additionalPaths: async (_config) => {
        const result: ISitemapField[] = [];
        const lastmod = new Date().toISOString();

        const mainPages = [
            { path: '/', priority: 1.0 },
            { path: '/experience', priority: 0.8 },
            { path: '/projects', priority: 0.9 },
            { path: '/skills', priority: 0.8 }
        ];

        const tags = await sql`
            SELECT DISTINCT TRIM(tag) AS tag
            FROM projects
            CROSS JOIN LATERAL UNNEST(tags) AS tag
            WHERE language = 'zh-TW';
        ` as { tag: string }[];

        const slugs = await sql`
            SELECT DISTINCT seo_slug
            FROM projects
            WHERE language = 'zh-TW'
        ` as { seo_slug: string }[];

        ['zh-TW', 'en'].forEach(locale => {
            mainPages.forEach(page => {
                result.push({
                    loc: `/${locale}${page.path}`,
                    changefreq: 'daily' as const,
                    priority: page.priority,
                    lastmod
                });
            });

            tags.forEach(tag => {
                result.push({
                    loc: `/${locale}/projects/${tag.tag}`,
                    changefreq: 'daily' as const,
                    priority: 0.8,
                    lastmod
                });
            });

            slugs.forEach(slug => {
                result.push({
                    loc: `/${locale}/project/${slug.seo_slug}`,
                    changefreq: 'daily' as const,
                    priority: 0.8,
                    lastmod
                });
            });
        });

        return result;
    },

    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: []
            }
        ]
    }
};

export default config;
