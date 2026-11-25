import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    cacheComponents: true,
    // Off: sidebar links preload whole project pages, and project pages read their slug up front
    // so unknown slugs return a real 404 (see app/[project]/page.tsx).
    partialPrefetching: false,
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
    // The portfolio view was removed; send old links home.
    async redirects() {
        return [{ source: '/portfolio', destination: '/', permanent: true }];
    },
    turbopack: {
        rules: {
            '*.css': {
                loaders: ['@tailwindcss/turbopack'],
                as: '*.css',
            },
        },
    },
};

const withMDX = createMDX({
    options: {
        // Plugin names as strings so the config stays serializable for Turbopack
        remarkPlugins: ['remark-frontmatter', 'remark-mdx-frontmatter'],
    },
});

export default withMDX(nextConfig);
