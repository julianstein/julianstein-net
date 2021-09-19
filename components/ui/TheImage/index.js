import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useImageZoom } from 'react-medium-image-zoom';
import Img from './Img';

const TheImage = props => {
    const [screenWidth, setScreenWidth] = useState(0);
    const [hover, setHover] = useState(false);

    const { src, width, height, imgClass, alt, title, portfolio, setIsZoomed } =
        props;

    let zoom = props.zoom;

    useEffect(() => {
        setScreenWidth(window.screen.width);
    }, []);

    let showZoom = screenWidth >= 850 && zoom === undefined;

    let { ref } = useImageZoom({
        overlayBgColor: 'rgba(0,0,0, 0.7)',
        zoomMargin: 50,
        transitionDuration: 500,
        onZoomChange: isZoomed => {
            setIsZoomed(isZoomed);
        },
    });

    let output;

    imgClass !== undefined && showZoom
        ? (output = (
              <i
                  className="block"
                  ref={ref}
                  style={{
                      paddingBottom: `${(height / width) * 100}%`,
                  }}
              >
                  <span className={imgClass}>
                      <Img
                          className="images"
                          priority="true"
                          src={src}
                          width={width}
                          height={height}
                          alt={alt}
                          layout="intrinsic"
                          objectFit="cover"
                          fallbackImageWidth={640}
                          customSources={[
                              {
                                  breakpoint: 640,
                                  src: src,
                                  imageWidth: 1280,
                              },
                          ]}
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
                      paddingBottom: `${(height / width) * 100}%`,
                  }}
              >
                  <span className={imgClass}>
                      <Img
                          className="images"
                          priority="true"
                          src={src}
                          width={width}
                          height={height}
                          alt={alt}
                          layout="intrinsic"
                          objectFit="cover"
                          fallbackImageWidth={640}
                          customSources={[
                              {
                                  breakpoint: 640,
                                  src: src,
                                  imageWidth: 1280,
                              },
                          ]}
                      />
                  </span>

                  <span
                      className={`${
                          hover ? 'sm:opacity-100' : 'sm:opacity-0'
                      } opacity-100 absolute m-2 md:m-4 pt-1 pb-2 px-3 md:pt-2 md:pb-3 md:px-3 text-sm sm:text-xl md:text-2xl lg:text-2xl text-white bg-black bg-opacity-50 self-center`}
                      id="hoverText"
                  >
                      {title + ' '}
                  </span>
              </i>
          ))
        : imgClass !== undefined && !showZoom
        ? (output = (
              <span>
                  <Img
                      className="images"
                      priority="true"
                      src={src}
                      width={width}
                      height={height}
                      alt={alt}
                      layout="intrinsic"
                      objectFit="cover"
                      fallbackImageWidth={640}
                      customSources={[
                          {
                              breakpoint: 640,
                              src: src,
                              imageWidth: 1280,
                          },
                      ]}
                  />
              </span>
          ))
        : (output = (
              <span>
                  <Img
                      className="images"
                      priority="true"
                      src={src}
                      width={width}
                      height={height}
                      alt={alt}
                      layout="intrinsic"
                      objectFit="cover"
                      fallbackImageWidth={640}
                      customSources={[
                          {
                              breakpoint: 640,
                              src: src,
                              imageWidth: 1280,
                          },
                      ]}
                  />
              </span>
          ));

    return output;
};

TheImage.propTypes = {
    alt: PropTypes.any,
    height: PropTypes.any,
    imgClass: PropTypes.any,
    portfolio: PropTypes.any,
    setIsZoomed: PropTypes.func,
    src: PropTypes.any,
    title: PropTypes.string,
    width: PropTypes.any,
    zoom: PropTypes.any,
};

export default TheImage;
