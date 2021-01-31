import { useEffect, useState } from 'react';
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
    zoomMargin: 50
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
              alt="Picture of the author"
              layout="intrinsic"
              objectFit="cover"
            />
          </span>
        </i>
      ))
    : imgClass !== undefined && !showZoom
    ? (output = (
        <i
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
