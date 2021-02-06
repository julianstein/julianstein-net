import Head from 'next/head';

import { useEffect, useState } from 'react';
import FadeInSection from '../components/FadeInSection';
import TheVideo from '../components/TheVideo';

import Layout, { siteTitle } from '../components/layout';

const IndexPage = () => {
  const [vidRand, setVidRand] = useState(null);
  const [rowLen, setRowLen] = useState(100);

  const videos = [
    'aroom_01',
    'aroom_02',
    'aroom_03',
    'aroom_04',
    'aroom_05',
    'wind_01',
    'noodles',
    'rhythm-assemblage_01',
    'rhythm-assemblage_02',
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

  useEffect(() => {
    videos.sort(() => Math.random() - 0.5);
    setVidRand(videos[0]);
  }, []);

  const size = 200;
  const width = 1.5;

  return (
    <div className=" flex  max-w-3xl mt-4 ">
      <div
        className=" relative  "
        style={{
          width: `${(width * size * rowLen) / size}px`,
          flexGrow: `${(width * size * rowLen) / size}`
        }}>
        <i
          className="block "
          style={{
            paddingBottom: `${(size / (width * size)) * 100}%`
          }}>
          <TheVideo src={vidRand} />
        </i>
      </div>
    </div>
  );
};

export default IndexPage;
