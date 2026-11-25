'use client';

import { getImageProps } from 'next/image';
import { useEffect, useRef, useState, ViewTransition } from 'react';
import { createPortal } from 'react-dom';
import type { ImageData } from '@/lib/content';

/** Shared view-transition name linking a grid thumbnail to its lightbox image. */
export const lightboxName = (image: ImageData) => `lb${image.src.replace(/[^a-z0-9]/gi, '-')}`;

const SWIPE_PX = 50;

/**
 * Full-screen view of one gallery image. ← / → (or swipe) step through `images`;
 * click, scroll or Esc closes. The grow-from-grid animation comes from the shared
 * <ViewTransition> name; open/close must be wrapped in startTransition by the caller.
 *
 * `initialSrc` is the URL the clicked thumbnail already has loaded. The opening animation
 * uses it so there's no empty frame, then the full-resolution image swaps in once loaded.
 */
export function Lightbox({
    images,
    index,
    initialSrc,
    onIndexChange,
    onClose,
}: {
    images: ImageData[];
    index: number;
    initialSrc?: string;
    onIndexChange: (index: number) => void;
    onClose: () => void;
}) {
    const image = images[index];
    const n = images.length;
    const pointerX = useRef<number | null>(null);
    const [openedAt] = useState(index); // the image the lightbox was opened on
    const [fullLoaded, setFullLoaded] = useState(false);

    const go = (step: number) => onIndexChange((index + step + n) % n);

    // Keyboard + close-on-scroll. Re-bound each render so `go` is current.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') go(1);
            else if (e.key === 'ArrowLeft') go(-1);
            else if (e.key === 'Escape') onClose();
            else return;
            e.preventDefault();
        };
        window.addEventListener('keydown', onKey);
        window.addEventListener('wheel', onClose, { passive: true });
        window.addEventListener('scroll', onClose, { passive: true });
        return () => {
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('wheel', onClose);
            window.removeEventListener('scroll', onClose);
        };
    });

    useEffect(() => {
        const first = preload(images[openedAt]);
        first.decode().then(
            () => setFullLoaded(true),
            () => setFullLoaded(true)
        );
        preload(images[(openedAt + 1) % n]);
        preload(images[(openedAt - 1 + n) % n]);
    }, [images, n, openedAt]);
    useEffect(() => {
        preload(images[(index + 1) % n]);
        preload(images[(index - 1 + n) % n]);
    }, [images, index, n]);

    const isOpenedImage = index === openedAt;
    const imgProps =
        isOpenedImage && !fullLoaded && initialSrc
            ? { src: initialSrc, width: image.width, height: image.height }
            : zoomProps(image);

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label={`${image.alt} (${index + 1} of ${n}). Use arrow keys for next and previous, Escape to close.`}
            className="fixed inset-0 z-50 flex cursor-zoom-out touch-none items-center justify-center select-none"
            onPointerDown={e => (pointerX.current = e.clientX)}
            onPointerUp={e => {
                const dx = pointerX.current === null ? 0 : e.clientX - pointerX.current;
                pointerX.current = null;
                if (Math.abs(dx) > SWIPE_PX) go(dx < 0 ? 1 : -1);
                else onClose();
            }}
        >
            {/* Named in CSS so the browser fades it in/out with the image (globals.css). */}
            <div className="absolute inset-0 bg-black/70" style={{ viewTransitionName: 'lightbox-backdrop' }} />
            {/* Keyed by image so stepping swaps the transition instead of renaming it (React rejects
                two mounted <ViewTransition>s sharing a name, even for one commit). */}
            <ViewTransition key={image.src} name={lightboxName(image)} share="lightbox" default="none">
                {/* eslint-disable-next-line @next/next/no-img-element -- srcSet comes from getImageProps */}
                <img
                    {...imgProps}
                    alt={image.alt}
                    draggable={false}
                    // Explicit size (fit the viewport minus a 50px margin, at the image's ratio) so the
                    // box doesn't change when the full-resolution file replaces the thumbnail's.
                    style={{
                        aspectRatio: `${image.width} / ${image.height}`,
                        width: `min(100vw - 100px, (100dvh - 100px) * ${image.width / image.height})`,
                        height: 'auto',
                    }}
                    // Only images reached with ← / → fade in; the opened one arrives via the morph.
                    className={`relative object-contain ${isOpenedImage ? '' : 'animate-[page-in_150ms_ease-out]'}`}
                />
            </ViewTransition>
        </div>,
        document.body
    );
}

function zoomProps(image: ImageData) {
    return getImageProps({
        src: image.src,
        width: image.width,
        height: image.height,
        alt: image.alt,
        sizes: '100vw',
    }).props;
}

function preload(image: ImageData) {
    const { srcSet, sizes, src } = zoomProps(image);
    const img = new Image();
    img.sizes = sizes ?? '';
    img.srcset = srcSet ?? '';
    img.src = src;
    return img;
}
