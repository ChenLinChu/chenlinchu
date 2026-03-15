import { unstable_cache } from 'next/cache';

import { sql } from '@/lib/db';
import type { Project } from '@/types/project';

export async function getProjectsByLanguage(
    language: string,
    limit = 10,
    offset = 0
): Promise<Project[]> {
    const getCached = unstable_cache(
        async () => {
            try {
                const projects = await sql`
                    SELECT cover_image_url, title, external_link, subtitle, tags, build_at, seo_slug, COALESCE(device, 'desktop') as device
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
        },
        ['projects', 'by-language', language, String(limit), String(offset)],
        { revalidate: 60, tags: ['projects'] }
    );

    return getCached();
}

export async function getProjectsByTagAndLanguage(
    tag: string,
    language: string
): Promise<Project[]> {
    const decodedTag = decodeURIComponent(tag);
    const getCached = unstable_cache(
        async () => {
            try {
                const projects = await sql`
                    SELECT cover_image_url, title, external_link, subtitle, tags, build_at, seo_slug, COALESCE(device, 'desktop') as device
                    FROM projects
                    WHERE ${decodedTag} = ANY(tags)
                    AND language = ${language}
                    ORDER BY created_at DESC
                `;

                return projects as Project[];
            } catch (error) {
                console.error('Failed to fetch projects:', error);

                return [];
            }
        },
        ['projects', 'by-tag', tag, language],
        { revalidate: 60, tags: ['projects'] }
    );

    return getCached();
}

export async function getProjectBySlugAndLanguage(
    slug: string,
    language: string
): Promise<Project | null> {
    const getCached = unstable_cache(
        async () => {
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
                        seo_slug,
                        build_at,
                        updated_at,
                        COALESCE(device, 'desktop') as device
                    FROM projects
                    WHERE seo_slug = ${slug}
                    AND language = ${language}
                `;

                return project[0] as Project;
            } catch (error) {
                console.error('Failed to fetch project:', error);

                return null;
            }
        },
        ['project', 'by-slug', slug, language],
        { revalidate: 60, tags: ['projects'] }
    );

    return getCached();
}
