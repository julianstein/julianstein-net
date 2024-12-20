import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import PropTypes from 'prop-types';
import slugify from 'slugify';
import { links } from 'utils';

const Projects = props => {
    const [open, setOpen] = useState(null);
    const { path, active } = props;

    useEffect(() => {
        path === '/'
            ? setTimeout(() => setOpen(true), 600)
            : setTimeout(() => setOpen(false), 600);
    }, [path]);

    return (
        <nav className=" flex md:hidden flex-col text-left w-100 text-sm text-black">
            <button
                className="pb-1 text-gray-400 text-left leading-normal"
                onClick={() => setOpen(!open)}
            >
                projects
            </button>
            <AnimatePresence key="boop" mode="wait">
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
                                    className={
                                        active === index
                                            ? 'font-bold '
                                            : 'font-normal'
                                    }
                                >
                                    {value}
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
