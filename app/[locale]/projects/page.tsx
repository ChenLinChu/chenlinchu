import React from 'react';

import ProjectList from '@/components/app/projects/ProjectList';
import { getProjectsByLanguage } from '@/lib/queries/projects';

export default async function Projects(
    { params }: { params: Promise<{ locale: string; }> }
): Promise<React.ReactNode> {
    const { locale } = await params;
    const projects = await getProjectsByLanguage(locale);

    return (
        <ProjectList projects={projects} />
    );
}
