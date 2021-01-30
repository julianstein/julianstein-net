import React, { useEffect, useState, useRef } from 'react';
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

const TheVideo = (props, { scrollPosition }) => {
  const { src } = props;

  return (
    <LazyLoadComponent scrollPosition={scrollPosition}>
      <video
        loop
        width="640"
        height="360"
        playsInline
        autoPlay
        poster={'/images/sketches-stills/' + src + '.jpg'}
        muted
        className="absolute w-full h-full align-bottom top-0 object-cover">
        <source src={'/videos/' + src + '.m4v'}></source>
      </video>
    </LazyLoadComponent>
  );
};

export default trackWindowScroll(TheVideo);
