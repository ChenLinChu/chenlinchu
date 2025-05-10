import React from 'react';

import Styles from './Footer.module.scss';

export default function Footer(): React.ReactNode {
    return (
        <div className={Styles.copyright}>
            © 2025 Chen Lin Chu. All Rights Reserved.
        </div>
    );
}
