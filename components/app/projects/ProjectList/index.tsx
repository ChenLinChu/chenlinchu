import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import Block from '@/components/shared/Block';
import ProjectContainer from '@/components/shared/ProjectContainer';
import { Link } from '@/i18n/navigation';
import { getSkills } from '@/lib/skills';
import type { Project } from '@/types/project';

import Styles from './index.module.scss';

const getContrastColor = (brandColor: string): string => {
    const r = parseInt(brandColor.slice(1, 3), 16);
    const g = parseInt(brandColor.slice(3, 5), 16);
    const b = parseInt(brandColor.slice(5, 7), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? '#000' : '#fff';
};

export default async function ProjectList(
    { projects }: { projects: Project[] }
): Promise<React.ReactNode> {
    const allTags = Array.from(new Set(projects?.flatMap(project => project.tags) ?? []));
    const skillsData = getSkills(allTags);
    const skillsDataDuplicated = [...skillsData, ...skillsData];
    const t = await getTranslations('main');

    if (!projects) notFound();
    else return (
        <div className={Styles.container}>
            <Block
                column={{
                    default: '5 / span 4',
                    lg: '1 / span 8'
                }}
                row={{
                    default: '1 / span 1',
                    lg: '1 / span 1'
                }}
            >
                <div className={Styles.titleContainer}>
                    <h1 className={Styles.title}>{t('projects/[tag].title')}</h1>

                    <div
                        className={Styles.skills}
                        style={{
                            '--skills-count': skillsDataDuplicated.length
                        } as React.CSSProperties}
                    >
                        {skillsDataDuplicated.map((skill, index) => (
                            <Link
                                className={Styles.skillLink}
                                key={index}
                                href={`/projects/${skill.fileName}`}
                                style={{
                                    '--brand-color': skill.brandColor,
                                    '--contrast-color': getContrastColor(skill.brandColor)
                                } as React.CSSProperties}
                            >
                                {skill.fileName}
                            </Link>
                        ))}
                    </div>
                </div>
            </Block>

            {projects.map((project, index) => (
                <Block
                    key={index}
                    column={{
                        default: `${index % 2 === 0 ? 1 : 5} / span 4`,
                        lg: '1 / span 8'
                    }}
                    row={{
                        default: `${1 + Math.floor(index / 2) * 4 + (index % 2)} / span 4`,
                        lg: `${2 + index * 4} / span 4`
                    }}
                >
                    <ProjectContainer project={project} />
                </Block>
            ))}
        </div>
    );
}
