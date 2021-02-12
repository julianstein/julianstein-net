import { useRouter } from 'next/router';
import Router from 'next/router';
import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import * as Icon from 'react-feather';
import { useDispatch } from 'react-redux';

import { toggle } from '../lib/slices/navSlice';
import { width } from '../lib/slices/windowSlice';

import FadeInSection from './FadeInSection';
import Nav from './nav';
import useWindowSize from '../hooks/useWindowSize';

//const name = 'Julian Stein';
export const siteTitle = 'julian stein | media artist';

const Layout = ({ children }) => {
  const windowSize = useWindowSize();

  const router = useRouter();
  let path = router.asPath;

  const [isVisible, setVisible] = useState(false);
  const [siteType, setSiteType] = useState('website');
  const [windowWidth, setWindowWidth] = useState(1280);

  Router.events.on('routeChangeStart', () => setVisible(false));
  Router.events.on('routeChangeComplete', () => showArrow());

  useEffect(() => {
    showArrow();
    // `current` points to the mounted text input element
  }, []);

  const dispatch = useDispatch();

  function dispatchToggle() {
    dispatch(toggle(siteType));
  }

  function dispatchWidth() {
    dispatch(width(windowWidth));
  }

  const showArrow = () => {
    setTimeout(() => {
      window.document.documentElement.scrollHeight - 100 >
      window.document.documentElement.clientHeight
        ? setVisible(true)
        : setVisible(false);
    }, 500);
  };

  useLayoutEffect(() => {
    if (window.location.hostname == 'portfolio.julianstein.net' && path === '/') {
      setSiteType('portfolio'), dispatchToggle();
      router.push('/portfolio', '/');
    } else if (window.location.hostname == 'portfolio.julianstein.net' && path === '/portfolio') {
      setSiteType('portfolio'), dispatchToggle();
      router.push('/portfolio', '/');
    } else if (window.location.hostname == 'portfolio.julianstein.net') {
      setSiteType('portfolio'), dispatchToggle();
    } else if (path === '/portfolio') {
      setSiteType('portfolio'), dispatchToggle();
    } else if (path === '/') {
      setSiteType('website'), dispatchToggle();
    }
  }, [path]);

  useLayoutEffect(() => {
    windowSize.width >= 2560
      ? (setWindowWidth(2560), dispatchWidth())
      : windowSize.width >= 1920
      ? (setWindowWidth(1920), dispatchWidth())
      : windowSize.width >= 1680
      ? (setWindowWidth(1680), dispatchWidth())
      : windowSize.width >= 1536
      ? (setWindowWidth(1536), dispatchWidth())
      : windowSize.width >= 1440
      ? (setWindowWidth(1440), dispatchWidth())
      : windowSize.width >= 1280
      ? (setWindowWidth(1280), dispatchWidth())
      : windowSize.width >= 1024
      ? (setWindowWidth(1024), dispatchWidth())
      : windowSize.width >= 768
      ? (setWindowWidth(768), dispatchWidth())
      : windowSize.width >= 640
      ? (setWindowWidth(640), dispatchWidth())
      : (setWindowWidth(0), dispatchWidth());
  });

  return (
    <>
      <div
        className={` ${
          siteType === 'website'
            ? 'max-w-screen-2xl px-4 sm:px-12 lg:px-20 pt-4 sm:py-8 md:py-16'
            : 'max-w-screen-1920px mx-auto px-4 sm:px-12 lg:px-12 sm:py-4 md:py-4'
        }`}>
        <div className={`flex flex-col ${siteType === 'website' ? 'md:flex-row' : ' '}`}>
          <Nav path={path} display={siteType} />
          <main className="w-full md:w-100 flex-auto flex flex-col">{children}</main>
        </div>
      </div>
      {isVisible && siteType !== 'portfolio' && (
        <FadeInSection name={'back-to-top'}>
          <div className=" text-right pr-8 pb-8">
            <Icon.ChevronUp
              onClick={() => scrollTo({ top: 0 })}
              className=" w-12 h-12 inline cursor-pointer"
            />
          </div>
        </FadeInSection>
      )}
    </>
  );
};

export default Layout;
