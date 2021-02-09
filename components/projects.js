import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import slugify from 'slugify';
import { useSelector } from 'react-redux';
import { selectWindow } from '../lib/slices/windowSlice';
import useDidMountEffect from '../hooks/useDidMountEffect';
import useScrollPosition from '@react-hook/window-scroll';
import { set } from 'date-fns';

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
  const [gate, setGate] = useState(false);
  const { path, active } = props;

  useEffect(() => {
    path === '/' ? setOpen(true) : setTimeout(() => setOpen(false), 500);
  }, [path]);

  const scrollY = useScrollPosition(5);

  useEffect(() => {
    if (scrollY > 200) {
      setGate(true);
    }
    if (gate && scrollY < 50) {
      setTimeout(() => setOpen(true), 250);
    }
  }, [scrollY]);

  useEffect(() => {
    if (!open) {
      setGate(false);
    }
  }, [open]);

  return (
    <nav className=" flex md:hidden flex-col text-left w-100 text-sm text-black">
      <button
        className="pb-1 text-gray-400 text-left leading-normal"
        onClick={() => setOpen(!open)}>
        projects
      </button>
      <AnimatePresence key="bboop">
        {open && (
          <motion.ul
            className=" leading-tight tracking-tight pb-3"
            initial="pageInitial"
            animate="pageAnimate"
            exit="pageExit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            variants={{
              pageInitial: {
                height: 0,
                marginTop: '-.75rem',
                opacity: 0
              },
              pageAnimate: {
                height: 'auto',
                opacity: 1,
                marginTop: '0rem'
              },
              pageExit: {
                height: 0,
                opacity: 0,
                marginTop: '-.75rem'
              }
            }}>
            {links.map((value, index) => (
              <motion.li key={index} className="pb-1">
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
