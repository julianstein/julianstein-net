import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { useEffect, useState, useLayoutEffect } from 'react';
import * as Icon from 'react-feather';

import FadeInSection from './FadeInSection';
import Nav from './nav';

import { useDispatch } from 'react-redux';

import { toggle } from '../lib/slices/navSlice';

//const name = 'Julian Stein';
export const siteTitle = 'julian stein | media artist';

const Layout = ({ children }) => {
  const router = useRouter();
  let path = router.asPath;

  const [isVisible, setVisible] = useState(false);
  const [siteType, setSiteType] = useState('website');

  const showArrow = () => {
    setTimeout(() => {
      window.document.documentElement.scrollHeight - 100 >
      window.document.documentElement.clientHeight
        ? setVisible(true)
        : setVisible(false);
    }, 500);
  };

  Router.events.on('routeChangeStart', () => setVisible(false));
  Router.events.on('routeChangeComplete', () => showArrow());

  useEffect(() => {
    showArrow();
  }, []);

  const dispatch = useDispatch();

  function dispatchToggle() {
    dispatch(toggle(siteType));
  }

  useLayoutEffect(() => {
    path === '/portfolio' && siteType === 'website'
      ? (setSiteType('portfolio'), dispatchToggle())
      : (setSiteType(siteType), dispatchToggle());
  });

  return (
    <div>
      <div
        className={` ${
          siteType === 'website'
            ? 'max-w-screen-2xl px-4 sm:px-12 lg:px-20 pt-4 sm:py-8 md:py-16'
            : 'mx-auto px-4 sm:px-12 lg:px-12 sm:py-4 md:py-4'
        }`}>
        <Head>
          <title>{siteTitle}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header></header>

        <div className={`flex flex-col ${siteType === 'website' ? 'md:flex-row' : ' '}`}>
          <Nav path={path} display={siteType} />
          <main className="w-full md:w-100 flex-auto flex flex-col">{children}</main>
        </div>
      </div>
      {isVisible && (
        <FadeInSection name={'back-to-top'}>
          <div className=" text-right pr-8 pb-8">
            <Icon.ChevronUp
              onClick={() => scrollTo({ top: 0 })}
              className=" w-12 h-12 inline cursor-pointer"
            />
          </div>
        </FadeInSection>
      )}
    </div>
  );
};

export default Layout;
