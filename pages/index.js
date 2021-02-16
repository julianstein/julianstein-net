import { AnimatePresence, motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import FadeInSection from '../components/FadeInSection';
import TheVideo from '../components/TheVideo';
import { selectWindow } from '../lib/slices/windowSlice';

const IndexPage = () => {
  const [vidRand, setVidRand] = useState(null);
  const [showVid, setShowVid] = useState(true);
  const [triggerRand, setTriggerRand] = useState(false);
  const [loadVid, setLoadVid] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

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
    setTriggerRand(false);
    setLoadVid(false);
  }, [triggerRand]);

  useEffect(() => {
    windowWidth < 640 ? setShowVid(false) : setShowVid(true);
  }, [windowWidth]);

  const size = 200;
  const width = 1.5;

  const variants = {
    false: { opacity: 1, transition: { duration: 1.2, ease: 'easeInOut' } },
    true: { opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }
  };

  const transitions = {};
  return (
    <>
      <NextSeo
        title="julian stein — media artist"
        description="Julian Stein is a media artist based in Los Angeles, CA. His work examines relationships between the analog and the digital, primarily through expressions of sound, and movement, and light."
        openGraph={{
          type: 'website',
          url: 'https://www.julianstein.net',
          title: 'julian stein — media artist',
          description:
            'Julian Stein is a media artist based in Los Angeles, CA. His work examines relationships between the analog and the digital, primarily through expressions of sound, and movement, and light.',
          images: [
            {
              url: 'https://julianstein.net/images/a-room-that-i-take-care-of/IBG_0006.png',
              width: 800,
              height: 600,
              alt: 'julian stein'
            }
          ]
        }}
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
              <AnimatePresence key="bboop">
                <motion.i
                  whileHover={{
                    scale: 1.025,
                    transition: { duration: 1, type: 'spring' }
                  }}
                  whileTap={{
                    scale: 1,
                    transition: { duration: 1, type: 'spring' }
                  }}
                  drag
                  animate={transitioning ? 'true' : 'false'}
                  transition={{ duration: 1, type: 'spring' }}
                  variants={variants}
                  dragConstraints={{
                    top: 0,
                    left: -0,
                    right: 0,
                    bottom: 0
                  }}
                  onTap={() => {
                    setTransitioning(true);
                    setTimeout(() => setTransitioning(false), 700);
                    setTimeout(() => setTriggerRand(true), 700);
                  }}
                  className="block "
                  style={{
                    paddingBottom: `${66.6666}%`
                  }}>
                  <TheVideo src={vidRand} load={triggerRand} />
                </motion.i>
              </AnimatePresence>
            </div>
          </div>
        </FadeInSection>
      )}
    </>
  );
};

export default IndexPage;
