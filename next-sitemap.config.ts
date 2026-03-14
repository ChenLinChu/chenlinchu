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
        const fallbackLastmod = new Date().toISOString();

        const mainPages = [
            { path: '/', priority: 1.0 },
            { path: '/experience', priority: 0.8 },
            { path: '/projects', priority: 0.9 },
            { path: '/skills', priority: 0.8 }
        ];

        const siteLastmod = await sql`
            SELECT MAX(updated_at)::text AS updated_at
            FROM projects
        ` as { updated_at: string | null }[];
        const mainPagesLastmod =
            siteLastmod[0]?.updated_at &&
            !Number.isNaN(new Date(siteLastmod[0].updated_at).getTime())
                ? new Date(siteLastmod[0].updated_at).toISOString()
                : fallbackLastmod;

        const tagsWithDate = await sql`
            SELECT TRIM(tag) AS tag, MAX(updated_at)::text AS updated_at
            FROM projects
            CROSS JOIN LATERAL UNNEST(tags) AS tag
            WHERE language = 'zh-TW'
            GROUP BY TRIM(tag)
        ` as { tag: string; updated_at: string | null }[];

        const tagToLastmod = Object.fromEntries(
            tagsWithDate.map((row) => {
                const date = row.updated_at ? new Date(row.updated_at) : null;
                const validDate =
                    date && !Number.isNaN(date.getTime())
                        ? date.toISOString()
                        : mainPagesLastmod;

                return [row.tag, validDate];
            })
        );

        const slugsWithDate = await sql`
            SELECT seo_slug, MAX(updated_at)::text AS updated_at
            FROM projects
            WHERE language = 'zh-TW'
            GROUP BY seo_slug
        ` as { seo_slug: string; updated_at: string | null }[];

        const slugToLastmod = Object.fromEntries(
            slugsWithDate.map((row) => {
                const date = row.updated_at ? new Date(row.updated_at) : null;
                const validDate =
                    date && !Number.isNaN(date.getTime())
                        ? date.toISOString()
                        : fallbackLastmod;

                return [row.seo_slug, validDate];
            })
        );

        ['zh-TW', 'en'].forEach(locale => {
            mainPages.forEach(page => {
                result.push({
                    loc: `/${locale}${page.path}`,
                    changefreq: 'daily' as const,
                    priority: page.priority,
                    lastmod: mainPagesLastmod
                });
            });

            tagsWithDate.forEach((row) => {
                result.push({
                    loc: `/${locale}/projects/${row.tag}`,
                    changefreq: 'daily' as const,
                    priority: 0.8,
                    lastmod: tagToLastmod[row.tag] ?? mainPagesLastmod
                });
            });

            slugsWithDate.forEach((row) => {
                result.push({
                    loc: `/${locale}/project/${row.seo_slug}`,
                    changefreq: 'daily' as const,
                    priority: 0.8,
                    lastmod: slugToLastmod[row.seo_slug] ?? fallbackLastmod
                });
            });
        });

        return result;
    },

    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/', disallow: ['/api/', '/_next/'] },
            { userAgent: 'GPTBot', allow: '/', disallow: ['/api/'] },
            { userAgent: 'ChatGPT-User', allow: '/', disallow: ['/api/'] },
            { userAgent: 'PerplexityBot', allow: '/', disallow: ['/api/'] },
            { userAgent: 'ClaudeBot', allow: '/', disallow: ['/api/'] },
            { userAgent: 'anthropic-ai', allow: '/', disallow: ['/api/'] },
            { userAgent: 'Google-Extended', allow: '/', disallow: ['/api/'] },
            { userAgent: 'Applebot-Extended', allow: '/', disallow: ['/api/'] },
            { userAgent: 'CCBot', allow: '/', disallow: ['/api/'] }
        ]
    }
};

export default config;
