import React from 'react';

import Block from '@/components/Block';
import { getProjectsByLanguage } from '@/lib/queries/projects';

export default async function SectionProjects(
    { params }: { params: Promise<{ locale: string; }> }
): Promise<React.ReactNode> {
    const { locale } = await params;
    const projects = await getProjectsByLanguage(locale);

    return (
        <>
            {projects.map((project, index) => (
                <Block
                    key={index}
                    column={{
                        default: `${index % 2 === 0 ? 1 : 5} / span 4`,
                        xl: `${index % 2 === 0 ? 1 : 5} / span 4`,
                        md: '1 / span 8'
                    }}
                    row={{
                        default: `${7 + Math.floor(index / 2) * 4 + (index % 2)} / span 4`,
                        xl: `${7 + Math.floor(index / 2) * 4 + (index % 2)} / span 4`,
                        md: `${15 + index * 4} / span 4`
                    }}
                >
                    <div key={index}>
                        <h2>{project.title}</h2>
                        <p>{project.tags}</p>
                    </div>
                </Block>
            ))}
        </>
    );
}
