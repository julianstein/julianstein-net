import cx from 'classnames';
import Text from 'components/ui/Text';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './RichText.module.scss';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {
    children: null,
};

// MARKS
export const Bold = ({ children }) => {
    return <b className={styles.bold}>{children}</b>;
};

export const Italic = ({ children }) => {
    return <i className={styles.italic}>{children}</i>;
};

export const Underline = ({ children }) => {
    return <u className={styles.underline}>{children}</u>;
};

Bold.propTypes = propTypes;
Bold.defaultProps = defaultProps;

Italic.propTypes = propTypes;
Italic.defaultProps = defaultProps;

Underline.propTypes = propTypes;
Underline.defaultProps = defaultProps;

// BLOCKS
export const BodyText = ({ children }) => (
    <Text as="p" theme="bodyCopy" className={styles.paragraph}>
        {children}
    </Text>
);

export const OrderedList = ({ children }) => (
    <ol className={styles.orderedList}>{children}</ol>
);

export const UnorderedList = ({ children }) => (
    <ul className={styles.unorderedList}>{children}</ul>
);

export const ListItem = ({ children }) => (
    <li className={styles.listItem}>{children}</li>
);

export const HeadingOne = ({ children }) => (
    <Text
        as="h1"
        theme="displayLarge"
        className={cx(styles.heading, styles.largeHeading)}
    >
        {children}
    </Text>
);

export const HeadingTwo = ({ children }) => (
    <Text
        as="h2"
        theme="headingXLarge"
        className={cx(styles.heading, styles.largeHeading)}
    >
        {children}
    </Text>
);

export const HeadingThree = ({ children }) => (
    <Text
        as="h3"
        theme="headingLarge"
        className={cx(styles.heading, styles.largeHeading)}
    >
        {children}
    </Text>
);

export const HeadingFour = ({ children }) => (
    <Text as="h4" theme="headingMedium" className={styles.heading}>
        {children}
    </Text>
);

export const HeadingFive = ({ children }) => (
    <Text as="h5" theme="headingSmall" className={styles.heading}>
        {children}
    </Text>
);

export const HeadingSix = ({ children }) => (
    <Text as="h6" theme="headingXSmall" className={styles.heading}>
        {children}
    </Text>
);

export const Blockquote = ({ children }) => (
    <Text as="blockquote" theme="bodySmall" className={styles.blockquote}>
        {children}
    </Text>
);

BodyText.propTypes = {
    ...propTypes,
    as: PropTypes.string,
};
BodyText.defaultProps = {
    ...defaultProps,
    as: 'span',
};

OrderedList.propTypes = propTypes;
OrderedList.defaultProps = defaultProps;

UnorderedList.propTypes = propTypes;
UnorderedList.defaultProps = defaultProps;

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

Blockquote.propTypes = {
    ...propTypes,
};
Blockquote.defaultProps = {
    ...defaultProps,
};

HeadingOne.propTypes = propTypes;
HeadingOne.defaultProps = defaultProps;

HeadingTwo.propTypes = propTypes;
HeadingTwo.defaultProps = defaultProps;

HeadingThree.propTypes = propTypes;
HeadingThree.defaultProps = defaultProps;

HeadingFour.propTypes = propTypes;
HeadingFour.defaultProps = defaultProps;

HeadingFive.propTypes = propTypes;
HeadingFive.defaultProps = defaultProps;

HeadingSix.propTypes = propTypes;
HeadingSix.defaultProps = defaultProps;
