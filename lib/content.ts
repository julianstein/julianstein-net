import fs from 'node:fs/promises';
import path from 'node:path';
import { cacheLife } from 'next/cache';
import { notFound } from 'next/navigation';

export type ImageData = {
    src: string;
    width: number;
    height: number;
    alt: string;
};

export type ProjectFrontmatter = {
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
    /** Video frame shape as "width/height" (e.g. "1080/1920"); defaults to 16/9. */
    videoAspect?: string;
    bandcampId?: string;
    featuredImage: ImageData;
    images?: ImageData[];
    exhibitions?: string[];
};

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects');

export async function getProjectSlugs(): Promise<string[]> {
    'use cache';
    cacheLife('max');
    const files = await fs.readdir(PROJECTS_DIR);
    return files.filter(f => f.endsWith('.mdx')).map(f => f.replace(/\.mdx$/, ''));
}

export async function getProject(slug: string) {
    if (!(await getProjectSlugs()).includes(slug)) notFound();
    const mod = await import(`@/content/projects/${slug}.mdx`);
    return { Content: mod.default, frontmatter: mod.frontmatter as ProjectFrontmatter };
}

export async function getProjectFrontmatter(slug: string) {
    'use cache';
    cacheLife('max');
    const { frontmatter } = await getProject(slug);
    return frontmatter;
}
