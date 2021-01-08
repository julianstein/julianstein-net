import Head from 'next/head';
import Image from 'next/image';

import EmbedVimeo from '../components/EmbedVimeo';
import Layout from '../components/layout';
import PrintMarkdown from '../components/PrintMarkdown';
import { getAllDynamicPages, getDynamicPageContentBySlug } from '../lib/markdown';

export default function DynamicPage({ page }) {
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
  } = page;
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex md:flex-row flex-col-reverse md:flex-wrap-reverse xl:flex-nowrap ">
        <div className=" text-3xl w-auto relative flex-initial text-left mb-20 xl:mt-20 xl:ml-5 xl:mr-5 md:mt-8 md:ml-8 md:mr-10  mx-3 ">
          <div className="mb-8 hidden xl:flex">
            {featuredVideo && <EmbedVimeo src={featuredVideo} />}
            {featuredImage && (
              <Image
                src={'/images/' + slug + '/' + featuredImage}
                alt="Picture of the author"
                layout="intrinsic"
                objectFit="cover"
                width={1.5 * 500}
                height={1 * 500}
              />
            )}
          </div>
          {videos &&
            videos.map((video, index) => (
              <div className="mb-8" key={index}>
                <EmbedVimeo src={video} />
              </div>
            ))}

          {images.map((image, index) => (
            <div className="mb-8" key={index}>
              <Image
                src={'/images/' + slug + '/' + image}
                alt="Picture of the author"
                layout="intrinsic"
                objectFit="cover"
                width={1.5 * 500}
                height={1 * 500}
              />
            </div>
          ))}
        </div>
        <div className="text-3xl w-auto flex-shrink xl:w-1/4 xl:flex-shrink-0 text-left mt-0 mb-8 md:mb-0 md:mt-20 md:ml-8 xl:mr-20 md:mr-10 mx-3">
          <div className="mb-8 flex xl:hidden">
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
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  // Pass in the fields that we want to get
  const page = getDynamicPageContentBySlug(slug, [
    'title',
    'subtitle',
    'slug',
    'year',
    'content',
    'images',
    'featuredImage',
    'video',
    'featuredVideo'
  ]);

  return {
    props: {
      page: {
        ...page
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
