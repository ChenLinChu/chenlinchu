import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { skillsData } from '@/components/app/skills/skillsData';
import { Link } from '@/i18n/navigation';
import { createSeoMetadata } from '@/lib/seo/metadata';
import { createBreadcrumbSchema } from '@/lib/seo/schemas';

import Styles from './page.module.scss';

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations('metadata.skills');

    return createSeoMetadata({
        locale,
        path: '/skills',
        title: t('title'),
        description: t('description'),
        keywords: t('keywords')
    });
}

function formatLsDate(): string {
    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const mon = months[d.getMonth()];
    const day = d.getDate().toString().padStart(2, ' ');
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    return `${mon} ${day} ${h}:${m}`;
}

export default async function SkillsPage(
    { params }: { params: Promise<{ locale: string }> }
): Promise<React.ReactElement> {
    const { locale } = await params;
    const t = await getTranslations('main.skills');
    const tBreadcrumb = await getTranslations('metadata.breadcrumb');
    const breadcrumbSchema = createBreadcrumbSchema(locale, [
        { name: tBreadcrumb('home'), path: '/' },
        { name: tBreadcrumb('skills'), path: '/skills' }
    ]);

    const lsDate = formatLsDate();
    const totalBlocks = skillsData.length + 2;

    return (
        <main className={Styles.container}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className={Styles.terminal}>
                <div className={Styles.terminalHeader}>
                    <span className={Styles.terminalDot} />
                    <span className={Styles.terminalDot} />
                    <span className={Styles.terminalDot} />
                    <span className={Styles.terminalTitle}>skills</span>
                </div>
                <div className={Styles.terminalContent}>
                    <div className={Styles.promptLine}>
                        <span className={Styles.prompt}>{t('terminalPrompt')}</span>
                    </div>
                    <div className={`${Styles.lsOutput} ${Styles.lsOutputRoot}`}>
                        <div className={Styles.lsLine}>
                            <span className={Styles.lsTotal}>total {totalBlocks}</span>
                        </div>
                        <div className={Styles.lsLine}>
                            <span className={Styles.lsPerms}>drwxr-xr-x</span>
                            <span className={Styles.lsMeta}>  2 chenlinchu staff</span>
                            <span className={Styles.lsSize}> 384</span>
                            <span className={Styles.lsDate}>{lsDate}</span>
                            <span className={Styles.lsName}>.</span>
                        </div>
                        <div className={Styles.lsLine}>
                            <span className={Styles.lsPerms}>drwxr-xr-x</span>
                            <span className={Styles.lsMeta}>  5 chenlinchu staff</span>
                            <span className={Styles.lsSize}> 160</span>
                            <span className={Styles.lsDate}>{lsDate}</span>
                            <span className={Styles.lsName}>..</span>
                        </div>
                        {skillsData.map((block) => {
                            const folderName = t(block.title);
                            const folderId = `folder-${block.title.replace('blockTitle.', '')}`;
                            return (
                                <React.Fragment key={block.title}>
                                    <div className={Styles.lsLine}>
                                        <span className={Styles.lsPerms}>drwxr-xr-x</span>
                                        <span className={Styles.lsMeta}>  2 chenlinchu staff</span>
                                        <span className={Styles.lsSize}>  64</span>
                                        <span className={Styles.lsDate}>{lsDate}</span>
                                        <a
                                            className={Styles.lsDirName}
                                            href={`#${folderId}`}
                                        >
                                            {folderName}
                                        </a>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                    {skillsData.map((block) => {
                        const folderName = t(block.title);
                        const folderId = `folder-${block.title.replace('blockTitle.', '')}`;
                        const cdPath = folderName.includes(' ')
                            ? `"${folderName}"`
                            : folderName;
                        return (
                            <div
                                className={Styles.folderBlock}
                                id={folderId}
                                key={block.title}
                            >
                                <div className={Styles.promptLine}>
                                    <span className={Styles.prompt}>
                                        $ cd {cdPath} && ls -la
                                    </span>
                                </div>
                                <div className={Styles.lsOutput}>
                                    <div className={Styles.lsLine}>
                                        <span className={Styles.lsTotal}>
                                            total {block.skills.length}
                                        </span>
                                    </div>
                                    <div className={Styles.lsLine}>
                                        <span className={Styles.lsPerms}>drwxr-xr-x</span>
                                        <span className={Styles.lsMeta}>  2 chenlinchu staff</span>
                                        <span className={Styles.lsSize}>  64</span>
                                        <span className={Styles.lsDate}>{lsDate}</span>
                                        <span className={Styles.lsName}>.</span>
                                    </div>
                                    <div className={Styles.lsLine}>
                                        <span className={Styles.lsPerms}>drwxr-xr-x</span>
                                        <span className={Styles.lsMeta}>  5 chenlinchu staff</span>
                                        <span className={Styles.lsSize}> 160</span>
                                        <span className={Styles.lsDate}>{lsDate}</span>
                                        <span className={Styles.lsName}>..</span>
                                    </div>
                                    {block.skills.map((skill) => {
                                        const w = skill.isBlackIcon ? Styles.skillIconWhite : '';
                                        const iconCls =
                                            [Styles.skillIcon, w].filter(Boolean).join(' ');
                                        const projectHref = `/projects/${skill.fileName}`;
                                        return (
                                            <div
                                                className={Styles.lsLine}
                                                key={skill.fileName}
                                            >
                                                <span className={Styles.lsPerms}>-rw-r--r--</span>
                                                <span className={Styles.lsMeta}>
                                                    {'  1 chenlinchu staff'}
                                                </span>
                                                <span className={Styles.lsSize}> 128</span>
                                                <span className={Styles.lsDate}>{lsDate}</span>
                                                <Link
                                                    className={Styles.lsFileLink}
                                                    href={projectHref}
                                                >
                                                    <Image
                                                        className={iconCls}
                                                        src={`/icons/${skill.fileName}.svg`}
                                                        alt={skill.fileName}
                                                        width={16}
                                                        height={16}
                                                    />
                                                    {skill.fileName}
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                    <div className={Styles.promptLine}>
                        <span className={Styles.prompt}>$</span>
                        <span className={Styles.cursor}>_</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
