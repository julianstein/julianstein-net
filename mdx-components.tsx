import type { MDXComponents } from 'mdx/types';

const components: MDXComponents = {
    a: ({ href = '', ...props }) => {
        const external = /^https?:\/\//.test(href);
        return (
            <a
                href={href}
                {...(external && { target: '_blank', rel: 'noreferrer' })}
                {...props}
            />
        );
    },
};

export function useMDXComponents(): MDXComponents {
    return components;
}
