import type { Metadata } from 'next';
import { PageTransition } from '@/components/page-transition';
import { SketchesGrid } from '@/components/sketches-grid';
import { SKETCHES } from '@/lib/site';

export const metadata: Metadata = {
    title: SKETCHES.title,
    description: 'video synthesis compositions using MaxMSP/Jitter and vsynth',
};

export default function SketchesPage() {
    return (
        <PageTransition>
            <div className="pb-20 md:pt-4">
                <SketchesGrid />
            </div>
        </PageTransition>
    );
}
