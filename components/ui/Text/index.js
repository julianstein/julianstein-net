import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Text.module.scss';

const Text = React.forwardRef((props, ref) => {
    const { as, theme, className, children, ...otherProps } = props;
    return React.createElement(
        as,
        { ref, className: cx(styles[theme], className), ...otherProps },
        children
    );
});

Text.propTypes = {
    as: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    theme: PropTypes.string,
};

Text.defaultProps = {
    theme: 'bodySmall',
    as: 'p',
};

export default Text;
