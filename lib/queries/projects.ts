import { sql } from '@/lib/db';

interface Project {
    id: number;
    cover_image_url: string;
    title: string;
    subtitle: string;
    external_link: string;
    tags: string[];
    content?: string;
    seo_description?: string;
    seo_keywords?: string[];
    seo_title?: string;
    seo_slug?: string;
    seo_og_image?: string;
}

export async function getProjectsByLanguage(
    language: string,
    limit = 10,
    offset = 0
): Promise<Project[]> {
    try {
        const projects = await sql`
            SELECT cover_image_url, title, subtitle, external_link, tags
            FROM projects
            WHERE language = ${language}
            ORDER BY created_at DESC
            LIMIT ${limit} OFFSET ${offset}
        `;

        return projects as Project[];
    } catch (error) {
        console.error('Failed to fetch projects:', error);

        return [];
    }
}

export async function getProjectByIdAndLanguage(
    id: number,
    language: string
): Promise<Project | null> {
    try {
        const project = await sql`
            SELECT cover_image_url,
                title,
                subtitle,
                external_link,
                tags,
                content,
                seo_description,
                seo_keywords,
                seo_title,
                seo_slug,
                seo_og_image
            FROM projects
            WHERE id = ${id}
            AND language = ${language}
        `;

        return project[0] as Project;
    } catch (error) {
        console.error('Failed to fetch project:', error);

        return null;
    }
}
