import Link from 'next/link';
import { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import slugify from 'slugify';

import Projects from './Projects';

const links = [
    'rhythm assemblage: avalon stairs',
    'recent sketches, 2020',
    'a room that i take care of',
    'structure couples',
    'rhythm assemblage: overhead lines',
    'stridulating prototype',
    "don't fog yourself with rosy clouds, or yellow",
    'the wind repeats itself: blue grama',
    'sounding out spaces: garden ecologies',
    'time lenses: palimpsest',
    'invisible lines',
    'music for lamps',
    'aurora urbem',
    'montreal sound map',
];

const Nav = props => {
    const { path, display } = props;
    const [active, setActive] = useState(null);

    let slugs = [];
    slugs = links.map(
        value => `/${slugify(value, { lower: true, strict: true })}`
    );

    useEffect(() => {
        setActive(slugs.indexOf(path));
    }, [path]);

    let output;
    display === 'website'
        ? (output = (
              <nav className="flex flex-col text-3xl flex-none text-left px-1.5 w-100 md:w-80 pb-8 ">
                  <ul className="pb-4">
                      <Link href="/">
                          <a
                              className={
                                  path === '/'
                                      ? 'font-semibold md:hover:text-black text-base'
                                      : 'font-normal md:hover:text-gray-400 text-base'
                              }
                          >
                              julian stein
                          </a>
                      </Link>
                  </ul>
                  <div className="text-left text-sm text-black">
                      <Projects active={active} path={path} display={display} />

                      <ul className="hidden md:block leading-tight tracking-tight">
                          {links.map((value, index) => (
                              <li className="pb-1" key={index}>
                                  <Link
                                      href={`/${slugify(value, {
                                          lower: true,
                                          strict: true,
                                      })}`}
                                  >
                                      <a
                                          className={
                                              active === index
                                                  ? 'font-semibold md:hover:text-black'
                                                  : 'font-normal md:hover:text-gray-400 '
                                          }
                                      >
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
                                              ? 'font-semibold md:hover:text-black'
                                              : 'font-normal md:hover:text-gray-400 '
                                      }
                                  >
                                      about
                                  </a>
                              </Link>
                          </li>
                          <li>
                              <Link href={'/portfolio'}>
                                  <a
                                      className={
                                          path === '/portfolio'
                                              ? 'font-semibold md:hover:text-black'
                                              : 'font-normal md:hover:text-gray-400 '
                                      }
                                  >
                                      portfolio
                                  </a>
                              </Link>
                          </li>
                          <li>
                              <a
                                  className="md:hover:text-gray-400 leading-normal"
                                  href="https://soundcloud.com/julianstein"
                                  rel="noreferrer"
                                  target="_blank"
                              >
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
                          className="md:hover:text-gray-400"
                      >
                          <Icon.Instagram className=" w-4 mx-1.5 " />
                      </a>
                      <a
                          href="mailto:julian.stein@gmail.com"
                          className="md:hover:text-gray-400"
                      >
                          <Icon.Mail className="w-4 mx-1" />
                      </a>
                      <a
                          href="https://github.com/julianstein/"
                          rel="noreferrer"
                          target="_blank"
                          className="md:hover:text-gray-400"
                      >
                          <Icon.GitHub className="w-4 mx-1.5" />
                      </a>
                  </div>
              </nav>
          ))
        : (output = (
              <nav className="flex flex-col text-base md:text-lg text-left pt-1 pb-3 px-1.5 ">
                  <div className=" w-full text-left flex flex-row relative flex-initial lg:flex-shrink-0 pt-4 sm:pt-2 md:px-0 xl:px-0  ">
                      <div className="w-24 sm:w-44 flex-shrink-0 ">
                          <Link href="/">
                              <a className="text-base sm:text-2xl font-normal md:hover:text-gray-400  ">
                                  julian stein
                              </a>
                          </Link>
                      </div>
                      <div className="flex flex-row w-full justify-end xl:justify-start xl:text-left self-end">
                          <div className="pr-2 md:pr-3">
                              <Link href="/portfolio">
                                  <a
                                      className={
                                          path === '/portfolio' ||
                                          path !== '/about'
                                              ? 'font-semibold md:hover:text-black'
                                              : 'font-normal md:hover:text-gray-400'
                                      }
                                  >
                                      portfolio
                                  </a>
                              </Link>
                          </div>
                          <div className="px-2 md:px-3">
                              <Link href="/about">
                                  <a
                                      className={
                                          path === '/about'
                                              ? 'font-medium md:hover:text-black'
                                              : 'font-normal md:hover:text-gray-400 '
                                      }
                                  >
                                      about
                                  </a>
                              </Link>
                          </div>

                          <a
                              href="mailto:julian.stein@gmail.com"
                              className=" pl-2 md:pl-3 font-normal md:hover:text-gray-400 "
                          >
                              contact
                          </a>
                      </div>
                  </div>
              </nav>
          ));

    return output;
};

export default Nav;
