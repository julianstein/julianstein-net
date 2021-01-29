import ArtistPage from '../components/ArtistPage';
import PortfolioPage from '../components/PortfolioPage';
import useWindowSize from '../hooks/useWindowSize';

import { getAllDynamicPages, getDynamicPageContentBySlug } from '../lib/markdown';

const DynamicPage = ({ page, posts }) => {
  const windowSize = useWindowSize();

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
    aspect
  } = page;

  return (
    <div>
      {template !== 'portfolio' && <ArtistPage page={page} posts={posts} windowSize={windowSize} />}
      {template === 'portfolio' && <PortfolioPage page={page} posts={posts} />}
    </div>
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
    'featuredAspect'
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
    'featuredAspect'
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
