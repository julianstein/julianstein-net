import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import * as Icon from 'react-feather';

import FadeInSection from '../components/FadeInSection';
import Nav from '../components/nav';

//const name = 'Julian Stein';
export const siteTitle = 'julian stein';

const Layout = ({ children }) => {
  const [isVisible, setVisible] = useState(false);

  const showArrow = () => {
    window.document.documentElement.scrollHeight - 100 >
    window.document.documentElement.clientHeight
      ? setVisible(true)
      : setVisible(false);
  };

  Router.events.on('routeChangeStart', () => setVisible(false));
  Router.events.on('routeChangeComplete', () =>
    setTimeout(() => {
      showArrow();
    }, 500)
  );

  return (
    <div>
      <div className="px-4 sm:px-12 lg:px-20 pt-4 sm:py-8 md:py-16 max-w-screen-2xl">
        <Head>
          <title>{siteTitle}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header></header>

        <div className=" flex flex-col md:flex-row">
          <Nav navClass="flex flex-col text-3xl text-left px-1.5 w-100 md:w-80 pb-8 " />
          <main className="w-full md:w-2/3 flex-auto flex flex-col">{children}</main>
        </div>
      </div>
      {isVisible && (
        <FadeInSection>
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
