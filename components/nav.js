import Link from 'next/link';
import slugify from 'slugify';
import Projects from './projects';
import * as Icon from 'react-feather';

const links = [
  'a room that i take care of',
  'structure couples',
  'rhythm assemblage',
  'stridulating prototype',
  "don't fog yourself with rosy clouds, or yellow",
  'the wind repeats itself: blue grama',
  'sounding out spaces: garden ecologies',
  'time lenses: palimpsest',
  'in levitation, lightness',
  'invisible lines',
  'music for lamps',
  'aurora urbem',
  'montreal sound map'
];

const Nav = () => {
  return (
    <nav className="flex flex-col text-3xl text-left w-100 mr-12 md:w-72 sm:ml-12 sm:my-8 ml-8 mt-4 mb-8 xl:ml-20 xl:mr-12 md:my-16 md:ml-12 md:mr-0">
      <div className="">
        <ul className="pb-4">
          <Link href="/">
            <a className="text-base">julian stein</a>
          </Link>
        </ul>
        <div className="text-left text-sm text-black">
          <Projects />
          <ul className="hidden md:block leading-tight tracking-tight">
            {links.map((value, index) => (
              <li className="pb-1 " key={index}>
                <Link href={`/${slugify(value, { lower: true, strict: true })}`}>
                  <a className="hover:text-gray-400">{value}</a>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="pb-4 md:pt-3">
            <li className="hover:text-gray-400 leading-normal">
              <Link href={'/about'}>about</Link>
            </li>
            <li className="hover:text-gray-400 leading-normal">
              <a href="https://portfolio.julianstein.net/" rel="noreferrer" target="_blank">
                portfolio
              </a>
            </li>
            <li className="hover:text-gray-400 leading-normal">
              <a href="https://soundcloud.com/julianstein" rel="noreferrer" target="_blank">
                music
              </a>
            </li>
          </ul>
        </div>
        <div className="flex">
          <a href="https://www.instagram.com/steinjulian/" rel="noreferrer" target="_blank">
            <Icon.Instagram className=" w-4 mr-3 hover:text-gray-400" />
          </a>
          <a href="mailto:julian.stein@gmail.com">
            <Icon.Mail className="w-4 mr-3 hover:text-gray-400" />
          </a>
          <a href="https://github.com/julianstein/" rel="noreferrer" target="_blank">
            <Icon.GitHub className="w-4 mr-3 hover:text-gray-400" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
