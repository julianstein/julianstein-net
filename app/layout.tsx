import type { Metadata } from 'next';
import { Shell } from '@/components/shell';
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'julian stein — media artist',
        template: 'julian stein — %s',
    },
    description: SITE_DESCRIPTION,
    openGraph: {
        type: 'website',
        siteName: 'julian stein',
        images: [
            {
                url: '/images/projects/a-room-that-i-take-care-of/ibg-0006.jpg',
                width: 2400,
                height: 1600,
                alt: 'julian stein',
            },
        ],
    },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="en" className="antialiased" data-scroll-behavior="smooth">
            <body className="text-black">
                <Shell>{children}</Shell>
            </body>
        </html>
    );
}
