import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import PropTypes from 'prop-types';
import Link from 'components/ui/Link';

import { BodyText, Bold, Italic, Underline } from './defaults';

const defaultOptions = {
    renderMark: {
        [MARKS.BOLD]: text => <Bold>{text}</Bold>,
        [MARKS.ITALIC]: text => <Italic>{text}</Italic>,
        [MARKS.UNDERLINE]: text => <Underline>{text}</Underline>,
    },
    renderNode: {
        [INLINES.HYPERLINK]: node => {
            return (
                <Link target="_blank" rel="noreferrer" href={node.data.uri}>
                    {node.content[0].value}
                </Link>
            );
        },
        [BLOCKS.PARAGRAPH]: (node, children) => {
            return <BodyText>{children}</BodyText>;
        },
    },
    renderText: text => {
        return text.split('\n').reduce((children, textSegment, index) => {
            return [...children, index > 0 && <br key={index} />, textSegment];
        }, []);
    },
};

const RichText = ({ richText, overrides }) => {
    const options = {
        renderMark: {
            ...defaultOptions.renderMark,
            ...overrides.renderMark,
        },
        renderNode: {
            ...defaultOptions.renderNode,
            ...overrides.renderNode,
        },
        renderText: overrides.renderText || defaultOptions.renderText,
    };

    if (richText) {
        return documentToReactComponents(richText, options);
    }

    return null;
};

RichText.propTypes = {
    richText: PropTypes.object.isRequired,
    overrides: PropTypes.object,
};

RichText.defaultProps = {
    overrides: {
        renderText: null,
    },
};

export default RichText;
