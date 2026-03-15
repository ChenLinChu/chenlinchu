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
    const isMobile = project.device === 'mobile';

    return (
        <div className={Styles.container}>
            <div className={Styles.browserFrame}>
                <div className={Styles.browserHeader}>
                    <div className={Styles.trafficLights}>
                        <span className={Styles.trafficLight} />
                        <span className={Styles.trafficLight} />
                        <span className={Styles.trafficLight} />
                    </div>
                </div>
                <Link
                    className={Styles.coverLink}
                    href={`/project/${project.seo_slug}`}
                >
                    {isMobile ? (
                        <div className={Styles.deviceFrame}>
                            <div className={Styles.browserContent}>
                                <Image
                                    className={Styles.cover}
                                    src={project.cover_image_url}
                                    alt={project.title}
                                    width={1920}
                                    height={540}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className={Styles.browserContent}>
                            <Image
                                className={Styles.cover}
                                src={project.cover_image_url}
                                alt={project.title}
                                width={1920}
                                height={540}
                            />
                        </div>
                    )}
                </Link>
                <div className={Styles.consolePanel}>
                    <div className={Styles.consoleHeader}>
                        <span className={Styles.consoleTab}>Elements</span>
                        <span className={`${Styles.consoleTab} ${Styles.consoleTabActive}`}>
                            Console
                        </span>
                        <span className={Styles.consoleTab}>Network</span>
                    </div>
                    <div className={Styles.consoleContent}>
                        <div className={Styles.consoleLog}>
                            <span className={Styles.logInfo}>›</span>
                            <Link
                                className={Styles.titleLink}
                                href={`/project/${project.seo_slug}`}
                            >
                                <span className={Styles.title}>{project.title}</span>
                            </Link>
                        </div>
                        <div className={Styles.consoleLog}>
                            <span className={Styles.logInfoPlaceholder}>›</span>
                            <span className={Styles.subtitle}>{project.subtitle}</span>
                        </div>
                        <div className={Styles.consoleLog}>
                            <span className={Styles.logInfo}>›</span>
                            <span className={Styles.tagsLabel}>tags:</span>
                            <div className={Styles.tags}>
                                {project.tags.slice(0, 4).map((skillTag, tagIndex) => (
                                    <Link
                                        className={Styles.tag}
                                        href={`/projects/${skillTag}`}
                                        key={tagIndex}
                                    >
                                        [{skillTag}]
                                    </Link>
                                ))}
                                {project.tags.length > 4 && (
                                    <span className={Styles.moreDesktop}>
                                        +{project.tags.length - 4}
                                    </span>
                                )}
                                {project.tags.length > 3 && (
                                    <span className={Styles.moreMobile}>
                                        +{project.tags.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className={Styles.consoleLog}>
                            <span className={Styles.logInfoPlaceholder}>›</span>
                            <span className={Styles.buildAt}>
                                {t('buildAt', {
                                    company: project.build_at
                                })}
                            </span>
                        </div>
                        <div className={Styles.consoleInput}>
                            <span className={Styles.logInfo}>›</span>
                        </div>
                    </div>
                    {project.external_link && (
                        <Link
                            className={Styles.externalLink}
                            href={project.external_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t('externalLinkAriaLabel', {
                                title: project.title
                            })}
                        >
                            <Image
                                className={Styles.externalLinkIcon}
                                src={'/icons/External Link.svg'}
                                alt={t('externalLinkIconAlt')}
                                width={16}
                                height={16}
                            />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
