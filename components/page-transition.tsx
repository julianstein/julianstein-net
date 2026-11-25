import { ViewTransition } from 'react';

/**
 * Crossfades page content on navigation: the old page fades out while the new
 * one fades in (CSS in globals.css, `.page-fade`). Wrap each page, not a layout —
 * layouts stay mounted across navigations, so they never enter or exit.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
    return (
        <ViewTransition enter="page-fade" exit="page-fade" default="none">
            <div>{children}</div>
        </ViewTransition>
    );
}
