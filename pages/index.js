import { NextSeo } from 'next-seo';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import FadeInSection from '../components/FadeInSection';
import TheVideo from '../components/TheVideo';
import { selectWindow } from '../lib/slices/windowSlice';

const IndexPage = () => {
  const [vidRand, setVidRand] = useState(null);
  const [rowLen, setRowLen] = useState(100);
  const [showVid, setShowVid] = useState(true);

  const windowWidth = useSelector(selectWindow);

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
    windowWidth < 640 ? setShowVid(false) : setShowVid(true);
  }, [windowWidth]);

  const size = 200;
  const width = 1.5;

  return (
    <>
      <NextSeo
        title="julian stein — media artist"
        description="Julian Stein is a media artist based in Los Angeles, CA. His work examine relationships between the analog and the digital, primarily through expressions of sound, and movement, and light"
      />
      {showVid && (
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
      )}
    </>
  );
};

export default IndexPage;
