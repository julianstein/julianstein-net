import React, { useEffect, useState } from 'react';
import TheImage from 'components/ui/TheImage';
import { selectWindow } from 'lib/slices/windowSlice';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const DynamicPage = ({ projects }) => {
    const [rowLen, setRowLen] = useState(290);

    const windowWidth = useSelector(selectWindow);

    const size = 1280;

    useEffect(() => {
        windowWidth >= 1920
            ? setRowLen(400)
            : windowWidth >= 1680
            ? setRowLen(387)
            : windowWidth >= 1536
            ? setRowLen(350)
            : windowWidth >= 1440
            ? setRowLen(320)
            : windowWidth >= 1280
            ? setRowLen(280)
            : windowWidth >= 1024
            ? setRowLen(230)
            : windowWidth >= 768
            ? setRowLen(300)
            : windowWidth >= 640
            ? setRowLen(300)
            : setRowLen(300);
    }, [windowWidth]);

    return (
        <>
            <NextSeo
                title="julian stein — portfolio"
                description="Julian Stein is a media artist based in Los Angeles, CA. His work examines relationships between the analog and the digital, primarily through expressions of sound, and movement, and light."
                noindex={true}
            />
            <div className=" flex text-3xl w-full relative flex-wrap text-left md:pt-4 pb-20  ">
                <div
                    className="m-1.5 relative "
                    style={{
                        width: `${(1.5 * size * rowLen) / size}px`,
                        flexGrow: `${(1.5 * size * rowLen) / size}`,
                    }}
                >
                    <Link href={'/sketches-2020'} passHref>
                        <TheImage
                            src={
                                '/images/sketches/2020-11-01-22-11-02-170.jpg'
                            }
                            width={1.5 * size}
                            height={size}
                            imgClass="absolute w-full align-bottom top-0"
                            alt={'recent sketches - 1'}
                            zoom={false}
                            title={'sketches, 2020'}
                            portfolio={true}
                        />
                    </Link>
                </div>
                {projects?.map(({ slug, featuredImage, title, year }, i) => {
                    const aspect =
                        featuredImage?.file?.details?.image?.width /
                        featuredImage?.file?.details?.image?.height;

                    return (
                        <div
                            key={slug}
                            className="m-1.5 relative "
                            style={{
                                width: `${(aspect * size * rowLen) / size}px`,
                                flexGrow: `${(aspect * size * rowLen) / size}`,
                            }}
                        >
                            <Link href={'/' + slug} passHref>
                                <TheImage
                                    src={featuredImage?.file?.url}
                                    width={aspect * size}
                                    height={size}
                                    imgClass="absolute w-full align-bottom top-0"
                                    alt={title + '-' + [i + 1]}
                                    zoom={false}
                                    title={`${title} (${year})`}
                                    portfolio={true}
                                />
                            </Link>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

DynamicPage.propTypes = {
    posts: PropTypes.any,
    projects: PropTypes.shape({
        map: PropTypes.func,
    }),
};

export default DynamicPage;
