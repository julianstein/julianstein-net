import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useImageZoom } from 'react-medium-image-zoom';

const TheImage = (props) => {
  const { src, width, height, imgClass } = props;

  let { ref } = useImageZoom({
    overlayBgColorEnd: 'rgba(0,0,0, 0.5)',
    zoomMargin: 30
  });

  let output;
  imgClass !== undefined
    ? (output = (
        <i
          className="block"
          ref={ref}
          style={{
            paddingBottom: `${(height / width) * 100}%`
          }}>
          <span className={imgClass} ref={ref}>
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
          </span>
        </i>
      ))
    : (output = (
        <span>
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
        </span>
      ));

  return output;
};

export default TheImage;
