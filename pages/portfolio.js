import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

import TheImage from '../components/TheImage';
import useWindowSize from '../hooks/useWindowSize';
import { getAllDynamicPages } from '../lib/markdown';

const DynamicPage = ({ posts }) => {
  const windowSize = useWindowSize();
  const [postsSort, setPostsSort] = useState(null);

  const {
    title,
    subtitle,
    content,
    year,
    slug,
    images,
    featuredImage,
    featuredVideo,
    imageGrid
  } = posts;

  let postsArr = Object.values(posts);

  let sortOrder = [16, 1, 19, 0, 14, 10, 13, 4, 15, 7, 12, 17, 11, 3, 18, 5, 6, 9, 2, 8];

  postsArr = sortOrder.map((a) => postsArr[a]);

  const [rowLen, setRowLen] = useState(290);

  const size = 1000;

  /*let imgs = document.querySelectorAll('.images');
  let imgElem = [];
  Object.values(imgs).map((val, i) => imgElem.push([val.naturalWidth, val.naturalHeight]));
  setImgDim(imgElem);*/

  return (
    <>
      <NextSeo
        title="julian stein — portfolio"
        description="Julian Stein is a media artist based in Los Angeles, CA. His work examine relationships between the analog and the digital, primarily through expressions of sound, and movement, and light"
        noIndex="true"
      />
      <div className=" flex text-3xl w-full relative flex-wrap text-left md:pt-4 pb-20  ">
        <div
          className="m-1.5 relative "
          style={{
            width: `${(1.5 * size * rowLen) / size}px`,
            flexGrow: `${(1.5 * size * rowLen) / size}`
          }}>
          <Link href={'/recent-sketches-2020'}>
            <a>
              <TheImage
                src={'/images/recent-sketches-2020/2020-11-01-22-11-02-170.jpg'}
                width={1.5 * size}
                height={size}
                imgClass="absolute w-full align-bottom top-0"
                alt={'recent sketches - 1'}
                zoom={false}
                title={'recent sketches (2020)'}
                portfolio={true}
              />
            </a>
          </Link>
        </div>
        {postsArr.map(({ slug, featuredImage, title, year }, i) => (
          <div
            key={slug}
            className="m-1.5 relative "
            style={{
              width: `${(featuredImage[1] * size * rowLen) / size}px`,
              flexGrow: `${(featuredImage[1] * size * rowLen) / size}`
            }}>
            <Link href={'/' + slug}>
              <a>
                <TheImage
                  src={'/images/' + slug + '/' + featuredImage[0]}
                  width={featuredImage[1] * size}
                  height={size}
                  imgClass="absolute w-full align-bottom top-0"
                  alt={title + '-' + [i + 1]}
                  zoom={false}
                  title={`${title} (${year})`}
                  portfolio={true}
                />
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const posts = getAllDynamicPages([
    'title',
    'subtitle',
    'slug',
    'year',
    'content',
    'images',
    'featuredImage',
    'videos',
    'featuredVideo'
  ]);

  return {
    props: {
      posts: {
        ...posts
      }
    }
  };
}

export default DynamicPage;
