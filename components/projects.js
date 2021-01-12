import Link from 'next/link';
import { useState } from 'react';
import slugify from 'slugify';

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

const Projects = (active) => {
  const [open, setOpen] = useState(false);
  active = active.active;

  return (
    <nav className=" flex md:hidden flex-col text-3xl text-left w-100 ">
      <div className="text-left text-sm text-black">
        {open && (
          <button className="pb-1 text-gray-400 leading-normal" onClick={() => setOpen(!open)}>
            projects
          </button>
        )}
        {!open && (
          <button className="pb-0 leading-normal" onClick={() => setOpen(!open)}>
            projects
          </button>
        )}
        {open && (
          <ul className=" leading-tight tracking-tight pb-3">
            {links.map((value, index) => (
              <li className="pb-1" key={index} onClick={() => setOpen(false)}>
                <Link href={slugify(value, { lower: true, strict: true })}>
                  <a className={active === index ? 'font-bold ' : 'font-normal'}>{value}</a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Projects;
