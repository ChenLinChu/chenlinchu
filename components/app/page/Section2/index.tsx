import React from 'react';

import Block from '@/components/Block';

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
                column={'1 / span 1'}
                row={'4 / span 1'}
            >
                <LinkedInIcon />
            </Block>

            {/* Email */}
            <Block
                column={'1 / span 1'}
                row={'5 / span 1'}
            >
                <MailIcon />
            </Block>

            {/* GitHub */}
            <Block
                column={'1 / span 1'}
                row={'6 / span 1'}
            >
                <GitHubIcon />
            </Block>

            {/* Skills Tree */}
            <Block
                column={'2 / span 3'}
                row={'4 / span 3'}
                noPadding
            >
                <SkillsTree />
            </Block>

            {/* Career Experience */}
            <Block
                column={'5 / span 4'}
                row={'4 / span 4'}
            >
                <Experience />
            </Block>
        </>
    );
}
