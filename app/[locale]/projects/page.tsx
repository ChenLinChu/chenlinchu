import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import React, { cache } from 'react';

import ProjectList from '@/components/app/projects/ProjectList';
import { getProjectsByLanguage } from '@/lib/queries/projects';
import { createSeoMetadata } from '@/lib/seo/metadata';

const getProjects = cache(async (locale: string) =>
    getProjectsByLanguage(locale)
);

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata | undefined> {
    const { locale } = await params;
    const projects = await getProjects(locale);

    if (projects.length > 0) {
        const t = await getTranslations('metadata.projects');
        const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));
        const keywords = t('keywords', {
            tags: allTags.join(locale === 'zh-TW' ? '、' : ', ')
        });

        return createSeoMetadata({
            locale,
            path: '/projects',
            title: t('title'),
            description: t('description'),
            keywords
        });
    }

    return undefined;
}

export default async function Projects(
    { params }: { params: Promise<{ locale: string; }> }
): Promise<React.ReactNode> {
    const { locale } = await params;
    const projects = await getProjects(locale);

    if (projects.length === 0) notFound();
    else return <ProjectList projects={projects} />;
}
