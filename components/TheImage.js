import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { useImageZoom } from 'react-medium-image-zoom';
import { useSelector } from 'react-redux';

import { selectNav } from '../lib/slices/navSlice';

const TheImage = (props) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [hover, setHover] = useState(false);

  const { src, width, height, imgClass, alt, title, portfolio, isZoomed, setIsZoomed } = props;

  const siteType = useSelector(selectNav);

  let zoom = props.zoom;

  useEffect((showZoom) => {
    setScreenWidth(window.screen.width);
  }, []);

  let showZoom = screenWidth >= 850 && zoom === undefined;

  let { ref } = useImageZoom({
    overlayBgColor: 'rgba(0,0,0, 0.7)',
    zoomMargin: 50,
    transitionDuration: 500,
    onZoomChange: (isZoomed) => {
      setIsZoomed(isZoomed);
    }
  });

  let output;
  imgClass !== undefined && showZoom
    ? (output = (
        <i
          className="block"
          ref={ref}
          style={{
            paddingBottom: `${(height / width) * 100}%`
          }}>
          <span className={imgClass}>
            <Image
              className="images"
              priority="true"
              src={src}
              width={width}
              height={height}
              alt={alt}
              layout="intrinsic"
              objectFit="cover"
            />
          </span>
        </i>
      ))
    : imgClass !== undefined && !showZoom && portfolio
    ? (output = (
        <i
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="block"
          style={{
            paddingBottom: `${(height / width) * 100}%`
          }}>
          <span className={imgClass}>
            <Image
              className="images"
              priority="true"
              src={src}
              width={width}
              height={height}
              alt={alt}
              layout="intrinsic"
              objectFit="cover"
            />
          </span>

          <span
            className={`${
              hover ? 'sm:opacity-100' : 'sm:opacity-0'
            } opacity-100 absolute m-2 md:m-4 pt-1 pb-2 px-3 md:pt-2 md:pb-3 md:px-3 text-sm sm:text-xl md:text-2xl lg:text-2xl text-white bg-black bg-opacity-50 self-center`}
            id="hoverText">
            {title + ' '}
          </span>
        </i>
      ))
    : imgClass !== undefined && !showZoom
    ? (output = (
        <span>
          <Image
            className="images"
            priority="true"
            src={src}
            width={width}
            height={height}
            alt={alt}
            layout="intrinsic"
            objectFit="cover"
          />
        </span>
      ))
    : (output = (
        <span>
          <Image
            className="images"
            priority="true"
            src={src}
            width={width}
            height={height}
            alt={alt}
            layout="intrinsic"
            objectFit="cover"
          />
        </span>
      ));

  return output;
};

export default TheImage;
