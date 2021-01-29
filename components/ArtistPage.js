import Head from 'next/head';
import Image from 'next/image';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import * as Icon from 'react-feather';
import Link from 'next/link';

import EmbedPlayer from './EmbedPlayer';
import TheImage from './TheImage';

import FadeInSection from './FadeInSection';
import PrintMarkdown from './PrintMarkdown';
import React, { useLayoutEffect, useState } from 'react';

const ArtistPage = ({ page }) => {
  const {
    title,
    subtitle,
    content,
    year,
    slug,
    images,
    featuredImage,
    featuredVideo,
    videos,
    template,
    role,
    aspect,
    featuredAspect
  } = page;

  const [imgRand, setImgRand] = useState(null);
  //const [imgDim, setImgDim] = useState(null);
  const [rowLen, setRowLen] = useState(125);

  const size = 500;

  /*let imgs = document.querySelectorAll('.images');
  let imgElem = [];
  Object.values(imgs).map((val, i) => imgElem.push([val.naturalWidth, val.naturalHeight]));
  setImgDim(imgElem);*/

  useLayoutEffect(() => {
    setImgRand(images.sort(() => Math.random() - 0.5));
    let rowArr = [100, 125, 150, 175, 200];
    rowArr.sort(() => Math.random() - 0.5);
    setRowLen(rowArr[0]);
  }, []);

  return (
    <div className="flex md:flex-row flex-col-reverse md:flex-wrap-reverse xl:flex-nowrap ">
      <div className=" text-3xl w-auto relative flex-initial text-left mb-20 xl:mt-20 mx-3 xl:ml-5 xl:mr-5 md:mt-8 md:ml-8 md:mr-10  ">
        <div className="mb-8 mx-1.5 hidden xl:flex">
          {featuredVideo && (
            <LazyLoadComponent>
              <EmbedPlayer src={featuredVideo} img={featuredImage[0]} slug={slug} />
            </LazyLoadComponent>
          )}
          {!featuredVideo && (
            <TheImage
              src={'/images/' + slug + '/' + featuredImage[0]}
              width={featuredImage[1] * 500}
              height={1 * 500}
            />
          )}
        </div>
        <div className="flex flex-wrap">
          {imgRand !== null &&
            imgRand.map((image, i) => (
              <div
                className="m-1.5 relative "
                key={i}
                style={{
                  width: `${(image[1] * size * rowLen) / size}px`,
                  flexGrow: `${(image[1] * size * rowLen) / size}`
                }}>
                <i
                  className="block"
                  style={{
                    paddingBottom: `${(size / (image[1] * size)) * 100}%`
                  }}>
                  <FadeInSection>
                    <TheImage
                      src={'/images/' + slug + '/' + image[0]}
                      width={image[1] * size}
                      height={size}
                      imgClass="absolute w-full align-bottom top-0"
                    />
                  </FadeInSection>
                </i>
              </div>
            ))}
        </div>

        <FadeInSection name="back-to-top">
          <p className="text-right mt-4 ">
            <Link href={'/' + slug + '#top'} as={'/' + slug}>
              <a href="#top">
                <Icon.ChevronUp className=" w-12 h-12 inline" />
              </a>
            </Link>
          </p>
        </FadeInSection>
      </div>
      <div className="text-3xl w-auto flex-shrink mx-3 xl:w-1/4 xl:flex-shrink-0 text-left mt-0 mb-8 md:mb-0 md:mt-20 md:ml-8 xl:mr-20 md:mr-10 ">
        <div className="mb-8 mx-1.5 flex xl:hidden">
          {featuredVideo && (
            <LazyLoadComponent>
              <EmbedPlayer src={featuredVideo} img={featuredImage[0]} slug={slug} />
            </LazyLoadComponent>
          )}
          {!featuredVideo && (
            <TheImage
              src={'/images/' + slug + '/' + featuredImage[0]}
              width={featuredImage[1] * 500}
              height={1 * 500}
            />
          )}
        </div>
        <div className="mx-1.5">
          <h1 className="text-sm font-bold">
            {title} ({year})
          </h1>
          <h1 className="text-sm pb-4">{subtitle}</h1>

          <p className="text-sm">
            <PrintMarkdown markdown={content} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
