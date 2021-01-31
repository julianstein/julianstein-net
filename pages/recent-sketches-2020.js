import { useEffect, useState } from 'react';

import FadeInSection from '../components/FadeInSection';
import TheVideo from '../components/TheVideo';
import useWindowSize from '../hooks/useWindowSize';

const VideoPage = () => {
  const [vidRand, setVidRand] = useState(null);
  const [rowLen, setRowLen] = useState(250);

  const windowSize = useWindowSize();

  const size = 200;
  const width = 1.5;

  /* let widthBox = windowSize.width <= 1280 ? 545 : 620;

  //1280 - 545
  console.log('window-size:', windowSize.width - widthBox);
  console.log('width:' + (width * size * rowLen) / size);
  console.log('rowLen:' + rowLen);
  console.log('number of boxes:', (windowSize.width - widthBox) / ((width * size * rowLen) / size));
  console.log('widthbox:', widthBox);

  //width of nav is 320
  //window-width - 320 is working width(not taking into consideration the margins) */

  useEffect(() => {
    windowSize.width >= 1465
      ? setRowLen(250)
      : windowSize.width >= 1279
      ? setRowLen(200)
      : windowSize.width >= 1060
      ? setRowLen(170)
      : windowSize.width >= 920
      ? setRowLen(120)
      : windowSize.width >= 768
      ? setRowLen(90)
      : windowSize.width >= 640
      ? setRowLen(220)
      : setRowLen(100);
  }, [windowSize]);

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
      <div className=" text-3xl w-full relative flex-initial text-left md:pt-4 pb-20 md:pl-16  ">
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
