import React from 'react';

import Block from '@/components/shared/Block';

import Experience from './Experience';
import GitHubIcon from './GitHubIcon';
import LinkedInIcon from './LinkedInIcon';
import MailIcon from './MailIcon';
import SkillsTree from './SkillsTree';

export default function Section2(): React.ReactNode {
    return (
        <>
            {/* LinkedIn */}
            <Block
                column={{
                    default: '1 / span 1',
                    xl: '1 / span 1',
                    md: '3 / span 2'
                }}
                row={{
                    default: '4 / span 1',
                    xl: '4 / span 1',
                    md: '8 / span 1'
                }}
            >
                <LinkedInIcon />
            </Block>

            {/* Email */}
            <Block
                column={{
                    default: '1 / span 1',
                    xl: '1 / span 1',
                    md: '5 / span 2'
                }}
                row={{
                    default: '5 / span 1',
                    xl: '5 / span 1',
                    md: '8 / span 1'
                }}
            >
                <MailIcon />
            </Block>

            {/* GitHub */}
            <Block
                column={{
                    default: '1 / span 1',
                    xl: '1 / span 1',
                    md: '7 / span 2'
                }}
                row={{
                    default: '6 / span 1',
                    xl: '6 / span 1',
                    md: '8 / span 1'
                }}
            >
                <GitHubIcon />
            </Block>

            {/* Skills Tree */}
            <Block
                column={{
                    default: '2 / span 3',
                    xl: '2 / span 3',
                    md: '1 / span 8'
                }}
                row={{
                    default: '4 / span 3',
                    xl: '4 / span 3',
                    md: '9 / span 2'
                }}
                noPadding
            >
                <SkillsTree />
            </Block>

            {/* Career Experience */}
            <Block
                column={{
                    default: '5 / span 4',
                    xl: '5 / span 4',
                    md: '1 / span 8'
                }}
                row={{
                    default: '4 / span 4',
                    xl: '4 / span 4',
                    md: '11 / span 4'
                }}
            >
                <Experience />
            </Block>
        </>
    );
}
