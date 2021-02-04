import Link from 'next/link';
import slugify from 'slugify';
import Projects from './projects';
import * as Icon from 'react-feather';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';

const links = [
  'recent sketches, 2020',
  'a room that i take care of',
  'structure couples',
  'rhythm assemblage',
  'stridulating prototype',
  "don't fog yourself with rosy clouds, or yellow",
  'the wind repeats itself: blue grama',
  'sounding out spaces: garden ecologies',
  'time lenses: palimpsest',
  'invisible lines',
  'music for lamps',
  'aurora urbem',
  'montreal sound map'
];

const Nav = (props) => {
  const { path, display } = props;
  const [active, setActive] = useState(null);

  let slugs = [];
  slugs = links.map((value) => `/${slugify(value, { lower: true, strict: true })}`);

  useEffect(() => {
    setActive(slugs.indexOf(path));
  }, [path]);

  let output;
  console.log(path);
  display === 'website'
    ? (output = (
        <nav className="flex flex-col text-3xl text-left px-1.5 w-100 md:w-80 pb-8 ">
          <ul className="pb-4">
            <Link href="/">
              <a
                className={
                  path === '/'
                    ? 'font-bold hover:text-black text-base'
                    : 'font-normal hover:text-gray-400 text-base'
                }>
                julian stein
              </a>
            </Link>
          </ul>
          <div className="text-left text-sm text-black">
            <Projects active={active} path={path} />

            <ul className="hidden md:block leading-tight tracking-tight">
              {links.map((value, index) => (
                <li className="pb-1" key={index}>
                  <Link href={`/${slugify(value, { lower: true, strict: true })}`}>
                    <a
                      className={
                        active === index
                          ? 'font-bold hover:text-black'
                          : 'font-normal hover:text-gray-400 '
                      }>
                      {value}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="pb-4 md:pt-3">
              <li className="leading-normal">
                <Link href={'/about'}>
                  <a
                    className={
                      path === '/about'
                        ? 'font-bold hover:text-black'
                        : 'font-normal hover:text-gray-400 '
                    }>
                    about
                  </a>
                </Link>
              </li>
              <li>
                <Link href={'/portfolio'}>
                  <a
                    className={
                      path === '/portfolio'
                        ? 'font-bold hover:text-black'
                        : 'font-normal hover:text-gray-400 '
                    }>
                    portfolio
                  </a>
                </Link>
              </li>
              <li>
                <a
                  className="hover:text-gray-400 leading-normal"
                  href="https://soundcloud.com/julianstein"
                  rel="noreferrer"
                  target="_blank">
                  music
                </a>
              </li>
            </ul>
          </div>
          <div className="flex -ml-1.5">
            <a
              href="https://www.instagram.com/steinjulian/"
              rel="noreferrer"
              target="_blank"
              className="hover:text-gray-400">
              <Icon.Instagram className=" w-4 mx-1.5 " />
            </a>
            <a href="mailto:julian.stein@gmail.com" className="hover:text-gray-400">
              <Icon.Mail className="w-4 mx-1" />
            </a>
            <a
              href="https://github.com/julianstein/"
              rel="noreferrer"
              target="_blank"
              className="hover:text-gray-400">
              <Icon.GitHub className="w-4 mx-1.5" />
            </a>
          </div>
        </nav>
      ))
    : (output = (
        <nav className="flex flex-col text-base md:text-2xl text-left px-1.5 pt-3 ">
          <div className=" w-full text-left flex flex-row relative flex-initial pt-1 pb-4  ">
            <div className="w-full">
              <Link href="/portfolio">
                <a className="hover:text-gray-400 pl-3 xl:pl-0 pr-6 md:pr-12">julian stein</a>
              </Link>
            </div>
            <div className="text-right w-full ">
              <Link href="/portfolio">
                <a
                  className={
                    path === '/portfolio' || path !== '/about'
                      ? 'font-bold hover:text-black pr-4'
                      : 'font-normal hover:text-gray-400 pr-4'
                  }>
                  work
                </a>
              </Link>
              <Link href="/about">
                <a
                  className={
                    path === '/about'
                      ? 'font-bold hover:text-black pr-4'
                      : 'font-normal hover:text-gray-400 pr-4'
                  }>
                  about
                </a>
              </Link>

              <a href="mailto:julian.stein@gmail.com" className="hover:text-gray-400">
                contact
              </a>
            </div>
            <div className="flex-shrink md:px-3 w-0 xl:w-80 xl:flex-shrink-0 " />
          </div>
        </nav>
      ));

  return output;
};

export default Nav;
