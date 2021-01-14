import Head from 'next/head';
import Image from 'next/image';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import EmbedPlayer from '../components/EmbedPlayer';
import PrintMarkdown from '../components/PrintMarkdown';
import { getAllDynamicPages, getDynamicPageContentBySlug } from '../lib/markdown';

const DynamicPage = ({ posts }) => {
  const {
    title,
    subtitle,
    content,
    year,
    slug,
    images,
    featuredImage,
    featuredVideo,
    videos
  } = posts;

  return (
    <div className="flex md:flex-row flex-col-reverse md:flex-wrap-reverse xl:flex-nowrap ">
      {Object.values(posts).map(({ slug, featuredImage, title, year, subtitle, content }) => (
        <div
          key={slug}
          className="text-3xl w-auto flex-shrink mx-3 xl:w-1/4 xl:flex-shrink-0 text-left mt-0 mb-8 md:mb-0 md:mt-20 md:ml-8 xl:mr-20 md:mr-10 ">
          <div className="mb-8 flex">
            <Image
              src={'/images/' + slug + '/' + featuredImage}
              alt="Picture of the author"
              layout="intrinsic"
              objectFit="cover"
              width={1.5 * 500}
              height={1 * 500}
            />
          </div>

          <h1 className="text-sm font-bold">
            {title} ({year})
          </h1>
          <h1 className="text-sm pb-4">{subtitle}</h1>
          <p className="text-sm">
            <PrintMarkdown markdown={content} />
          </p>
        </div>
      ))}
    </div>
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

export async function getStaticPaths() {
  const posts = getAllDynamicPages(['slug']);

  const paths = posts.map(({ slug }) => ({
    params: {
      slug
    }
  }));
  return {
    paths,
    fallback: false
  };
}

export default DynamicPage;
