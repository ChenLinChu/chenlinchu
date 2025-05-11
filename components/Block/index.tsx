import React, { isValidElement } from 'react';

import Styles from './index.module.scss';
import type { BlockProps } from './types';

export default function Block({
    children,
    column = '1 / span 1',
    row = '1 / span 1',
    noPadding = false
}: BlockProps): React.ReactNode {
    const childArray = React.Children.toArray(children).filter(isValidElement);

    return (
        <div
            className={Styles.block}
            style={{
                gridColumn: column,
                gridRow: row,
                padding: noPadding ? 0 : '20px 24px'
            }}
        >
            {childArray.map((child, index) => {
                return (
                    <div
                        key={index}
                        className={Styles.block__item}
                    >
                        {child}
                    </div>
                );
            })}
        </div>
    );
}
