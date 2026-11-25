import type { Metadata } from 'next';
import Image from 'next/image';
import { Suspense } from 'react';
import { VideoEmbed } from '@/components/embeds';
import { PageTransition } from '@/components/page-transition';
import { ProjectGallery } from '@/components/project-gallery';
import { getProject, getProjectFrontmatter, getProjectSlugs } from '@/lib/content';
import { websiteNav } from '@/lib/site';

export async function generateStaticParams() {
    return (await getProjectSlugs()).map(project => ({ project }));
}

export async function generateMetadata({ params }: PageProps<'/[project]'>): Promise<Metadata> {
    const { project } = await params;
    const p = await getProjectFrontmatter(project);
    return {
        title: p.title,
        description: p.description,
        // Unlisted projects (not in the sidebar) and ones without a description stay out of search.
        robots: p.description && websiteNav.some(n => n.slug === project) ? undefined : { index: false },
        openGraph: {
            type: 'article',
            url: `/${project}`,
            title: `julian stein — ${p.title}`,
            description: p.description,
            images: [{ url: p.featuredImage.src, width: p.featuredImage.width, height: p.featuredImage.height }],
        },
    };
}

// The layout grid is shared by every project; only its contents depend on the slug.
// mobile: featured → info → gallery; xl: [featured + gallery | info]
const grid = 'grid grid-cols-1 pt-3 pb-8 xl:grid-cols-[minmax(0,1fr)_auto] xl:grid-rows-[auto_1fr]';
const featuredCell = 'mx-1.5 mb-8 xl:mb-1.5 xl:pr-6 md:mx-3';
const infoCell =
    'mb-5 px-1.5 text-sm md:px-4.5 xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:w-80';
const galleryCell = 'md:px-1.5 xl:pr-6';

export default function ProjectPage({ params }: PageProps<'/[project]'>) {
    return (
        <PageTransition>
            <Suspense fallback={<ProjectSkeleton />}>
                <Project params={params} />
            </Suspense>
        </PageTransition>
    );
}

async function Project({ params }: Pick<PageProps<'/[project]'>, 'params'>) {
    const { project } = await params;
    const { Content, frontmatter: p } = await getProject(project);

    return (
        <article className={grid}>
            <div className={featuredCell}>
                {p.muxPlaybackId || p.vimeoId ? (
                    <VideoEmbed
                        source={p.muxPlaybackId ? { mux: p.muxPlaybackId } : { vimeo: p.vimeoId! }}
                        poster={p.featuredImage}
                        title={p.title}
                        aspect={p.videoAspect}
                    />
                ) : (
                    <Image
                        src={p.featuredImage.src}
                        width={p.featuredImage.width}
                        height={p.featuredImage.height}
                        alt={`${p.title} (${p.year}): featured image`}
                        sizes="(min-width: 1280px) 70vw, 100vw"
                        priority
                        className="h-auto w-full"
                    />
                )}
            </div>

            <div className={infoCell}>
                <h1 className="font-semibold">
                    {p.title} ({p.year}){p.author && ` — ${p.author}`}
                </h1>
                {p.subtitle && <p className="pb-3">{p.subtitle}</p>}
                <div className="rich-text pb-4 leading-normal">
                    <Content />
                </div>
                {p.exhibitions && (
                    <section>
                        <hr />
                        <h2 className="pb-3 font-semibold">Exhibitions</h2>
                        <ul>
                            {p.exhibitions.map(item => (
                                <li key={item} className="pb-4">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>

            <div className={galleryCell}>
                <ProjectGallery images={p.images ?? []} bandcampId={p.bandcampId} title={p.title} />
            </div>
        </article>
    );
}

/** Blank space while a project loads (rarely seen: sidebar links preload whole projects). */
function ProjectSkeleton() {
    return (
        <div className={grid} aria-hidden>
            <div className={featuredCell}>
                <div className="aspect-video w-full" />
            </div>
        </div>
    );
}
