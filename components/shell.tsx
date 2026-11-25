'use client';

import { ChevronUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Nav } from '@/components/nav';

export function Shell({ children }: { children: React.ReactNode }) {
    const main = useBackForwardFade();
    return (
        <>
            <div className="max-w-screen-2xl px-4 pt-4 sm:px-12 sm:py-8 md:py-16 lg:px-20">
                <div className="flex flex-col md:flex-row">
                    <Nav />
                    <main ref={main} className="flex w-full flex-auto flex-col">{children}</main>
                </div>
            </div>
            <BackToTop />
        </>
    );
}

/**
 * Back/forward swaps pages instantly (no view transition), so fade the new page in instead.
 * Link clicks already fade via <PageTransition>.
 */
function useBackForwardFade() {
    const ref = useRef<HTMLElement>(null);
    const pathname = usePathname();
    const popped = useRef(false);

    useEffect(() => {
        const onPop = () => (popped.current = true);
        window.addEventListener('popstate', onPop);
        return () => window.removeEventListener('popstate', onPop);
    }, []);

    useEffect(() => {
        if (!popped.current) return;
        popped.current = false;
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        ref.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: 'ease-out' });
    }, [pathname]);

    return ref;
}

/** Shown whenever the page is tall enough to scroll; re-checked as content loads or resizes. */
function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = document.documentElement;
        const check = () => setVisible(el.scrollHeight - 100 > el.clientHeight);
        const ro = new ResizeObserver(check);
        ro.observe(document.body);
        return () => ro.disconnect();
    }, []);

    if (!visible) return null;
    return (
        <div className="back-to-top pr-8 pb-8 text-right">
            <button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <ChevronUp className="inline size-12" />
            </button>
        </div>
    );
}
