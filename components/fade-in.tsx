'use client';

import { useInViewOnce } from '@/lib/hooks';

export function FadeIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const [ref, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.25 });
    return (
        <div ref={ref} className={`fade-in ${inView ? 'is-visible' : ''} ${className}`}>
            {children}
        </div>
    );
}
