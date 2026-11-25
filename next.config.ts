import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    cacheComponents: true,
    partialPrefetching: true,
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
