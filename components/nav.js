import Link from 'next/link';
import slugify from 'slugify';
import Projects from './projects';
import * as Icon from 'react-feather';
import { useState, useEffect } from 'react';
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

const Nav = () => {
  const router = useRouter();

  const [active, setActive] = useState(null);

  let path = router.asPath;

  let slugs = [];
  slugs = links.map((value) => `/${slugify(value, { lower: true, strict: true })}`);

  useEffect(() => {
    setActive(slugs.indexOf(path));
  }, [path]);

  //let activeSlug = slugs.filter((slug) => slug === path);
  // console.log(activeSlug);
  //  console.log('active: ', active);
  let activeClass;

  return (
    <nav className="flex flex-col text-3xl text-left w-100 mr-12 md:w-80 sm:ml-12 sm:my-8 ml-8 mt-4 mb-8 xl:ml-20 xl:mr-12 md:my-16 md:ml-12 md:mr-0">
      <div className="">
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
              <a
                className="hover:text-gray-400 leading-normal"
                href="https://portfolio.julianstein.net/"
                rel="noreferrer"
                target="_blank">
                portfolio
              </a>
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
      </div>
    </nav>
  );
};

export default Nav;
