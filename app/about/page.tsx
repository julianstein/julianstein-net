import type { Metadata } from 'next';
import { PageTransition } from '@/components/page-transition';
import ArtistStatement from '@/content/about/artist.mdx';

export const metadata: Metadata = { title: 'about' };

export default function AboutPage() {
    return (
        <PageTransition>
            <div className="rich-text max-w-prose pl-1.5 text-base sm:text-lg md:pt-12 md:pl-0 md:text-xl lg:pl-6">
                <ArtistStatement />
            </div>
        </PageTransition>
    );
}
