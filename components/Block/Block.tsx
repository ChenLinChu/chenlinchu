import React, { isValidElement } from 'react';

import Styles from './Block.module.scss';
import type { BlockProps } from './types';

export default function Block({
    children,
    column = '1 / span 1',
    row = '1 / span 1'
}: BlockProps): React.ReactNode {
    const childArray = React.Children.toArray(children).filter(isValidElement);

    return (
        <div
            className={Styles.block}
            style={{
                gridColumn: column,
                gridRow: row
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
