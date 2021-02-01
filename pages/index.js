import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TheImage from '../components/TheImage';
import Layout, { siteTitle } from '../components/layout';

const IndexPage = () => {
  return (
    <div className=" flex ">
      <div className="hidden md:flex text-3xl w-5/6 relative text-left my-20">
        <TheImage
          src="/images/a-room-that-i-take-care-of/IBG_0006.png"
          alt="a room that i take care of - 1"
          layout="intrinsic"
          width={1.5 * 500}
          height={1 * 500}
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default IndexPage;
