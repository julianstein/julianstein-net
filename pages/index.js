import Head from 'next/head';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import { useEffect, useLayoutEffect, useState } from 'react';
import FadeInSection from '../components/FadeInSection';
import TheVideo from '../components/TheVideo';
import useWindowSize from '../hooks/useWindowSize';

import Layout, { siteTitle } from '../components/layout';

const IndexPage = () => {
  const windowSize = useWindowSize();

  const [vidRand, setVidRand] = useState(null);
  const [rowLen, setRowLen] = useState(100);
  const [showVid, setShowVid] = useState(true);

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
  useLayoutEffect(() => {
    videos.sort(() => Math.random() - 0.5);
    setVidRand(videos[0]);
  }, []);

  useEffect(() => {
    windowSize.width < 640 ? setShowVid(false) : setShowVid(true);
    console.log(windowSize.width);
  }, [windowSize]);

  const size = 200;
  const width = 1.5;

  return (
    showVid && (
      <FadeInSection>
        <div className=" flex max-w-xl mt-14 ">
          <div
            className=" relative  "
            style={{
              width: `${350}px`,
              flexGrow: `${350}`
            }}>
            <i
              className="block "
              style={{
                paddingBottom: `${66.6666}%`
              }}>
              <TheVideo src={vidRand} />
            </i>
          </div>
        </div>
      </FadeInSection>
    )
  );
};

export default IndexPage;
