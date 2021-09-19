import cx from 'classnames';
import ImgOptimized from 'components/contentful/ImgOptimized';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useIntersection } from 'react-use';

import styles from './Img.module.scss';

const Img = ({
    className,
    customSources,
    fallbackImageWidth,
    lazyReveal,
    lazyRevealType,
    src,
    ...otherProps
}) => {
    const imageRef = useRef(null);

    const [loaded, setLoaded] = useState(false);
    const [loadedInView, setLoadedInView] = useState(false);

    const intersection = useIntersection(imageRef, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    });

    useEffect(() => {
        if (intersection?.isIntersecting && lazyRevealType === 'zoomIn') {
            setLoadedInView(true);
        }
    }, [intersection, lazyRevealType]);

    const onLoad = () => {
        lazyReveal && setLoaded(true);
    };

    const classNames = cx(styles.root, className, {
        [styles[lazyRevealType]]: lazyReveal,
        [styles.loaded]:
            lazyRevealType === 'zoomIn'
                ? loadedInView && lazyReveal && loaded
                : lazyReveal && loaded,
    });

    useEffect(() => {
        // Ensure cached images are still considered "loaded"
        imageRef?.current?.complete && setLoaded(true);
    }, []);

    if (src.includes('images.ctfassets.net')) {
        return (
            <ImgOptimized
                ref={imageRef}
                className={classNames}
                customSources={customSources}
                fallbackImageWidth={fallbackImageWidth}
                onLoad={onLoad}
                onError={onLoad}
                src={src}
                {...otherProps}
            />
        );
    }
    return (
        <Image
            ref={imageRef}
            className={classNames}
            onLoad={onLoad}
            onError={onLoad}
            src={src}
            {...otherProps}
        />
    );
};

Img.propTypes = {
    alt: PropTypes.string,
    className: PropTypes.string,
    customSources: PropTypes.array,
    draggable: PropTypes.bool,
    fallbackImageWidth: PropTypes.number,
    lazyReveal: PropTypes.bool,
    lazyRevealType: PropTypes.string,
    loading: PropTypes.string,
    src: PropTypes.string,
};

Img.defaultProps = {
    alt: '',
    className: null,
    draggable: false,
    lazyReveal: true,
    lazyRevealType: 'fadeIn',
    src: '',
};

export default memo(Img);
