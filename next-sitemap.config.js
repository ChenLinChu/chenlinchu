const config = {
    siteUrl: process.env.SITE_URL ?? '',
    generateRobotsTxt: true,
    alternateRefs: [
        {
            href: `${process.env.SITE_URL}/en`,
            hreflang: 'en'
        },
        {
            href: `${process.env.SITE_URL}/zh-TW`,
            hreflang: 'zh-TW'
        }
    ],
    sitemapSize: 7000,
    changefreq: 'weekly',
    priority: 0.8,
    exclude: [],
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
