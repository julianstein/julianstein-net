import Head from 'next/head';
import Image from 'next/image';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import * as Icon from 'react-feather';
import Link from 'next/link';

import EmbedPlayer from '../components/EmbedPlayer';

import FadeInSection from '../components/FadeInSection';
import PrintMarkdown from '../components/PrintMarkdown';
import React, { useLayoutEffect, useState } from 'react';

const VideoPage = () => {
  const [vidRand, setVidRand] = useState(null);
  const [rowLen, setRowLen] = useState(125);

  const size = 200;
  const width = 1.5;

  useLayoutEffect(() => {
    setVidRand(videos.sort(() => Math.random() - 0.5));
    let rowArr = [300];
    rowArr.sort(() => Math.random() - 0.5);
    setRowLen(rowArr[0]);
  }, []);

  const videos = [
    'steinj-video_01.m4v',
    'steinj-video_02.m4v',
    'steinj-video_03.m4v',
    'steinj-video_04.m4v',
    'steinj-video_05.m4v',
    'steinj-video_06.m4v',
    'steinj-video_07.m4v',
    'steinj-video_08.m4v',
    'steinj-video_09.m4v',
    'steinj-video_10.m4v',
    'steinj-video_11.m4v',
    'steinj-video_12.m4v',
    'steinj-video_13.m4v',
    'steinj-video_14.m4v',
    'steinj-video_15.m4v',
    'steinj-video_16.m4v'
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
                    <video
                      loop
                      width="1000"
                      height="720"
                      playsinline
                      autoPlay
                      muted
                      className="absolute w-full h-full align-bottom top-0 object-cover">
                      <source src={'/videos/' + video}></source>
                    </video>
                  </i>
                </FadeInSection>
              </div>
            ))}
        </div>

        <FadeInSection name="back-to-top">
          <p className="text-right mt-4 ">
            <Link href={'/' + 'recent-sketches-2020' + '#top'} as={'/' + 'recent-sketches-2020'}>
              <a href="#top">
                <Icon.ChevronUp className=" w-12 h-12 inline" />
              </a>
            </Link>
          </p>
        </FadeInSection>
      </div>
    </div>
  );
};

export default VideoPage;
