import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Zoom from 'react-medium-image-zoom';
// import 'react-medium-image-zoom/dist/styles.css';

import Img from './Img';

const TheImage = ({
    src,
    width,
    height,
    imgClass,
    alt,
    title,
    portfolio,
    zoom,
}) => {
    const [screenWidth, setScreenWidth] = useState(0);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        setScreenWidth(window.screen.width);
    }, []);

    let showZoom = screenWidth >= 850 && zoom === undefined;

    let output;

    imgClass !== undefined && showZoom
        ? (output = (
              <i
                  className="block"
                  style={{
                      paddingBottom: `${(height / width) * 100}%`,
                  }}
              >
                  <span className={imgClass}>
                      <Zoom zoomMargin={50} className={'zoom'}>
                          <Img
                              className="images"
                              src={src}
                              width={width}
                              height={height}
                              alt={alt}
                              fallbackImageWidth={640}
                              customSources={[
                                  {
                                      breakpoint: 640,
                                      src: src,
                                      imageWidth: 1280,
                                  },
                                  {
                                      src: src,
                                      imageWidth: 640,
                                  },
                              ]}
                          />
                      </Zoom>
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
                          src={src}
                          width={width}
                          height={height}
                          alt={alt}
                          fallbackImageWidth={640}
                          customSources={[
                              {
                                  breakpoint: 640,
                                  src: src,
                                  imageWidth: 1280,
                              },
                              {
                                  src: src,
                                  imageWidth: 640,
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
                      src={src}
                      width={width}
                      height={height}
                      alt={alt}
                      fallbackImageWidth={640}
                      customSources={[
                          {
                              breakpoint: 640,
                              src: src,
                              imageWidth: 1280,
                          },
                          {
                              src: src,
                              imageWidth: 640,
                          },
                      ]}
                  />
              </span>
          ))
        : (output = (
              <span>
                  <Img
                      className="images"
                      src={src}
                      width={width}
                      height={height}
                      alt={alt}
                      fallbackImageWidth={640}
                      customSources={[
                          {
                              breakpoint: 640,
                              src: src,
                              imageWidth: 1280,
                          },
                          {
                              src: src,
                              imageWidth: 640,
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
    src: PropTypes.any,
    title: PropTypes.string,
    width: PropTypes.any,
    zoom: PropTypes.any,
};

export default TheImage;
