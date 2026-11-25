import type { CSSProperties, ReactNode } from 'react';

/**
 * Flex-wrap "justified" layout: each item's basis is aspect × --row and it
 * grows in proportion to its aspect ratio, so rows fill the width while
 * keeping heights roughly even. Set --row per breakpoint via `className`.
 */
export function JustifiedGrid({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <div className={`justified ${className}`}>{children}</div>;
}

export function JustifiedItem({
    aspect,
    children,
    className = '',
}: {
    aspect: number;
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={`justified-item ${className}`} style={{ '--ar': aspect } as CSSProperties}>
            {children}
        </div>
    );
}
