'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { GithubIcon, InstagramIcon } from '@/components/icons';
import { websiteNav } from '@/lib/site';

const linkClass = (active: boolean) =>
    active ? 'font-semibold' : 'font-normal md:hover:text-gray-400';

export function Nav() {
    const pathname = usePathname();
    return (
        <nav className="flex w-full flex-none flex-col px-1.5 pb-8 text-left md:w-80">
            <Link href="/" className={`pb-4 text-base ${linkClass(pathname === '/')}`}>
                julian stein
            </Link>
            <div className="text-sm">
                <MobileProjects pathname={pathname} />
                <ProjectList pathname={pathname} className="hidden md:block" />
                <ul className="pb-4 leading-normal md:pt-3">
                    <li>
                        <Link href="/about" className={linkClass(pathname === '/about')}>
                            about
                        </Link>
                    </li>
                    <li>
                        <a
                            href="https://julianstein.bandcamp.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="md:hover:text-gray-400"
                        >
                            music
                        </a>
                    </li>
                </ul>
            </div>
            <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/steinjulian/" target="_blank" rel="noreferrer" aria-label="Instagram" className="md:hover:text-gray-400">
                    <InstagramIcon className="block size-4" />
                </a>
                <a href="mailto:julian.stein@gmail.com" aria-label="Email" className="md:hover:text-gray-400">
                    <Mail className="block size-4" />
                </a>
                <a href="https://github.com/julianstein/" target="_blank" rel="noreferrer" aria-label="GitHub" className="md:hover:text-gray-400">
                    <GithubIcon className="block size-4" />
                </a>
            </div>
        </nav>
    );
}

function ProjectList({ pathname, className = '' }: { pathname: string; className?: string }) {
    return (
        <ul className={`leading-tight tracking-tight ${className}`}>
            {websiteNav.map(({ slug, title }) => (
                <li key={slug} className="pb-1">
                    <Link href={`/${slug}`} className={linkClass(pathname === `/${slug}`)}>
                        {title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

/** Collapsible list on small screens; opens itself on the home page. Same spring as the original site. */
function MobileProjects({ pathname }: { pathname: string }) {
    const [open, setOpen] = useState(false);
    // Closing as part of a navigation skips the exit animation, so the new page doesn't slide up after it appears.
    const [instant, setInstant] = useState(false);
    const [prevPath, setPrevPath] = useState(pathname);
    if (pathname !== prevPath) {
        setPrevPath(pathname);
        if (pathname !== '/' && open) {
            setOpen(false);
            setInstant(true);
        }
    }

    useEffect(() => {
        if (pathname !== '/') return;
        const t = setTimeout(() => {
            setInstant(false);
            setOpen(true);
        }, 600);
        return () => clearTimeout(t);
    }, [pathname]);

    return (
        <div className="flex flex-col md:hidden">
            <button
                type="button"
                className="pb-1 text-left leading-normal text-gray-400"
                aria-expanded={open}
                onClick={() => {
                    setInstant(false);
                    setOpen(o => !o);
                }}
            >
                projects
            </button>
            <AnimatePresence custom={instant}>
                {open && (
                    <motion.div
                        className="overflow-hidden pb-3"
                        custom={instant}
                        variants={{
                            exit: (instant: boolean) => ({
                                height: 0,
                                marginTop: '-.75rem',
                                opacity: 0,
                                transition: instant ? { duration: 0 } : { duration: 0.4, ease: 'easeInOut' },
                            }),
                        }}
                        initial={{ height: 0, marginTop: '-.75rem', opacity: 0 }}
                        animate={{
                            height: 'auto',
                            marginTop: '0rem',
                            opacity: 1,
                            transition: { type: 'spring', duration: 1.5 },
                        }}
                        exit="exit"
                    >
                        <ProjectList pathname={pathname} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
