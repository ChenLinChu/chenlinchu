import { sql } from '@/lib/db';
import type { Project } from '@/types/project';

export async function getProjectsByLanguage(
    language: string,
    limit = 10,
    offset = 0
): Promise<Project[]> {
    try {
        const projects = await sql`
            SELECT cover_image_url, title, external_link, subtitle, tags, build_at, seo_slug
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

export async function getProjectsByTagAndLanguage(
    tag: string,
    language: string
): Promise<Project[]> {
    try {
        const projects = await sql`
            SELECT cover_image_url, title, external_link, subtitle, tags, build_at, seo_slug
            FROM projects
            WHERE ${decodeURIComponent(tag)} = ANY(tags)
            AND language = ${language}
            ORDER BY created_at DESC
        `;

        return projects as Project[];
    } catch (error) {
        console.error('Failed to fetch projects:', error);

        return [];
    }
}

export async function getProjectBySlugAndLanguage(
    slug: string,
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
                seo_slug
            FROM projects
            WHERE seo_slug = ${slug}
            AND language = ${language}
        `;

        return project[0] as Project;
    } catch (error) {
        console.error('Failed to fetch project:', error);

        return null;
    }
}
