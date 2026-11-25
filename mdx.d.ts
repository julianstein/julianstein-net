declare module '*.mdx' {
    import type { MDXProps } from 'mdx/types';
    import type { ProjectFrontmatter } from '@/lib/content';

    export const frontmatter: ProjectFrontmatter;
    export default function MDXContent(props: MDXProps): React.JSX.Element;
}
