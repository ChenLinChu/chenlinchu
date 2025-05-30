import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { getProjectBySlugAndLanguage } from '@/lib/queries/projects';
import { getSkills } from '@/lib/skills';

import styles from './page.module.scss';

const getContrastColor = (brandColor: string): string => {
    const r = parseInt(brandColor.slice(1, 3), 16);
    const g = parseInt(brandColor.slice(3, 5), 16);
    const b = parseInt(brandColor.slice(5, 7), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? '#000' : '#fff';
};

export default async function Project(
    { params }: { params: Promise<{ locale: string; slug: string; }> }
): Promise<React.ReactNode> {
    const { locale, slug } = await params;
    const project = await getProjectBySlugAndLanguage(slug, locale);
    const skillsData = getSkills(project?.tags ?? []);
    const content = project?.content?.replace(/\\n/g, '\n');

    if (!project) notFound();
    else return (
        <div className={styles.container}>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.subtitle}>{project.subtitle}</p>
            <div className={styles.skills}>
                {skillsData.map((skill, index) => (
                    <Link
                        className={styles.skillLink}
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

            <div className={styles.markdown}>
                <Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                    {content}
                </Markdown>
            </div>
        </div>
    );
}
