import { set } from 'date-fns';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';

import ArtistPage from '../components/ArtistPage';
import { getAllDynamicPages, getDynamicPageContentBySlug } from '../lib/markdown';

const DynamicPage = ({ page, posts }) => {
  const [index, setIndex] = useState(false);

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
    link,
    featuredAspect,
    aspect,
    imageGrid,
    videoPlayer,
    seoDescr
  } = page;

  useEffect(() => {
    seoDescr === 'none' ? setIndex(true) : setIndex(false);
  });

  return (
    <>
      <NextSeo
        title={`julian stein — ${title}`}
        description={seoDescr}
        noindex={index}
        openGraph={{
          type: 'project',
          author: 'julian stein',
          url: `https://www.julianstein.net/${slug}`,
          title: `julian stein — ${title}`,
          description: seoDescr,
          images: [
            {
              url: `/images/${slug}/${featuredImage[0]}`,
              width: 800,
              height: 600,
              alt: 'julian stein'
            }
          ]
        }}
      />
      <ArtistPage page={page} posts={posts} />
    </>
  );
};

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
    'videos',
    'featuredVideo',
    'collaboration',
    'template',
    'role',
    'link',
    'aspect',
    'featuredAspect',
    'imageGrid',
    'videoPlayer',
    'videoTime',
    'author',
    'seoDescr'
  ]);

  const posts = getAllDynamicPages([
    'title',
    'subtitle',
    'slug',
    'year',
    'content',
    'images',
    'featuredImage',
    'videos',
    'featuredVideo',
    'collaboration',
    'template',
    'role',
    'link',
    'aspect',
    'featuredAspect',
    'imageGrid',
    'videoPlayer',
    'videoTime',
    'author',
    'seoDescr'
  ]);

  return {
    props: {
      page: {
        ...page
      },
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
