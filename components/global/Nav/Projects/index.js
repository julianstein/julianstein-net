import useScrollPosition from '@react-hook/window-scroll';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import slugify from 'slugify';

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

const Projects = props => {
    const [open, setOpen] = useState(null);
    const [gate, setGate] = useState(false);
    const { path, active } = props;

    useEffect(() => {
        path === '/'
            ? setTimeout(() => setOpen(true), 600)
            : setTimeout(() => setOpen(false), 600);
    }, [path]);

    const scrollY = useScrollPosition(5);

    useEffect(() => {
        if (scrollY > 200) {
            setGate(true);
        }
        if (gate && scrollY < 50) {
            setTimeout(() => setOpen(true), 800);
        }
        return () => {
            clearTimeout();
        };
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
                onClick={() => setOpen(!open)}
            >
                projects
            </button>
            <AnimatePresence key="bboop">
                {open && (
                    <motion.ul
                        className=" leading-tight tracking-tight pb-3"
                        initial="pageInitial"
                        animate="pageAnimate"
                        exit="pageExit"
                        variants={{
                            pageInitial: {
                                height: 0,
                                marginTop: '-.75rem',
                                opacity: 0,
                                transition: {
                                    duration: 0.6,
                                    ease: 'easeInOut',
                                },
                            },
                            pageAnimate: {
                                height: 'auto',
                                opacity: 1,
                                marginTop: '0rem',
                                transition: {
                                    duration: 1.5,
                                    type: 'spring',
                                    ease: 'easeInOut',
                                },
                            },
                            pageExit: {
                                height: 0,
                                opacity: 0,
                                marginTop: '-.75rem',
                                transition: {
                                    duration: 0.4,
                                    ease: 'easeInOut',
                                },
                            },
                        }}
                    >
                        {links.map((value, index) => (
                            <motion.li key={index} className="pb-1">
                                <Link
                                    href={slugify(value, {
                                        lower: true,
                                        strict: true,
                                    })}
                                >
                                    <a
                                        className={
                                            active === index
                                                ? 'font-bold '
                                                : 'font-normal'
                                        }
                                    >
                                        {value}
                                    </a>
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </nav>
    );
};

Projects.propTypes = {
    active: PropTypes.any,
    path: PropTypes.string,
};

export default Projects;