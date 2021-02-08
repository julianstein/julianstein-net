import { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';

import { selectNav } from '../lib/slices/navSlice';
import { selectWindow } from '../lib/slices/windowSlice';

import EmbedPlayer from './EmbedPlayer';
import FadeInSection from './FadeInSection';
import PrintMarkdown from './PrintMarkdown';
import TheFooter from './TheFooter';
import TheImage from './TheImage';

const ArtistPage = (props) => {
  const { page } = props;
  const scrollTo = useRef(null);

  const {
    title,
    subtitle,
    content,
    year,
    slug,
    images,
    featuredImage,
    featuredVideo,
    imageGrid,
    videoPlayer,
    videoTime,
    author
  } = page;

  const [imgRand, setImgRand] = useState(null);
  //const [imgDim, setImgDim] = useState(null);
  const [rowLen, setRowLen] = useState(125);
  const [isZoomed, setIsZoomed] = useState(false);

  const size = 1200;

  const siteType = useSelector(selectNav);
  const windowWidth = useSelector(selectWindow);
  /*let imgs = document.querySelectorAll('.images');
  let imgElem = [];
  Object.values(imgs).map((val, i) => imgElem.push([val.naturalWidth, val.naturalHeight]));
  setImgDim(imgElem);*/

  const scrollToElem = () => {
    scrollTo.current.scrollIntoView();
  };

  useLayoutEffect(() => {
    setImgRand(images.sort(() => Math.random() - 0.5));
    let rowArr = [100, 125, 150, 175, 200, 300, 200, 300];
    rowArr.sort(() => Math.random() - 0.5);

    if (siteType === 'website') {
      windowWidth >= 1536
        ? setRowLen(210)
        : windowWidth >= 1280
        ? setRowLen(140)
        : windowWidth >= 1024
        ? setRowLen(130)
        : windowWidth >= 768
        ? setRowLen(80)
        : windowWidth >= 640
        ? setRowLen(140)
        : setRowLen(140);
    } else {
      windowWidth >= 2560
        ? setRowLen(500)
        : windowWidth >= 1536
        ? setRowLen(300)
        : windowWidth >= 1280
        ? setRowLen(210)
        : windowWidth >= 1024
        ? setRowLen(200)
        : windowWidth >= 768
        ? setRowLen(180)
        : windowWidth >= 640
        ? setRowLen(140)
        : setRowLen(140);
    }
  }, [imgRand]);

  useEffect(() => {
    scrollToElem();
  }, [imgRand]);

  return (
    <>
      <div
        ref={scrollTo}
        className="flex md:flex-row flex-col-reverse md:flex-wrap-reverse xl:flex-nowrap pt-3">
        <div
          className={`text-3xl w-full relative flex-initial text-left pt-1 pb-8 xl:pr-6 ${
            siteType === 'website' ? 'md:px-3' : ' '
          }`}>
          <div className="mb-1 mx-1.5 hidden xl:flex">
            {featuredVideo && (
              <LazyLoadComponent>
                <EmbedPlayer
                  src={featuredVideo}
                  img={featuredImage[0]}
                  slug={slug}
                  videoPlayer={videoPlayer}
                  videoTime={videoTime}
                />
              </LazyLoadComponent>
            )}
            {!featuredVideo && (
              <TheImage
                src={'/images/' + slug + '/' + featuredImage[0]}
                width={featuredImage[1] * size}
                height={1 * size}
                alt={`${title} (${year}): featured image`}
              />
            )}
          </div>
          <div className="flex flex-wrap" id="photo-grid">
            {imgRand !== null &&
              imgRand.map((image, i) => (
                <div
                  className="m-1.5 relative "
                  key={i}
                  style={{
                    width: `${(image[1] * size * rowLen) / size}px`,
                    flexGrow: `${(image[1] * size * rowLen) / size}`
                  }}>
                  <FadeInSection>
                    <TheImage
                      src={'/images/' + slug + '/' + image[0]}
                      width={image[1] * size}
                      height={size}
                      imgClass="absolute w-full align-bottom top-0"
                      alt={title + '-' + [i + 1]}
                      isZoomed={isZoomed}
                      setIsZoomed={setIsZoomed}
                    />
                  </FadeInSection>
                </div>
              ))}
          </div>
        </div>
        <div
          className={`flex-shrink md:px-3 font-normal w-full xl:flex-shrink-0 text-left ${
            siteType === 'website' ? 'text-sm xl:w-80' : 'text-lg xl:w-96'
          }`}>
          <div className="mb-8 px-1.5 flex xl:hidden">
            {featuredVideo && (
              <LazyLoadComponent>
                <EmbedPlayer
                  src={featuredVideo}
                  img={featuredImage[0]}
                  videoPlayer={videoPlayer}
                  videoTime={videoTime}
                  slug={slug}
                />
              </LazyLoadComponent>
            )}
            {!featuredVideo && (
              <TheImage
                src={'/images/' + slug + '/' + featuredImage[0]}
                width={featuredImage[1] * 1200}
                height={1 * 1200}
                alt={`${title} (${year}): featured image`}
              />
            )}
          </div>
          <div className="px-1.5 mb-5">
            {!author && (
              <h1 className=" font-semibold  ">
                {title} ({year})
              </h1>
            )}
            {author && (
              <h1 className=" font-semibold">
                {title} ({year}) — {author}
              </h1>
            )}
            <h3 className=" ">{subtitle}</h3>
            <p className="leading-normal">
              <PrintMarkdown markdown={content} />
            </p>
          </div>
        </div>
      </div>
      {siteType === 'portfolio' && <TheFooter isZoomed={isZoomed} />}
    </>
  );
};

export default ArtistPage;
