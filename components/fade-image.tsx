'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

/**
 * next/image that fades in once loaded. Put the placeholder colour on its parent, not on
 * the image itself, or the colour would fade in along with it.
 */
export function FadeImage({ alt, className = '', onLoad, ...props }: ImageProps) {
    const [loaded, setLoaded] = useState(false);
    return (
        <Image
            {...props}
            alt={alt}
            // An image that finished loading before hydration never fires onLoad; catch it here.
            ref={img => {
                if (img?.complete && img.naturalWidth) setLoaded(true);
            }}
            onLoad={e => {
                setLoaded(true);
                onLoad?.(e);
            }}
            className={`transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                loaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
        />
    );
}
