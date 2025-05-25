import { getSkills, type Skill } from '@/lib/skills';

export interface SkillBlock {
    title: string;
    skills: Skill[];
}

export const skillsData: SkillBlock[] = [
    {
        title: 'blockTitle.frameworks',
        skills: getSkills([
            'Next',
            'React',
            'Nuxt',
            'Vue'
        ])
    },
    {
        title: 'blockTitle.stateManagement',
        skills: getSkills([
            'Pinia',
            'Vuex',
            'MobX'
        ])
    },
    {
        title: 'blockTitle.languages',
        skills: getSkills([
            'TypeScript',
            'JavaScript',
            'Sass',
            'Node',
            'Python'
        ])
    },
    {
        title: 'blockTitle.effects',
        skills: getSkills([
            'GSAP',
            'PixiJS',
            'Three'
        ])
    },
    {
        title: 'blockTitle.packagingTools',
        skills: getSkills([
            'Turbopack',
            'Vite',
            'Webpack'
        ])
    },
    {
        title: 'blockTitle.googleProducts',
        skills: getSkills([
            'Google Tag Manager',
            'Google Analytics',
            'Google SEO',
            'Google Lighthouse'
        ])
    },
    {
        title: 'blockTitle.standards',
        skills: getSkills([
            'ESLint',
            'Stylelint',
            'Prettier',
            'SonarQube',
            'Cypress'
        ])
    },
    {
        title: 'blockTitle.awsProducts',
        skills: getSkills([
            'AWS CloudFront',
            'AWS S3',
            'AWS EC2',
            'AWS Route53',
            'AWS IAM',
            'NGINX'
        ])
    },
    {
        title: 'blockTitle.other',
        skills: getSkills([
            'Git',
            'GitHub',
            'GitLab',
            'GitHub Actions',
            'Vercel',
            'Figma',
            'Photoshop'
        ])
    },
    {
        title: 'blockTitle.aiTools',
        skills: getSkills([
            'Cursor',
            'GitHub Copilot',
            'Claude',
            'Grok',
            'Gemini'
        ])
    }
];
