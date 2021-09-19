import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntersection } from 'react-use';

const FadeInSection = props => {
    const ref = useRef();

    let setClass = props.name === undefined ? 'fade-in-section' : props.name;

    const inViewRatio = 0.25;
    const [isInView, setIsInView] = useState(false);

    const intersection = useIntersection(ref, {
        root: null,
        rootMargin: '0px',
        threshold: inViewRatio,
    });

    useEffect(() => {
        if (isInView) {
            return;
        }

        setIsInView(intersection?.isIntersecting);
    }, [intersection, isInView]);

    return (
        <div
            className={`${setClass} ${isInView ? 'is-visible' : ''}`}
            ref={ref}
        >
            {props.children}
        </div>
    );
};

FadeInSection.propTypes = {
    children: PropTypes.node,
    name: PropTypes.any,
};

export default FadeInSection;
