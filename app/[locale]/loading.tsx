import React from 'react';

export default function Loading(): React.ReactElement {
    return (
        <>
            <div
                aria-label="Loading"
                role="status"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '200px'
                }}
            >
                <div
                    style={{
                        width: '32px',
                        height: '32px',
                        border: '3px solid var(--header-nav-button-bg)',
                        borderTopColor: 'var(--color-text)',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite'
                    }}
                />
            </div>
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </>
    );
}
