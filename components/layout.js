import Head from 'next/head';
import Link from 'next/link';
import Nav from '../components/nav';
import Projects from '../components/projects';
import Router, { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
//const name = 'Julian Stein';
export const siteTitle = 'julian stein';

function Loading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => setLoading(true);
    const handleComplete = (url) => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  return loading && <div>Loading....{/*I have an animation here*/}</div>;
}

const Layout = ({ children }) => {
  return (
    <div>
      <Loading />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header></header>

      <div className=" flex flex-col md:flex-row">
        <Nav />
        <main className="md:w-2/6 w-100 sm:mx-8 mx-5 flex-auto flex flex-col">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
