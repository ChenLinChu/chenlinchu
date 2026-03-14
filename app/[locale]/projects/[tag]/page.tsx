import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import React, { cache } from 'react';

import ProjectList from '@/components/app/projects/ProjectList';
import { getProjectsByTagAndLanguage } from '@/lib/queries/projects';
import { createSeoMetadata } from '@/lib/seo/metadata';

const getProjects = cache(async (tag: string, locale: string) =>
    getProjectsByTagAndLanguage(tag, locale)
);

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string; tag: string }> }
): Promise<Metadata | undefined> {
    const { locale, tag } = await params;
    const decodedTag = decodeURIComponent(tag);
    const projects = await getProjects(tag, locale);

    if (projects.length > 0) {
        const t = await getTranslations('metadata.projects');
        const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));
        const keywords = t('keywords', {
            tags: allTags.join(locale === 'zh-TW' ? '、' : ', ')
        });

        return createSeoMetadata({
            locale,
            path: `/projects/${decodedTag}`,
            title: t('titleTag', { tag: decodedTag }),
            description: t('descriptionTag', { tag: decodedTag }),
            keywords
        });
    }

    return undefined;
}

export default async function ProjectByTag(
    { params }: { params: Promise<{ locale: string; tag: string; }> }
): Promise<React.ReactNode> {
    const { locale, tag } = await params;
    const projects = await getProjects(tag, locale);

    if (projects.length === 0) notFound();
    else return <ProjectList projects={projects} />;
}
