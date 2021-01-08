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

const linksTwo = [
  {
    href: 'https://github.com/vercel/next.js',
    label: 'about'
  },
  { href: 'https://nextjs.org/docs', label: 'portfolio' },
  { href: 'https://github.com/vercel/next.js', label: 'music' }
];

const Nav = () => {
  return (
    <nav className="flex flex-col text-3xl text-left w-100 mr-12 md:w-72 sm:ml-12 sm:my-8 ml-8 mt-4 mb-12 xl:ml-20 xl:mr-12 md:my-16 md:ml-12 md:mr-0">
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
              <li className="pb-1 hover:text-gray-400" key={index}>
                <Link href={`/${slugify(value, { lower: true, strict: true })}`}>{value}</Link>
              </li>
            ))}
          </ul>
          <ul className="pb-4 md:pt-3">
            {linksTwo.map(({ href, label }) => (
              <li className="hover:text-gray-400 leading-normal" key={`${href}${label}`}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex">
          <Icon.Instagram className=" w-4 mr-3" />
          <Icon.Mail className="w-4 mr-3" />
          <Icon.GitHub className="w-4 mr-3" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
