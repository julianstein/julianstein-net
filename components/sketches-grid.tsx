'use client';

import { FadeIn } from '@/components/fade-in';
import { LazyVideo } from '@/components/lazy-video';
import { useShuffled } from '@/lib/hooks';

const VIDEOS = Array.from({ length: 16 }, (_, i) => `steinj-video_${String(i + 1).padStart(2, '0')}`);

export function SketchesGrid() {
    const videos = useShuffled(VIDEOS);
    return (
        <div className="grid grid-cols-2 gap-3 p-1.5 xl:grid-cols-4">
            {videos.map(name => (
                <div key={name} className="relative aspect-[3/2]">
                    <FadeIn className="absolute inset-0">
                        <LazyVideo name={name} />
                    </FadeIn>
                </div>
            ))}
        </div>
    );
}
