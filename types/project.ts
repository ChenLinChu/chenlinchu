export interface Project {
    id: number;
    cover_image_url: string;
    title: string;
    external_link: string;
    subtitle: string;
    tags: string[];
    build_at: string;
    content: string;
    seo_description: string;
    seo_keywords: string[];
    seo_slug: string;
}
