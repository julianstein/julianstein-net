import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import slugify from 'slugify';
import { portfolioLinks } from 'utils';
import useKeyPress from 'hooks/useKeyPress';

const TheFooter = props => {
    const { isZoomed } = props;
    const [active, setActive] = useState(null);

    const router = useRouter();

    let path = router.asPath;

    const keyArrowL = useKeyPress('ArrowLeft');
    const keyArrowR = useKeyPress('ArrowRight');
    const keyEsc = useKeyPress('Escape');

    useEffect(() => {
        if (keyArrowL && !isZoomed) {
            router.push(slugs[mod(active - 1, 21)]);
        }
    }, [keyArrowL]);

    useEffect(() => {
        if (keyArrowR && !isZoomed) {
            router.push(slugs[mod(active + 1, 21)]);
        }
    }, [keyArrowR]);

    useEffect(() => {
        if (keyEsc && !isZoomed) {
            router.push('/portfolio');
        }
    }, [keyEsc]);

    const mod = (a, n) => {
        return a - n * Math.floor(a / n);
    };

    let slugs = [];
    slugs = portfolioLinks.map(
        value => `/${slugify(value, { lower: true, strict: true })}`
    );

    useEffect(() => {
        setActive(slugs.indexOf(path));
    }, [path]);

    return (
        <footer
            className={`${
                path === '/recent-sketches-2020'
                    ? ''
                    : 'xl:pr-5 xl:flex-shrink-0  '
            } flex pb-8 md:pb-6 md:pt-2 mx-auto justify-center flex-row `}
        >
            <Icon.ChevronsLeft
                onClick={() => router.push(slugs[mod(active - 1, 20)])}
                className="   w-8 h-8 mr-12 md:mr-36 hover:text-gray-400 cursor-pointer"
            />
            <Icon.Grid
                onClick={() => router.push('/portfolio')}
                className=" hover:text-gray-400 w-6 h-6 mx-18 mt-1 md:mx-24 cursor-pointer"
            />

            <Icon.ChevronsRight
                onClick={() => router.push(slugs[mod(active + 1, 21)])}
                className="w-8 h-8 ml-12 md:ml-36 hover:text-gray-400  cursor-pointer"
            />
            <div
                className={`w-0 ${
                    path === '/recent-sketches-2020' ? '' : '  xl:w-96'
                }`}
            />
        </footer>
    );
};

TheFooter.propTypes = {
    isZoomed: PropTypes.any,
};

export default TheFooter;
