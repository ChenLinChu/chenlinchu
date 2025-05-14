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
            { fileName: 'Vue.js', isBlackIcon: false },
            { fileName: 'Laravel', isBlackIcon: false }
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
            { fileName: 'Python', isBlackIcon: false },
            { fileName: 'PHP', isBlackIcon: false }
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
            { fileName: 'Vite', isBlackIcon: false },
            { fileName: 'Turbopack', isBlackIcon: true },
            { fileName: 'Webpack', isBlackIcon: false }
        ]
    },
    {
        title: 'blockTitle.standards',
        skills: [
            { fileName: 'ESLint', isBlackIcon: false },
            { fileName: 'Stylelint', isBlackIcon: true },
            { fileName: 'Prettier', isBlackIcon: false },
            { fileName: 'SonarQube', isBlackIcon: false },
            { fileName: 'Jest', isBlackIcon: false },
            { fileName: 'Cypress', isBlackIcon: true }
        ]
    },
    {
        title: 'blockTitle.ai',
        skills: [
            { fileName: 'Cursor', isBlackIcon: true },
            { fileName: 'GitHub Copilot', isBlackIcon: true },
            { fileName: 'Claude', isBlackIcon: false },
            { fileName: 'Grok', isBlackIcon: true }
        ]
    },
    {
        title: 'blockTitle.other',
        skills: [
            { fileName: 'Google SEO', isBlackIcon: false },
            { fileName: 'Git', isBlackIcon: false },
            { fileName: 'CI CD', isBlackIcon: true },
            { fileName: 'AWS', isBlackIcon: true },
            { fileName: 'Docker', isBlackIcon: false },
            { fileName: 'Jenkins', isBlackIcon: false },
            { fileName: 'Vercel', isBlackIcon: true },
            { fileName: 'Figma', isBlackIcon: false },
            { fileName: 'Photoshop', isBlackIcon: false },
            { fileName: 'Notion', isBlackIcon: true }
        ]
    }
];
