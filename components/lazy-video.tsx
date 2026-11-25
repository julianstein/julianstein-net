'use client';

import { useEffect, useRef } from 'react';
import { useInViewOnce } from '@/lib/hooks';

/**
 * Looping muted clip from /public/videos, only mounted once near the viewport. Plays only
 * while on screen, so it also pauses when scrolled away or when Next hides the page
 * after navigating elsewhere (hidden pages are display: none, which never intersects).
 */
export function LazyVideo({
    name,
    className = '',
    onReady,
}: {
    name: string;
    className?: string;
    onReady?: () => void;
}) {
    const [ref, inView] = useInViewOnce<HTMLDivElement>({ rootMargin: '200px' });
    const video = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const el = video.current;
        if (!el) return;
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) el.play().catch(() => {});
            else el.pause();
        });
        io.observe(el);
        return () => io.disconnect();
    }, [inView, name]);

    return (
        <div ref={ref} className={`absolute inset-0 ${className}`}>
            {inView && (
                <video
                    ref={video}
                    key={name}
                    src={`/videos/${name}.m4v`}
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onLoadedData={onReady}
                    onContextMenu={e => e.preventDefault()}
                    className="h-full w-full object-cover"
                />
            )}
        </div>
    );
}
