import React, { useRef } from 'react';
import useDidMountEffect from 'hooks/useDidMountEffect';
import PropTypes from 'prop-types';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

const TheVideo = props => {
    const { src, load } = props;

    const videoRef = useRef();
    const srcRef = useRef();

    useDidMountEffect(() => {
        videoRef.current.load();
    }, [load]);

    return (
        <LazyLoadComponent>
            <video
                ref={videoRef}
                loop
                autoPlay
                playsInline
                load={load}
                muted
                onContextMenu={e => {
                    e.preventDefault();
                }}
                width="640"
                height="360"
                className="absolute w-full h-full align-bottom top-0 object-cover"
            >
                <source ref={srcRef} src={'/videos/' + src + '.m4v'}></source>
            </video>
        </LazyLoadComponent>
    );
};

TheVideo.propTypes = {
    load: PropTypes.any,
    src: PropTypes.any,
};

export default TheVideo;
