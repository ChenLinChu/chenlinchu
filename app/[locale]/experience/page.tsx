import React from 'react';

import experience from '@/lib/experience';

export default function Experience(): React.ReactNode {
    return (
        <div>
            {experience.map((item, index) => (
                <div key={index}>
                    <h2>{item.company}</h2>
                    <p>{item.position}</p>
                    <p>{item.startDate.year}-{item.startDate.month}</p>
                    <p>{item.endDate.year}-{item.endDate.month}</p>
                </div>
            ))}
        </div>
    );
}
