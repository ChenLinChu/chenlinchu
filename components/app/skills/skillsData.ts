export interface SkillBlock {
    title: string;
    skills: {
        fileName: string;
        isBlackIcon: boolean;
    }[];
}

export const skillsData: SkillBlock[] = [
    {
        title: 'blockTitle.frameworks',
        skills: [
            { fileName: 'Next.js', isBlackIcon: true },
            { fileName: 'React', isBlackIcon: false },
            { fileName: 'Nuxt.js', isBlackIcon: false },
            { fileName: 'Vue.js', isBlackIcon: false }
        ]
    },
    {
        title: 'blockTitle.stateManagement',
        skills: [
            { fileName: 'Pinia', isBlackIcon: false },
            { fileName: 'Vuex', isBlackIcon: false },
            { fileName: 'MobX', isBlackIcon: false }
        ]
    },
    {
        title: 'blockTitle.languages',
        skills: [
            { fileName: 'TypeScript', isBlackIcon: false },
            { fileName: 'JavaScript', isBlackIcon: false },
            { fileName: 'Sass', isBlackIcon: false },
            { fileName: 'Node.js', isBlackIcon: false },
            { fileName: 'Python', isBlackIcon: false }
        ]
    },
    {
        title: 'blockTitle.effects',
        skills: [
            { fileName: 'GSAP', isBlackIcon: true },
            { fileName: 'PixiJS', isBlackIcon: false },
            { fileName: 'Three.js', isBlackIcon: true }
        ]
    },
    {
        title: 'blockTitle.packagingTools',
        skills: [
            { fileName: 'Turbopack', isBlackIcon: true },
            { fileName: 'Vite', isBlackIcon: false },
            { fileName: 'Webpack', isBlackIcon: false }
        ]
    },
    {
        title: 'blockTitle.googleProducts',
        skills: [
            { fileName: 'Google Tag Manager', isBlackIcon: false },
            { fileName: 'Google Analytics', isBlackIcon: false },
            { fileName: 'Google SEO', isBlackIcon: false },
            { fileName: 'Google Lighthouse', isBlackIcon: false }
        ]
    },
    {
        title: 'blockTitle.standards',
        skills: [
            { fileName: 'ESLint', isBlackIcon: false },
            { fileName: 'Stylelint', isBlackIcon: true },
            { fileName: 'Prettier', isBlackIcon: false },
            { fileName: 'SonarQube', isBlackIcon: false },
            { fileName: 'Cypress', isBlackIcon: true }
        ]
    },
    {
        title: 'blockTitle.awsProducts',
        skills: [
            { fileName: 'AWS WAF', isBlackIcon: false },
            { fileName: 'AWS CloudFront', isBlackIcon: false },
            { fileName: 'AWS S3', isBlackIcon: false },
            { fileName: 'AWS EC2', isBlackIcon: false },
            { fileName: 'AWS RDS', isBlackIcon: false },
            { fileName: 'AWS Route53', isBlackIcon: false },
            { fileName: 'AWS IAM', isBlackIcon: false },
            { fileName: 'NGINX', isBlackIcon: false },
            { fileName: 'Ubuntu', isBlackIcon: false }
        ]
    },
    {
        title: 'blockTitle.other',
        skills: [
            { fileName: 'Git', isBlackIcon: false },
            { fileName: 'GitHub', isBlackIcon: true },
            { fileName: 'GitLab', isBlackIcon: false },
            { fileName: 'GitHub Actions', isBlackIcon: true },
            { fileName: 'Vercel', isBlackIcon: true },
            { fileName: 'Docker', isBlackIcon: false },
            { fileName: 'Figma', isBlackIcon: false },
            { fileName: 'Photoshop', isBlackIcon: false }
        ]
    },
    {
        title: 'blockTitle.aiTools',
        skills: [
            { fileName: 'Cursor', isBlackIcon: true },
            { fileName: 'GitHub Copilot', isBlackIcon: true },
            { fileName: 'Claude', isBlackIcon: false },
            { fileName: 'Grok', isBlackIcon: true },
            { fileName: 'Gemini', isBlackIcon: true }
        ]
    }
];
