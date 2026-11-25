'use client';

import { FadeIn } from '@/components/fade-in';
import { JustifiedGrid, JustifiedItem } from '@/components/justified-grid';
import { LazyVideo } from '@/components/lazy-video';
import { useShuffled } from '@/lib/hooks';

const VIDEOS = Array.from({ length: 16 }, (_, i) => `steinj-video_${String(i + 1).padStart(2, '0')}`);

export function SketchesGrid() {
    const videos = useShuffled(VIDEOS);
    return (
        <JustifiedGrid
            className="justified-keep-last [--row:140px] sm:[--row:170px] md:[--row:150px] lg:[--row:170px] xl:[--row:125px] min-[1440px]:[--row:150px] min-[1680px]:[--row:160px]"
        >
            {videos.map(name => (
                <JustifiedItem key={name} aspect={1.5}>
                    <FadeIn className="absolute inset-0">
                        <LazyVideo name={name} />
                    </FadeIn>
                </JustifiedItem>
            ))}
        </JustifiedGrid>
    );
}
