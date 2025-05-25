import { notFound } from 'next/navigation';
import React from 'react';

import { getProjectBySlugAndLanguage } from '@/lib/queries/projects';

export default async function Project(
    { params }: { params: Promise<{ locale: string; slug: string; }> }
): Promise<React.ReactNode> {
    const { locale, slug } = await params;
    const project = await getProjectBySlugAndLanguage(slug, locale);

    if (!project) notFound();
    else return (
        <div>
            <h1>{project.title}</h1>
            <p>{project.subtitle}</p>
            <p>{project.tags.join(', ')}</p>
            <p>{project.content}</p>
            <p>{project.seo_description}</p>
            <p>{project.seo_slug}</p>
        </div>
    );
}
