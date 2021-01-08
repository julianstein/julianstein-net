import Head from 'next/head';
import Image from 'next/image';

import Layout, { siteTitle } from '../components/layout';

const IndexPage = () => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className=" flex ">
        <div className=" text-3xl w-5/6 relative text-left my-20 ml-5 mr-10">
          <Image
            src="/IBG_0006.png"
            alt="Picture of the author"
            layout="intrinsic"
            width={1.5 * 500}
            height={1 * 500}
            objectFit="contain"
          />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
