import ArtistPage from 'components/ArtistPage';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Project = ({
    projects,
    title,
    slug,
    featuredImage,
    seoDescr,
    ...props
}) => {
    const [index, setIndex] = useState(false);

    useEffect(() => {
        !seoDescr ? setIndex(true) : setIndex(false);
    });

    return (
        <>
            <NextSeo
                title={`julian stein — ${title}`}
                description={seoDescr}
                noindex={index}
                openGraph={{
                    type: 'project',
                    author: 'julian stein',
                    url: `https://www.julianstein.net/${slug}`,
                    title: `julian stein — ${title}`,
                    description: seoDescr,
                    images: [
                        {
                            url: `${featuredImage?.file?.url}`,
                            width: 800,
                            height: 600,
                            alt: 'julian stein',
                        },
                    ],
                }}
            />
            <ArtistPage
                page={props}
                title={title}
                slug={slug}
                featuredImage={featuredImage}
                projects={projects}
            />
        </>
    );
};

Project.propTypes = {
    featuredImage: PropTypes.shape({
        file: PropTypes.shape({
            url: PropTypes.any,
        }),
    }),
    seoDescr: PropTypes.any,
    slug: PropTypes.any,
    title: PropTypes.any,
};

export default Project;
