import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { Link } from '@/i18n/navigation';
import type { Project } from '@/types/project';

import Styles from './index.module.scss';

export default async function ProjectContainer(
    { project }: { project: Project }
): Promise<React.ReactNode> {
    const t = await getTranslations('main.page.block.projects');

    return (
        <div className={Styles.container}>
            <Link
                className={Styles.coverLink}
                href={`/project/${project.seo_slug}`}
            >
                <Image
                    className={Styles.cover}
                    src={project.cover_image_url}
                    alt={project.title}
                    width={1920}
                    height={540}
                />
            </Link>

            <div className={Styles.content}>
                <div className={Styles.titleWrapper}>
                    <Link
                        className={Styles.titleLink}
                        href={`/project/${project.seo_slug}`}
                    >
                        <h2 className={Styles.title}>{project.title}</h2>
                    </Link>

                    {project.external_link && (
                        <Link
                            className={Styles.externalLink}
                            href={project.external_link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                className={Styles.externalLink}
                                src={'/icons/External Link.svg'}
                                alt={'external link'}
                                width={25}
                                height={25}
                            />
                        </Link>
                    )}
                </div>

                <p className={Styles.subtitle}>{project.subtitle}</p>

                <div className={Styles.tags}>
                    {project.tags.slice(0, 5).map((skillTag, tagIndex) => {
                        return (
                            <Link
                                className={Styles.tag}
                                href={`/projects/${skillTag}`}
                                key={tagIndex}
                            >
                                {skillTag}
                            </Link>
                        );
                    })}

                    {project.tags.length > 5 && (
                        <span className={Styles.more}>
                            +{project.tags.length - 5}
                        </span>
                    )}
                </div>

                <p className={Styles.buildAt}>
                    {t('buildAt', {
                        company: project.build_at
                    })}
                </p>
            </div>
        </div>
    );
}
