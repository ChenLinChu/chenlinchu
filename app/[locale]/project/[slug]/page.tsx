import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import React, { cache } from 'react';
import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { Link } from '@/i18n/navigation';
import { getProjectBySlugAndLanguage } from '@/lib/queries/projects';
import { createSeoMetadata, getMetadataBase } from '@/lib/seo/metadata';
import { getSkills } from '@/lib/skills';

import styles from './page.module.scss';

const getProject = cache(async (slug: string, locale: string) =>
    getProjectBySlugAndLanguage(slug, locale)
);

const getContrastColor = (brandColor: string): string => {
    const r = parseInt(brandColor.slice(1, 3), 16);
    const g = parseInt(brandColor.slice(3, 5), 16);
    const b = parseInt(brandColor.slice(5, 7), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? '#000' : '#fff';
};

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string; slug: string }> }
): Promise<Metadata | undefined> {
    const { locale, slug } = await params;
    const project = await getProject(slug, locale);

    if (project) {
        const t = await getTranslations('metadata.project/[slug]');
        const title = t('title', { title: project.title });
        const keywords = project.seo_keywords.join(locale === 'zh-TW' ? '、' : ', ');

        return createSeoMetadata({
            locale,
            path: `/project/${slug}`,
            title,
            description: project.seo_description,
            keywords,
            image: project.cover_image_url
        });
    }

    return undefined;
}

export default async function Project(
    { params }: { params: Promise<{ locale: string; slug: string; }> }
): Promise<React.ReactNode> {
    const { locale, slug } = await params;
    const project = await getProject(slug, locale);
    const skillsData = getSkills(project?.tags ?? []);
    const content = project?.content?.replace(/\\n/g, '\n');

    if (!project) notFound();

    const baseUrl = getMetadataBase().toString();
    const projectUrl = `${baseUrl}/${locale}/project/${slug}`;

    const creativeWorkSchema = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.seo_description,
        url: projectUrl,
        author: {
            '@type': 'Person',
            name: locale === 'zh-TW' ? '朱晨霖' : 'Chen Lin Chu',
            url: baseUrl
        },
        datePublished: project.build_at,
        ...(project.updated_at && { dateModified: project.updated_at }),
        image: project.cover_image_url,
        keywords: project.seo_keywords.join(', ')
    };

    return (
        <div className={styles.container}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
            />
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
