import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import TheVideo from '../components/TheVideo';

import FadeInSection from '../components/FadeInSection';
import React, { useEffect, useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';

const VideoPage = () => {
  const [vidRand, setVidRand] = useState(null);
  const [rowLen, setRowLen] = useState(250);

  console.log(vidRand);
  const size = 200;
  const width = 1.5;
  useEffect(() => {
    setVidRand(videos.sort(() => Math.random() - 0.5));
  }, []);

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
    'steinj-video_16'
  ];

  return (
    <div className=" flex">
      <div className=" text-3xl w-auto relative flex-initial text-left mb-20 xl:mt-20 mx-3 xl:ml-5 xl:mr-5 md:mt-8 md:ml-8 md:mr-10  ">
        <div className="flex flex-wrap">
          {vidRand !== null &&
            vidRand.map((video, i) => (
              <div
                className="m-1.5 relative"
                key={i}
                style={{
                  width: `${(width * size * rowLen) / size}px`,
                  flexGrow: `${(width * size * rowLen) / size}`
                }}>
                <FadeInSection>
                  <i
                    className="block"
                    style={{
                      paddingBottom: `${(size / (width * size)) * 100}%`
                    }}>
                    <TheVideo src={video} />
                  </i>
                </FadeInSection>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
