import React from 'react';

import ProjectList from '@/components/app/projects/ProjectList';
import { getProjectsByTagAndLanguage } from '@/lib/queries/projects';

export default async function Project(
    { params }: { params: Promise<{ locale: string; tag: string; }> }
): Promise<React.ReactNode> {
    const { locale, tag } = await params;
    const projects = await getProjectsByTagAndLanguage(tag, locale);

    return (
        <ProjectList projects={projects} />
    );
}
