import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { useRef, useEffect, useState } from 'react';
import useDidMountEffect from '../hooks/useDidMountEffect';

const TheVideo = (props) => {
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
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        width="640"
        height="360"
        className="absolute w-full h-full align-bottom top-0 object-cover">
        <source ref={srcRef} src={'/videos/' + src + '.m4v'}></source>
      </video>
    </LazyLoadComponent>
  );
};

export default TheVideo;
