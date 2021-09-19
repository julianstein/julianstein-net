import React from 'react';
import PropTypes from 'prop-types';

import Link from './';

export const getEntryLink = entry => {
    const { contentTypeId = 'unknown', slug } = entry;

    // handle asset downloads
    if (entry?.file?.url) {
        return { href: entry?.file?.url, download: true, target: undefined };
    }

    switch (contentTypeId) {
        case 'externalLink':
            return { href: entry.url, target: entry.target };
        case 'page':
            return {
                href: entry.path,
            };
        default:
            return {
                href: slug === '/' ? '/' : '/[...page]',
                as: slug === '/' ? '/' : `/${slug}`,
            };
    }
};

const EntryLink = props => {
    if (!props.entry) {
        return <span className={props.className}>{props.children}</span>;
    }

    return <Link {...props} {...getEntryLink(props.entry)} entry={undefined} />;
};

EntryLink.propTypes = {
    entry: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

EntryLink.defaultProps = {
    entry: null,
    children: null,
    onClick: null,
};

export default EntryLink;
