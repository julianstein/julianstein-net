'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { LazyVideo } from '@/components/lazy-video';

const VIDEOS = [
    'aroom_01', 'aroom_02', 'aroom_03', 'aroom_04', 'aroom_05',
    'wind_01', 'noodles', 'rhythm-assemblage_01', 'rhythm-assemblage_02',
    'steinj-video_02', 'steinj-video_04', 'steinj-video_05', 'steinj-video_09',
    'steinj-video_11', 'steinj-video_15', 'steinj-video_16', 'stairs-01', 'palms-01',
];

const pick = (exclude?: string) => {
    const pool = VIDEOS.filter(v => v !== exclude);
    return pool[Math.floor(Math.random() * pool.length)];
};

/** A random clip that fades in once loaded; tap to fade to another one, drag and it springs back. */
export function HomeVideo() {
    const [video, setVideo] = useState<string | null>(null);
    const [fading, setFading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    // Motion can still fire onTap when a drag ends over the element; a drag shouldn't switch clips.
    const dragged = useRef(false);

    // eslint-disable-next-line react-hooks/set-state-in-effect -- random pick must happen on the client
    useEffect(() => setVideo(pick()), []);

    const next = () => {
        if (fading || dragged.current) return;
        setFading(true);
        setTimeout(() => {
            setLoaded(false);
            setVideo(v => pick(v ?? undefined));
            setFading(false);
        }, 700);
    };

    return (
        <div className="mt-14 hidden max-w-xl sm:flex">
            <motion.button
                type="button"
                aria-label="Show another video"
                className="relative block aspect-[3/2] w-[350px] grow cursor-pointer"
                drag
                dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 1 }}
                animate={{ opacity: fading || !loaded ? 0 : 1 }}
                transition={{ opacity: { duration: fading ? 0.7 : 1.2, ease: 'easeInOut' }, scale: { type: 'spring', duration: 1 } }}
                onPointerDown={() => (dragged.current = false)}
                onDragStart={() => (dragged.current = true)}
                onTap={next}
            >
                {video && <LazyVideo name={video} onReady={() => setLoaded(true)} />}
            </motion.button>
        </div>
    );
}
