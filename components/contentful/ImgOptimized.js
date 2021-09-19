import PropTypes from 'prop-types';
import React, { forwardRef, Fragment, memo } from 'react';

// This component requires Contentful's Image API
// Inspiration: https://www.contentful.com/blog/2019/10/31/webp-source-sets-images-api/

const defaultImageWidth = 640;

const noFallbackImageWarning = `ContentfulImg.js: For optimization purposes, it is *highly recommended* that you set a fallbackImageWidth prop. This prop currently has a default value of ${defaultImageWidth}px which may not be an optimal value for this image. This value is used if WebP isn't supported (i.e. Safari) and/or you aren't defining a customSources prop. Don't waste precious bytes!`;

const ImgOptimized = forwardRef(
    (
        {
            alt,
            className,
            customSources,
            draggable,
            fallbackImageWidth,
            loading,
            onLoad,
            src: ogSrc,
            ...props
        },
        ref
    ) => {
        !fallbackImageWidth && console.warn(noFallbackImageWarning);
        const fallbackWidth = fallbackImageWidth || defaultImageWidth;
        const getCustomSources = () =>
            customSources.map(
                ({ breakpoint, imageWidth, src: breakpointSrc }, i) => {
                    // Max image values at 2560px to keep Contentful's Image API happy
                    const w = Math.min(imageWidth, 2560);
                    return (
                        <Fragment key={i}>
                            <source
                                media={
                                    breakpoint && `(min-width: ${breakpoint}px)`
                                }
                                srcSet={`${
                                    breakpointSrc || ogSrc
                                }?w=${w}&fm=webp&q=80`}
                                type="image/webp"
                            />
                            <source
                                media={
                                    breakpoint && `(min-width: ${breakpoint}px)`
                                }
                                srcSet={`${breakpointSrc || ogSrc}?w=${w}&q=90`}
                            />
                        </Fragment>
                    );
                }
            );

        return (
            <picture className={className}>
                {customSources ? (
                    getCustomSources()
                ) : (
                    <source
                        srcSet={`${ogSrc}?w=${fallbackWidth}&fm=webp&q=80`}
                        type="image/webp"
                    />
                )}
                <img
                    {...props}
                    ref={ref}
                    alt={alt}
                    src={`${ogSrc}?w=${fallbackWidth}&q=90`}
                    loading={loading}
                    draggable={draggable}
                    onLoad={onLoad}
                    onError={onLoad}
                />
            </picture>
        );
    }
);

ImgOptimized.propTypes = {
    alt: PropTypes.string,
    className: PropTypes.string,
    customSources: PropTypes.array,
    draggable: PropTypes.bool,
    fallbackImageWidth: PropTypes.number,
    loading: PropTypes.string,
    onLoad: PropTypes.func,
    src: PropTypes.string.isRequired,
};

ImgOptimized.defaultProps = {
    alt: '',
    className: null,
    customSources: null,
    draggable: false,
    fallbackImageWidth: null,
    loading: 'lazy',
};

export default memo(ImgOptimized);
