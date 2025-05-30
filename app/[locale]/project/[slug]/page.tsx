import { notFound } from 'next/navigation';
import React from 'react';
import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { getProjectBySlugAndLanguage } from '@/lib/queries/projects';

export default async function Project(
    { params }: { params: Promise<{ locale: string; slug: string; }> }
): Promise<React.ReactNode> {
    const { locale, slug } = await params;
    const project = await getProjectBySlugAndLanguage(slug, locale);
    const content = project?.content?.replace(/\\n/g, '\n');

    if (!project) notFound();
    else return (
        <div>
            <h1>{project.title}</h1>
            <p>{project.subtitle}</p>
            <p>{project.tags.join(', ')}</p>

            <Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                {content}
            </Markdown>
        </div>
    );
}
