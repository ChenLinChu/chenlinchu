import React, { isValidElement } from 'react';

import Styles from './index.module.scss';
import type { BlockProps, ResponsiveGrid } from './types';

const getResponsiveVariables = (
    value: string | ResponsiveGrid | undefined,
    property: 'grid-column' | 'grid-row'
): { [key: string]: string } => {
    if (!value) return {};
    if (typeof value === 'string') return { [property]: value };

    const styles: {
        [key: string]: string
    } = {};

    styles[`--${property}-default`] = value.default;

    if (value.xl) styles[`--${property}-xl`] = value.xl;
    if (value.lg) styles[`--${property}-lg`] = value.lg;
    if (value.md) styles[`--${property}-md`] = value.md;

    return styles;
};

export default function Block({
    children,
    column = {
        default: '1 / span 1'
    },
    row = {
        default: '1 / span 1'
    },
    noPadding = false
}: BlockProps): React.ReactNode {
    const childArray = React.Children.toArray(children).filter(isValidElement);

    const columnVariables = getResponsiveVariables(column, 'grid-column');
    const rowVariables = getResponsiveVariables(row, 'grid-row');

    return (
        <div
            className={Styles.block}
            style={{
                padding: noPadding ? 0 : '20px 24px',
                ...columnVariables,
                ...rowVariables
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
