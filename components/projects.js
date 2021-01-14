import Link from 'next/link';
import { useState } from 'react';
import slugify from 'slugify';
import { AnimatePresence, motion, AnimateSharedLayout } from 'framer-motion';

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
        <button className="pb-1 text-gray-400 leading-normal" onClick={() => setOpen(!open)}>
          projects
        </button>

        <AnimatePresence key="bboop">
          {open && (
            <motion.ul layout className=" leading-tight tracking-tight pb-3">
              {links.map((value, index) => (
                <motion.li
                  key={index}
                  className="pb-1"
                  onClick={() => setOpen(false)}
                  initial="pageInitial"
                  animate="pageAnimate"
                  exit="pageExit"
                  transition={{ duration: 0.2 }}
                  variants={{
                    pageInitial: {
                      opacity: 0
                    },
                    pageAnimate: {
                      opacity: 1
                    },
                    pageExit: {
                      opacity: 0
                    }
                  }}>
                  <Link href={slugify(value, { lower: true, strict: true })}>
                    <a className={active === index ? 'font-bold ' : 'font-normal'}>{value}</a>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Projects;
