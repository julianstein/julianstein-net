import React from 'react';
import PropTypes from 'prop-types';
import { default as NextLink } from 'next/link';

import EntryLink from './EntryLink';

const Link = ({ children, href, scroll, locale, ...props }) => {
    return (
        <NextLink href={href} scroll={scroll} locale={locale}>
            <a {...props}>{children}</a>
        </NextLink>
    );
};

Link.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
    href: PropTypes.string.isRequired,
    scroll: PropTypes.bool,
    locale: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

Link.defaultProps = {
    scroll: false,
    locale: undefined,
};

Link.Entry = EntryLink;

export default Link;
