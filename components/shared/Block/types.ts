import type { ReactNode } from 'react';

export interface ResponsiveGrid {
    default: string;
    xl?: string;
    lg?: string;
    md?: string;
}

export interface BlockProps {
    children?: ReactNode;
    column?: ResponsiveGrid;
    row?: ResponsiveGrid;
    noPadding?: boolean;
}
