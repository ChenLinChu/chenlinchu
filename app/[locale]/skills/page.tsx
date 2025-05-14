import { useTranslations } from 'next-intl';
import React from 'react';

import { skillsData } from '@/components/app/skills/skillsData';

export default function SkillsPage(): React.ReactElement {
    const t = useTranslations('main.skills');

    return (
        <main style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>
                {t('title')}
            </h1>

            {skillsData.map((block) => (
                <section
                    key={block.title}
                    style={{ marginBottom: 32 }}
                >
                    <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>
                        {t(block.title)}
                    </h2>

                    <ul
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 12,
                            listStyle: 'none',
                            padding: 0
                        }}
                    >
                        {block.skills.map((skill) => (
                            <li
                                key={skill.fileName}
                                style={{
                                    background: '#000',
                                    borderRadius: 8,
                                    padding: '8px 16px',
                                    fontSize: 16,
                                    fontWeight: 500
                                }}
                            >
                                {skill.fileName}
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </main>
    );
}
