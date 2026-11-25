'use client';

import { FadeImage } from '@/components/fade-image';
import { startTransition, useLayoutEffect, useRef, useState, ViewTransition } from 'react';
import { BandcampEmbed } from '@/components/embeds';
import { FadeIn } from '@/components/fade-in';
import { JustifiedGrid, JustifiedItem } from '@/components/justified-grid';
import { Lightbox, lightboxName } from '@/components/lightbox';
import type { ImageData } from '@/lib/content';
import { useMediaQuery, useShuffled } from '@/lib/hooks';

export function ProjectGallery({
    images,
    bandcampId,
    title,
}: {
    images: ImageData[];
    bandcampId?: string;
    title: string;
}) {
    // Order is shuffled on each visit, as on the original site.
    const shuffled = useShuffled(images);
    const canZoom = useMediaQuery('(min-width: 850px)');
    const [open, setOpen] = useState<number | null>(null);
    const opener = useRef<HTMLElement | null>(null);
    // The URL the clicked thumbnail already has loaded, so the opening animation has pixels.
    const [initialSrc, setInitialSrc] = useState<string>();

    // Next keeps left pages mounted but hidden; close the lightbox when that happens.
    useLayoutEffect(() => () => setOpen(null), []);

    // Opening/closing runs as a transition so <ViewTransition> animates it.
    const openAt = (i: number, el: HTMLElement) => {
        opener.current = el;
        setInitialSrc(el.querySelector('img')?.currentSrc || undefined);
        startTransition(() => setOpen(i));
    };
    const close = () => {
        startTransition(() => setOpen(null));
        opener.current?.focus({ preventScroll: true });
    };

    return (
        <>
            <JustifiedGrid className="[--row:140px] md:[--row:80px] lg:[--row:130px] 2xl:[--row:210px] min-[1920px]:[--row:300px]">
                {shuffled.map((image, i) => {
                    const thumb = (
                        <div className={`h-full w-full ${open === i ? 'invisible' : ''}`}>
                            <FadeImage
                                src={image.src}
                                width={image.width}
                                height={image.height}
                                alt={image.alt}
                                sizes="(min-width: 768px) 40vw, 100vw"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    );
                    return (
                        <JustifiedItem key={image.src} aspect={image.width / image.height}>
                            <FadeIn className="absolute inset-0">
                                {canZoom ? (
                                    <button
                                        type="button"
                                        aria-label={`Expand image: ${image.alt}`}
                                        onClick={e => openAt(i, e.currentTarget)}
                                        className="block h-full w-full cursor-zoom-in"
                                    >
                                        {/* While open, the name lives on the lightbox image instead. */}
                                        {open === i ? (
                                            thumb
                                        ) : (
                                            <ViewTransition name={lightboxName(image)} share="lightbox" default="none">
                                                {thumb}
                                            </ViewTransition>
                                        )}
                                    </button>
                                ) : (
                                    thumb
                                )}
                            </FadeIn>
                        </JustifiedItem>
                    );
                })}
                {bandcampId && (
                    <div className="w-full pt-0 lg:pt-8">
                        <BandcampEmbed album={bandcampId} title={title} />
                    </div>
                )}
            </JustifiedGrid>
            {open !== null && (
                <Lightbox
                    images={shuffled}
                    index={open}
                    initialSrc={initialSrc}
                    onIndexChange={setOpen}
                    onClose={close}
                />
            )}
        </>
    );
}
