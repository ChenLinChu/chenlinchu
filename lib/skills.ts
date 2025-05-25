export interface Skill {
    fileName: string;
    isBlackIcon: boolean;
    brandColor: string;
}

const skills: {
    [key: string]: Skill;
} = {
    'Next': {
        fileName: 'Next',
        isBlackIcon: true,
        brandColor: '#999999'
    },
    'React': {
        fileName: 'React',
        isBlackIcon: false,
        brandColor: '#97ECFB'
    },
    'Nuxt': {
        fileName: 'Nuxt',
        isBlackIcon: false,
        brandColor: '#99E8E2'
    },
    'Vue': {
        fileName: 'Vue',
        isBlackIcon: false,
        brandColor: '#7FF0ED'
    },
    'Laravel': {
        fileName: 'Laravel',
        isBlackIcon: false,
        brandColor: '#FF8D80'
    },
    'Pinia': {
        fileName: 'Pinia',
        isBlackIcon: false,
        brandColor: '#FFF0B9'
    },
    'Vuex': {
        fileName: 'Vuex',
        isBlackIcon: false,
        brandColor: '#7FF0ED'
    },
    'MobX': {
        fileName: 'MobX',
        isBlackIcon: false,
        brandColor: '#FFD160'
    },
    'Redux': {
        fileName: 'Redux',
        isBlackIcon: false,
        brandColor: '#B27CF4'
    },
    'TypeScript': {
        fileName: 'TypeScript',
        isBlackIcon: false,
        brandColor: '#61A8F6'
    },
    'JavaScript': {
        fileName: 'JavaScript',
        isBlackIcon: false,
        brandColor: '#F7F18E'
    },
    'Sass': {
        fileName: 'Sass',
        isBlackIcon: false,
        brandColor: '#E49FE9'
    },
    'Node': {
        fileName: 'Node',
        isBlackIcon: false,
        brandColor: '#98D093'
    },
    'Python': {
        fileName: 'Python',
        isBlackIcon: false,
        brandColor: '#67A6DB'
    },
    'PHP': {
        fileName: 'PHP',
        isBlackIcon: false,
        brandColor: '#A7ABE4'
    },
    'GSAP': {
        fileName: 'GSAP',
        isBlackIcon: true,
        brandColor: '#99FF99'
    },
    'PixiJS': {
        fileName: 'PixiJS',
        isBlackIcon: false,
        brandColor: '#F281AB'
    },
    'Three': {
        fileName: 'Three',
        isBlackIcon: true,
        brandColor: '#999999'
    },
    'Turbopack': {
        fileName: 'Turbopack',
        isBlackIcon: true,
        brandColor: '#999999'
    },
    'Vite': {
        fileName: 'Vite',
        isBlackIcon: false,
        brandColor: '#949CFF'
    },
    'Webpack': {
        fileName: 'Webpack',
        isBlackIcon: false,
        brandColor: '#BDF6F9'
    },
    'Google Tag Manager': {
        fileName: 'Google Tag Manager',
        isBlackIcon: false,
        brandColor: '#549FEB'
    },
    'Google Analytics': {
        fileName: 'Google Analytics',
        isBlackIcon: false,
        brandColor: '#E3A460'
    },
    'Google SEO': {
        fileName: 'Google SEO',
        isBlackIcon: false,
        brandColor: '#72B5F4'
    },
    'Google Lighthouse': {
        fileName: 'Google Lighthouse',
        isBlackIcon: false,
        brandColor: '#72B5F4'
    },
    'ESLint': {
        fileName: 'ESLint',
        isBlackIcon: false,
        brandColor: '#7B62F3'
    },
    'Stylelint': {
        fileName: 'Stylelint',
        isBlackIcon: true,
        brandColor: '#566268'
    },
    'Prettier': {
        fileName: 'Prettier',
        isBlackIcon: false,
        brandColor: '#F7E96E'
    },
    'SonarQube': {
        fileName: 'SonarQube',
        isBlackIcon: false,
        brandColor: '#7ECBFD'
    },
    'Cypress': {
        fileName: 'Cypress',
        isBlackIcon: true,
        brandColor: '#4A506A'
    },
    'AWS CloudFront': {
        fileName: 'AWS CloudFront',
        isBlackIcon: false,
        brandColor: '#FFCA60'
    },
    'AWS S3': {
        fileName: 'AWS S3',
        isBlackIcon: false,
        brandColor: '#FFCA60'
    },
    'AWS EC2': {
        fileName: 'AWS EC2',
        isBlackIcon: false,
        brandColor: '#FFCA60'
    },
    'AWS Route53': {
        fileName: 'AWS Route53',
        isBlackIcon: false,
        brandColor: '#FFCA60'
    },
    'AWS IAM': {
        fileName: 'AWS IAM',
        isBlackIcon: false,
        brandColor: '#FFCA60'
    },
    'NGINX': {
        fileName: 'NGINX',
        isBlackIcon: false,
        brandColor: '#73C669'
    },
    'Git': {
        fileName: 'Git',
        isBlackIcon: false,
        brandColor: '#F08062'
    },
    'GitHub': {
        fileName: 'GitHub',
        isBlackIcon: true,
        brandColor: '#484747'
    },
    'GitLab': {
        fileName: 'GitLab',
        isBlackIcon: false,
        brandColor: '#FC9D56'
    },
    'GitHub Actions': {
        fileName: 'GitHub Actions',
        isBlackIcon: true,
        brandColor: '#50B8FF'
    },
    'Vercel': {
        fileName: 'Vercel',
        isBlackIcon: true,
        brandColor: '#999999'
    },
    'Vuetify': {
        fileName: 'Vuetify',
        isBlackIcon: true,
        brandColor: '#999999'
    },
    'Figma': {
        fileName: 'Figma',
        isBlackIcon: false,
        brandColor: '#F27E4E'
    },
    'Photoshop': {
        fileName: 'Photoshop',
        isBlackIcon: false,
        brandColor: '#61D8FF'
    },
    'Cursor': {
        fileName: 'Cursor',
        isBlackIcon: true,
        brandColor: '#999999'
    },
    'GitHub Copilot': {
        fileName: 'GitHub Copilot',
        isBlackIcon: true,
        brandColor: '#484747'
    },
    'Claude': {
        fileName: 'Claude',
        isBlackIcon: false,
        brandColor: '#F5D7BC'
    },
    'Grok': {
        fileName: 'Grok',
        isBlackIcon: true,
        brandColor: '#999999'
    },
    'Gemini': {
        fileName: 'Gemini',
        isBlackIcon: true,
        brandColor: '#72B5F4'
    }
};

export const getSkills = (skillList: string[]): Skill[] => {
    return skillList.map((skill: string) => skills[skill]);
};

export default skills;
