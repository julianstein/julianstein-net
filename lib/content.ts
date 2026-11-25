import fs from 'node:fs/promises';
import path from 'node:path';
import { cacheLife } from 'next/cache';
import { notFound } from 'next/navigation';
import sharp from 'sharp';

export type ImageData = {
    src: string;
    width: number;
    height: number;
    alt: string;
};

/**
 * An image as written in frontmatter: just its path under /public, or `{ src, alt }` to give
 * it a description. Sizes are read from the file, so they never need typing in.
 */
type ImageRef = string | { src: string; alt?: string };

/** What a project's .mdx frontmatter contains. */
type ProjectSource = {
    title: string;
    subtitle?: string;
    author?: string;
    year: number;
    /** Used for SEO; projects without one are noindexed (as before). */
    description?: string;
    /** Mux playback ID; takes priority over vimeoId. */
    muxPlaybackId?: string;
    /** For videos hosted on someone else's Vimeo account. */
    vimeoId?: string;
    bandcampId?: string;
    featuredImage: ImageRef;
    images?: ImageRef[];
    exhibitions?: string[];
};

/** A project with its images measured and its video's shape looked up. */
export type ProjectFrontmatter = Omit<ProjectSource, 'featuredImage' | 'images'> & {
    featuredImage: ImageData;
    images: ImageData[];
    /** Video frame shape as "width/height", from Mux. Undefined means 16/9. */
    videoAspect?: string;
};

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects');

export async function getProjectSlugs(): Promise<string[]> {
    'use cache';
    cacheLife('max');
    const files = await fs.readdir(PROJECTS_DIR);
    return files.filter(f => f.endsWith('.mdx')).map(f => f.replace(/\.mdx$/, ''));
}

async function importProject(slug: string) {
    if (!(await getProjectSlugs()).includes(slug)) notFound();
    return import(`@/content/projects/${slug}.mdx`);
}

export async function getProject(slug: string) {
    const [mod, frontmatter] = await Promise.all([importProject(slug), getProjectFrontmatter(slug)]);
    return { Content: mod.default, frontmatter };
}

export async function getProjectFrontmatter(slug: string): Promise<ProjectFrontmatter> {
    'use cache';
    cacheLife('max');
    const { frontmatter } = (await importProject(slug)) as { frontmatter: ProjectSource };
    const { featuredImage, images = [], ...rest } = frontmatter;
    const [featured, gallery, videoAspect] = await Promise.all([
        measure(featuredImage, frontmatter.title),
        Promise.all(images.map((img, i) => measure(img, `${frontmatter.title}, image ${i + 1}`))),
        frontmatter.muxPlaybackId ? muxAspect(frontmatter.muxPlaybackId) : undefined,
    ]);
    return { ...rest, featuredImage: featured, images: gallery, videoAspect };
}

/** Reads an image's pixel size from its file in /public. */
async function measure(ref: ImageRef, fallbackAlt: string): Promise<ImageData> {
    const { src, alt } = typeof ref === 'string' ? { src: ref, alt: undefined } : ref;
    const meta = await sharp(path.join(process.cwd(), 'public', src)).metadata();
    // EXIF orientations 5–8 are rotated a quarter turn, so width and height swap on screen.
    const turned = (meta.orientation ?? 1) >= 5;
    return {
        src,
        width: turned ? meta.height : meta.width,
        height: turned ? meta.width : meta.height,
        alt: alt ?? fallbackAlt,
    };
}

/** The video's shape, from the largest rendition Mux lists. Undefined (→ 16/9) if Mux can't be reached. */
async function muxAspect(playbackId: string): Promise<string | undefined> {
    try {
        const res = await fetch(`https://stream.mux.com/${playbackId}.m3u8`, { signal: AbortSignal.timeout(5000) });
        if (!res.ok) return undefined;
        const sizes = [...(await res.text()).matchAll(/RESOLUTION=(\d+)x(\d+)/g)].map(m => [+m[1], +m[2]]);
        const [w, h] = sizes.sort((a, b) => b[0] * b[1] - a[0] * a[1])[0] ?? [];
        return w && h ? `${w}/${h}` : undefined;
    } catch {
        return undefined;
    }
}
