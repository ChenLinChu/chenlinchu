import React from 'react';

import Block from '@/components/Block/Block';

import Styles from './page.module.scss';

export default function Index(): React.ReactNode {
    return (
        <div className={Styles.container}>
            <Block
                column={'1 / span 5'}
                row={'1 / span 3'}
            >
                <h1>Hello</h1>
                <p>Lorem ipsum dolor sit amet</p>
            </Block>
            <Block
                column={'6 / span 1'}
                row={'1 / span 1'}
            >
                <h1>Hello</h1>
                <p>elit. Eum iusto vel perspiciatis sint</p>
            </Block>
            <Block
                column={'7 / span 1'}
                row={'1 / span 1'}
            >
                <h1>Hello</h1>
                <p>elit. Eum iusto vel perspiciatis sint</p>
            </Block>
            <Block
                column={'8 / span 1'}
                row={'1 / span 1'}
            >
                <h1>Hello</h1>
                <p>elit. Eum iusto vel perspiciatis sint</p>
            </Block>
            <Block
                column={'6 / span 1'}
                row={'2 / span 1'}
            >
                <h1>Hello</h1>
                <p>elit. Eum iusto vel perspiciatis sint</p>
            </Block>
            <Block
                column={'7 / span 1'}
                row={'2 / span 1'}
            >
                <h1>Hello</h1>
                <p>elit. Eum iusto vel perspiciatis sint</p>
            </Block>
            <Block
                column={'8 / span 1'}
                row={'2 / span 1'}
            >
                <h1>Hello</h1>
                <p>elit. Eum iusto vel perspiciatis sint</p>
            </Block>
            <Block
                column={'6 / span 1'}
                row={'3 / span 1'}
            >
                <h1>Hello</h1>
                <p>elit. Eum iusto vel perspiciatis sint</p>
            </Block>
            <Block
                column={'7 / span 1'}
                row={'3 / span 1'}
            >
                <h1>Hello</h1>
                <p>elit. Eum iusto vel perspiciatis sint</p>
            </Block>
            <Block
                column={'8 / span 1'}
                row={'3 / span 1'}
            >
                <h1>Hello</h1>
                <p>elit. Eum iusto vel perspiciatis sint</p>
            </Block>
            <Block
                column={'1 / span 8'}
                row={'4 / span 5'}
            >
                <h1>Hello</h1>
                <p>elit. Eum iusto vel perspiciatis sint</p>
            </Block>
        </div>
    );
}
