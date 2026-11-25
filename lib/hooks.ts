'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

/** Becomes true once the element has entered the viewport, then stays true. */
export function useInViewOnce<T extends Element>(options?: IntersectionObserverInit) {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);
    const { threshold, rootMargin } = options ?? {};

    useEffect(() => {
        const el = ref.current;
        if (!el || inView) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    io.disconnect();
                }
            },
            { threshold, rootMargin }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [inView, threshold, rootMargin]);

    return [ref, inView] as const;
}

export function useMediaQuery(query: string, serverValue = false) {
    return useSyncExternalStore(
        cb => {
            const mql = window.matchMedia(query);
            mql.addEventListener('change', cb);
            return () => mql.removeEventListener('change', cb);
        },
        () => window.matchMedia(query).matches,
        () => serverValue
    );
}

/** Fisher–Yates shuffle, run once on the client after mount. */
export function useShuffled<T>(items: T[]) {
    const [shuffled, setShuffled] = useState(items);
    useEffect(() => {
        const a = [...items];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional client-only randomization
        setShuffled(a);
    }, [items]);
    return shuffled;
}
