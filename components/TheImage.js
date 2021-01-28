import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useImageZoom } from 'react-medium-image-zoom';

const TheImage = (props) => {
  const [screenWidth, setScreenWidth] = useState(0);

  const { src, width, height, imgClass } = props;

  let zoom = props.zoom;

  useEffect((showZoom) => {
    setScreenWidth(window.screen.width);
  }, []);

  let showZoom = screenWidth >= 850 && zoom === undefined;

  let { ref } = useImageZoom({
    overlayBgColorEnd: 'rgba(0,0,0, 0.5)',
    zoomMargin: 10,
    transitionDuration: '500ms'
  });

  let output = (
    <Image
      className="images"
      priority="true"
      src={src}
      width={width}
      height={height}
      alt="Picture of the author"
      layout="intrinsic"
      objectFit="cover"
    />
  );

  return (
    <span className={imgClass}>
      {showZoom && <span ref={ref}>{output}</span>}
      {zoom === false || (showZoom === false && <span id="imageSpan">{output}</span>)}
      {zoom === false && <span id="imageSpan">{output}</span>}
    </span>
  );
};

export default TheImage;
