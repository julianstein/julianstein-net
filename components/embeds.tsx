'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Play } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ImageData } from '@/lib/content';

// Only downloaded once someone presses play.
const MuxPlayer = dynamic(() => import('@mux/mux-player-react'), {
    ssr: false,
});

export type VideoSource = { mux: string } | { vimeo: string };

/** How long the poster takes to fade out, and the video to fade in. */
const FADE_MS = 300;

/** Mux Player controls to hide (`--<control>-button: none`). Otherwise Mux's default look. */
const MUX_STYLE = {
    '--seek-backward-button': 'none',
    '--seek-forward-button': 'none',
    '--playback-rate-button': 'none',
    '--playback-rate-menu-button': 'none',
    '--pip-button': 'none',
} as const;

/**
 * Poster image with a play button. On click the poster fades out while the player loads,
 * paused, underneath. Once the poster is gone *and* the video can play, the video fades in
 * and starts at the same moment, so nothing plays unseen. Nothing player-related loads until
 * someone presses play.
 */
export function VideoEmbed({
    source,
    poster,
    title,
    aspect = '16/9',
}: {
    source: VideoSource;
    poster: ImageData;
    title: string;
    /** Video frame shape as "width/height". The poster is cropped to match. */
    aspect?: string;
}) {
    const [started, setStarted] = useState(false);
    const [posterGone, setPosterGone] = useState(false);
    const [ready, setReady] = useState(false);
    const show = started && posterGone && ready;

    // Next keeps visited pages mounted but hidden (React <Activity>), so the video would keep
    // playing after navigating away. This cleanup runs when the page is hidden: back to the poster.
    useLayoutEffect(
        () => () => {
            setStarted(false);
            setPosterGone(false);
            setReady(false);
        },
        []
    );

    const start = () => {
        setStarted(true);
        setTimeout(() => setPosterGone(true), FADE_MS);
    };
    const onReady = useCallback(() => setReady(true), []);

    // If the player never reports it's ready, show it anyway after a few seconds so its own
    // controls (and any error message) are reachable.
    useEffect(() => {
        if (!started) return;
        const t = setTimeout(onReady, 4000);
        return () => clearTimeout(t);
    }, [started, onReady]);

    const [w, h] = aspect.split('/').map(Number);
    const fade = { transitionDuration: `${FADE_MS}ms` };

    return (
        // Full width of the section, at the video's own shape.
        <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: `${w} / ${h}` }}>
            {started && (
                <div
                    className={`absolute inset-0 transition-opacity ease-out motion-reduce:transition-none ${
                        show ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={fade}
                >
                    {'mux' in source ? (
                        <MuxVideo playbackId={source.mux} title={title} play={show} onReady={onReady} />
                    ) : (
                        <VimeoVideo id={source.vimeo} title={title} play={show} onReady={onReady} />
                    )}
                </div>
            )}

            {/* Poster fades out as soon as play is pressed. */}
            <button
                type="button"
                onClick={start}
                disabled={started}
                aria-label={`Play video: ${title}`}
                className={`group absolute inset-0 transition-opacity ease-in motion-reduce:transition-none ${
                    started ? 'pointer-events-none opacity-0' : 'cursor-pointer opacity-100'
                }`}
                style={fade}
            >
                <Image
                    src={poster.src}
                    alt={poster.alt}
                    fill
                    sizes="(min-width: 1280px) 70vw, 100vw"
                    priority
                    className="object-cover"
                />
                <span className="absolute inset-0 grid place-items-center">
                    <span className="grid size-16 place-items-center rounded-full bg-black/60 text-white transition duration-300 group-hover:bg-black/80">
                        <Play className="ml-1 size-7" fill="currentColor" />
                    </span>
                </span>
            </button>
        </div>
    );
}

type PlayerProps = { title: string; play: boolean; onReady: () => void };

/** Mux player that loads paused, reports when it can play, and starts when `play` turns true. */
function MuxVideo({ playbackId, title, play, onReady }: PlayerProps & { playbackId: string }) {
    const [el, setEl] = useState<HTMLMediaElement | null>(null);

    useEffect(() => {
        if (play) el?.play().catch(() => {});
    }, [play, el]);

    return (
        <MuxPlayer
            playbackId={playbackId}
            preload="auto"
            accentColor="#6b7280"
            metadata={{ video_title: title }}
            onCanPlay={e => {
                setEl(e.target as unknown as HTMLMediaElement);
                onReady();
            }}
            className="absolute inset-0 h-full w-full"
            style={MUX_STYLE}
        />
    );
}

/** Vimeo iframe, driven through Vimeo's postMessage player API: reports ready, plays on `play`. */
function VimeoVideo({ id, title, play, onReady }: PlayerProps & { id: string }) {
    const ref = useRef<HTMLIFrameElement>(null);
    const post = (msg: object) =>
        ref.current?.contentWindow?.postMessage(JSON.stringify(msg), 'https://player.vimeo.com');

    useEffect(() => {
        const onMessage = (e: MessageEvent) => {
            if (e.origin !== 'https://player.vimeo.com' || e.source !== ref.current?.contentWindow) return;
            let data: { event?: string };
            try {
                data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
            } catch {
                return;
            }
            if (data.event === 'ready') onReady();
        };
        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, [onReady]);

    useEffect(() => {
        if (play) post({ method: 'play' });
    }, [play]);

    return (
        <iframe
            ref={ref}
            src={`https://player.vimeo.com/video/${id}?playsinline=1&api=1`}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
        />
    );
}

export function BandcampEmbed({ album, title }: { album: string; title: string }) {
    return (
        <iframe
            title={`${title} on Bandcamp`}
            src={`https://bandcamp.com/EmbeddedPlayer/album=${album}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/`}
            className="h-[406px] w-full border-0"
            loading="lazy"
        />
    );
}
