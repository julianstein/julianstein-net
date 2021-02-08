import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import slugify from 'slugify';

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

const linksTwo = [
  {
    href: 'https://github.com/vercel/next.js',
    label: 'about'
  },
  { href: 'https://nextjs.org/docs', label: 'portfolio' },
  { href: 'https://github.com/vercel/next.js', label: 'music' }
];

const Projects = (props) => {
  const [open, setOpen] = useState(null);

  const { path, active } = props;

  console.log(path);

  useEffect(() => {
    path !== '/about' ? setOpen(true) : setOpen(false);
  }, [path]);

  return (
    <nav className=" flex md:hidden flex-col text-left w-100 text-sm text-black">
      <button
        className="pb-1 text-gray-400 text-left leading-normal"
        onClick={() => setOpen(!open)}>
        projects
      </button>
      <AnimatePresence key="bboop">
        {open && (
          <motion.ul layout className=" leading-tight tracking-tight pb-3">
            {links.map((value, index) => (
              <motion.li
                key={index}
                className="pb-1"
                initial="pageInitial"
                animate="pageAnimate"
                exit="pageExit"
                transition={{
                  duration: 0.3
                }}
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
    </nav>
  );
};

export default Projects;
