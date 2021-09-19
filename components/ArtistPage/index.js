import TheFooter from 'components/global/TheFooter';
import EmbedPlayer from 'components/ui/EmbedPlayer';
import FadeInSection from 'components/ui/FadeInSection';
import RichText from 'components/ui/RichText';
import TheImage from 'components/ui/TheImage';
import { selectNav } from 'lib/slices/navSlice';
import { selectWindow } from 'lib/slices/windowSlice';
import PropTypes from 'prop-types';
import { useLayoutEffect, useState } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';

const ArtistPage = ({ page, title, slug, featuredImage }) => {
    const {
        subtitle,
        year,
        images,
        videoId,
        author,
        projectDescription,
        exhibitions,
    } = page;

    const featuredAspect =
        featuredImage?.file?.details?.image?.width /
        featuredImage?.file?.details?.image?.height;

    const [imgRand, setImgRand] = useState(null);
    //const [imgDim, setImgDim] = useState(null);
    const [rowLen, setRowLen] = useState(125);
    const [isZoomed, setIsZoomed] = useState(false);

    const size = 1280;

    const siteType = useSelector(selectNav);
    const windowWidth = useSelector(selectWindow);

    useLayoutEffect(() => {
        setImgRand(images.sort(() => Math.random() - 0.5));
        let rowArr = [100, 125, 150, 175, 200, 300, 200, 300];
        rowArr.sort(() => Math.random() - 0.5);

        if (siteType === 'website') {
            windowWidth >= 1920
                ? setRowLen(300)
                : windowWidth >= 1680
                ? setRowLen(140)
                : windowWidth >= 1536
                ? setRowLen(210)
                : windowWidth >= 1440
                ? setRowLen(210)
                : windowWidth >= 1280
                ? setRowLen(130)
                : windowWidth >= 1024
                ? setRowLen(130)
                : windowWidth >= 768
                ? setRowLen(80)
                : windowWidth >= 640
                ? setRowLen(140)
                : setRowLen(140);
        } else {
            windowWidth >= 1920
                ? setRowLen(300)
                : windowWidth >= 1680
                ? setRowLen(280)
                : windowWidth >= 1536
                ? setRowLen(250)
                : windowWidth >= 1440
                ? setRowLen(240)
                : windowWidth >= 1280
                ? setRowLen(210)
                : windowWidth >= 1024
                ? setRowLen(200)
                : windowWidth >= 768
                ? setRowLen(180)
                : windowWidth >= 640
                ? setRowLen(140)
                : setRowLen(140);
        }
    }, [imgRand]);

    return (
        <>
            <div className="flex md:flex-row flex-col-reverse md:flex-wrap-reverse xl:flex-nowrap pt-3">
                <div
                    className={`text-3xl w-full relative flex-initial text-left pt-1 pb-8 xl:pr-6 ${
                        siteType === 'website' ? 'md:px-3' : ' '
                    }`}
                >
                    <div className="mb-1 mx-1.5 hidden xl:flex">
                        {videoId && (
                            <LazyLoadComponent>
                                <EmbedPlayer
                                    src={videoId}
                                    img={featuredImage?.file?.url}
                                    slug={slug}
                                    // videoPlayer={videoPlayer}
                                    // videoTime={videoTime}
                                />
                            </LazyLoadComponent>
                        )}
                        {!videoId && (
                            <TheImage
                                src={featuredImage?.file?.url}
                                width={featuredAspect * size}
                                height={1 * size}
                                alt={`${title} (${year}): featured image`}
                            />
                        )}
                    </div>
                    <div className="flex flex-wrap" id="photo-grid">
                        {imgRand !== null &&
                            imgRand.map((image, i) => {
                                const aspect =
                                    image?.file?.details?.image?.width /
                                    image?.file?.details?.image?.height;

                                return (
                                    <div
                                        className="m-1.5 relative "
                                        key={i}
                                        style={{
                                            width: `${
                                                (aspect * size * rowLen) / size
                                            }px`,
                                            flexGrow: `${
                                                (aspect * size * rowLen) / size
                                            }`,
                                        }}
                                    >
                                        <FadeInSection>
                                            <TheImage
                                                src={image?.file?.url}
                                                width={aspect * size}
                                                height={size}
                                                imgClass="absolute w-full align-bottom top-0"
                                                alt={title + '-' + [i + 1]}
                                                isZoomed={isZoomed}
                                                setIsZoomed={setIsZoomed}
                                            />
                                        </FadeInSection>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div
                    className={`flex-shrink md:px-3 font-normal w-full xl:flex-shrink-0 text-left ${
                        siteType === 'website'
                            ? 'text-sm xl:w-80'
                            : 'text-lg xl:w-96'
                    }`}
                >
                    <div className="mb-8 px-1.5 flex xl:hidden">
                        {videoId && (
                            <LazyLoadComponent>
                                <EmbedPlayer
                                    src={videoId}
                                    img={featuredImage?.file?.url}
                                    // videoPlayer={videoPlayer}
                                    // videoTime={videoTime}
                                    slug={slug}
                                />
                            </LazyLoadComponent>
                        )}
                        {!videoId && (
                            <TheImage
                                src={featuredImage?.file?.url}
                                width={featuredAspect * 1200}
                                height={1 * 1200}
                                alt={`${title} (${year}): featured image`}
                            />
                        )}
                    </div>
                    <div className="px-1.5 mb-5">
                        {!author && (
                            <h1 className=" font-semibold  ">
                                {title} ({year})
                            </h1>
                        )}
                        {author && (
                            <h1 className=" font-semibold">
                                {title} ({year}) — {author}
                            </h1>
                        )}
                        <h3 className=" ">{subtitle}</h3>
                        <h3 className="leading-normal pb-4">
                            <RichText richText={projectDescription} />
                        </h3>
                        {exhibitions && (
                            <div>
                                <hr />
                                <h3 className="font-semibold">Exhibitions</h3>
                            </div>
                        )}
                        {exhibitions?.map((item, i) => (
                            <h3 className="pb-4" key={i}>
                                {item}
                            </h3>
                        ))}
                    </div>
                </div>
            </div>
            {siteType === 'portfolio' && <TheFooter isZoomed={isZoomed} />}
        </>
    );
};

ArtistPage.propTypes = {
    featuredImage: PropTypes.shape({
        file: PropTypes.shape({
            details: PropTypes.shape({
                image: PropTypes.shape({
                    height: PropTypes.any,
                    width: PropTypes.any,
                }),
            }),
            url: PropTypes.any,
        }),
    }),
    page: PropTypes.shape({
        author: PropTypes.any,
        exhibitions: PropTypes.shape({
            map: PropTypes.func,
        }),
        images: PropTypes.shape({
            sort: PropTypes.func,
        }),
        projectDescription: PropTypes.any,
        subtitle: PropTypes.any,
        videoId: PropTypes.any,
        year: PropTypes.any,
    }),
    slug: PropTypes.any,
    title: PropTypes.string,
};

export default ArtistPage;
