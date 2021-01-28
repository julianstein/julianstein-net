import Head from 'next/head';
import Image from 'next/image';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import * as Icon from 'react-feather';
import Link from 'next/link';

import EmbedPlayer from './EmbedPlayer';
import FadeInSection from './FadeInSection';
import PrintMarkdown from './PrintMarkdown';

const PortfolioPage = ({ page, posts }) => {
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
    link
  } = page;

  console.log('PORTFOLIO PAGE');

  return (
    <div className="flex md:flex-row flex-col-reverse md:flex-wrap ">
      <div className=" text-3xl w-auto relative flex-initial text-left mb-20 mx-3 md:mt-8 md:ml-0 md:mr-10  ">
        <div className="text-3xl w-auto flex-shrink mx-3 text-left mt-0 mb-8 md:mb-0 md:mt-20 md:ml-8 md:mr-10 ">
          <div className="flex flex-shrink" style={{ maxWidth: '900px' }}>
            <div className="w-1/2 mr-10 ">
              <h1 className="text-xl font-bold">
                {title} ({year})
              </h1>
              <h1 className="text-lg pb-4">{subtitle}</h1>
              <h1 className="text-lg pb-4">{role}</h1>
            </div>
            <div className=" w-1/2">
              <p className="text-lg pb-4">
                <PrintMarkdown markdown={content} />
              </p>
            </div>
          </div>
          <div className="mb-8 flex">
            {featuredVideo && (
              <LazyLoadComponent>
                <EmbedPlayer src={featuredVideo} img={featuredImage} slug={slug} />
              </LazyLoadComponent>
            )}
            {!featuredVideo && (
              <Image
                priority="true"
                src={'/images/' + slug + '/' + featuredImage}
                alt="Picture of the author"
                layout="intrinsic"
                objectFit="cover"
                width={1.5 * 600}
                height={1 * 600}
              />
            )}
          </div>
          {images.map((image, index) => (
            <div className="mb-8" key={index}>
              <FadeInSection>
                <Image
                  priority="true"
                  src={'/images/' + slug + '/' + image}
                  alt="Picture of the author"
                  layout="intrinsic"
                  objectFit="cover"
                  width={1.5 * 600}
                  height={1 * 600}
                />
              </FadeInSection>
            </div>
          ))}{' '}
          <FadeInSection name="back-to-top">
            <p className="text-right ">
              <Link href={'/' + slug + '#top'} as={'/' + slug}>
                <a href="#top">
                  <Icon.ChevronUp className=" w-12 h-12 inline" />
                </a>
              </Link>
            </p>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
