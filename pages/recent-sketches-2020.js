import TheFooter from 'components/global/TheFooter';
import FadeInSection from 'components/ui/FadeInSection';
import TheVideo from 'components/ui/TheVideo';
import { selectNav } from 'lib/slices/navSlice';
import { selectWindow } from 'lib/slices/windowSlice';
import { NextSeo } from 'next-seo';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const VideoPage = () => {
    const [vidRand, setVidRand] = useState(null);
    const [rowLen, setRowLen] = useState(250);

    const windowWidth = useSelector(selectWindow);

    const size = 200;
    const width = 1.5;

    const siteType = useSelector(selectNav);

    const videos = [
        'steinj-video_01',
        'steinj-video_02',
        'steinj-video_03',
        'steinj-video_04',
        'steinj-video_05',
        'steinj-video_06',
        'steinj-video_07',
        'steinj-video_08',
        'steinj-video_09',
        'steinj-video_10',
        'steinj-video_11',
        'steinj-video_12',
        'steinj-video_13',
        'steinj-video_14',
        'steinj-video_15',
        'steinj-video_16',
    ];

    useEffect(() => {
        if (siteType === 'website') {
            windowWidth >= 1920
                ? setRowLen(160)
                : windowWidth >= 1680
                ? setRowLen(160)
                : windowWidth >= 1536
                ? setRowLen(150)
                : windowWidth >= 1440
                ? setRowLen(150)
                : windowWidth >= 1280
                ? setRowLen(125)
                : windowWidth >= 1024
                ? setRowLen(170)
                : windowWidth >= 768
                ? setRowLen(150)
                : windowWidth >= 640
                ? setRowLen(170)
                : setRowLen(140);
        } else {
            windowWidth >= 1920
                ? setRowLen(250)
                : windowWidth >= 1680
                ? setRowLen(250)
                : windowWidth >= 1536
                ? setRowLen(220)
                : windowWidth >= 1440
                ? setRowLen(200)
                : windowWidth >= 1280
                ? setRowLen(185)
                : windowWidth >= 1024
                ? setRowLen(260)
                : windowWidth >= 768
                ? setRowLen(210)
                : windowWidth >= 640
                ? setRowLen(170)
                : setRowLen(140);
        }
    }, [windowWidth]);

    useLayoutEffect(() => {
        setVidRand(videos.sort(() => Math.random() - 0.5));
    }, []);

    return (
        <>
            <NextSeo
                title="julian stein — recent sketches, 2020"
                description="recent video synthesis compositions using MaxMSP/Jitter and vsynth"
            />
            <div className=" flex">
                <div className=" text-3xl w-full relative flex-initial text-left md:pt-4 pb-20   ">
                    <div className="flex flex-wrap">
                        {vidRand !== null &&
                            vidRand.map((video, i) => (
                                <div
                                    className="m-1.5 relative"
                                    key={i}
                                    style={{
                                        width: `${
                                            (width * size * rowLen) / size
                                        }px`,
                                        flexGrow: `${
                                            (width * size * rowLen) / size
                                        }`,
                                    }}
                                >
                                    <FadeInSection>
                                        <i
                                            className="block"
                                            style={{
                                                paddingBottom: `${
                                                    (size / (width * size)) *
                                                    100
                                                }%`,
                                            }}
                                        >
                                            <TheVideo src={video} />
                                        </i>
                                    </FadeInSection>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            {siteType === 'portfolio' && <TheFooter />}
        </>
    );
};

export default VideoPage;
