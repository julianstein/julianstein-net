import { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';

const EmbedPlayer = (props) => {
  const player = useRef(null);

  const { img, slug, src, videoPlayer, videoTime } = props;
  let output;
  //  console.log(src);
  // console.log('/images/' + slug + '/' + img);

  const handleEnded = () => {
    //  console.log('onEnded');
    player.current.showPreview();
  };

  const handleSeekTime = () => {
    //  console.log('onEnded');
    if (videoTime !== undefined) {
      player.current.seekTo(videoTime);
      console.log(videoTime);
    }
  };

  const onLoad = () => {
    player.current.showPreview();
    //console.log('loaded');
  };

  useEffect(() => {
    onLoad();
  });

  videoPlayer === 'youtube'
    ? (output = (
        <ReactPlayer
          ref={player}
          playing={true}
          className="absolute w-full align-bottom top-0"
          url={`https://www.youtube.com/watch?v=` + src}
          width="100%"
          light={'/images/' + slug + '/' + img}
          controls
          onEnded={handleEnded}
          height="100%"
          config={{
            file: {
              attributes: {
                autoPlay: true,
                muted: true
              }
            }
          }}
        />
      ))
    : (output = (
        <ReactPlayer
          ref={player}
          light={'/images/' + slug + '/' + img}
          className="absolute top-0 left-0 w-full h-full"
          url={`https://player.vimeo.com/video/` + src}
          width="100%"
          onEnded={handleEnded}
          height="100%"
          controls
          playing
          onReady={handleSeekTime}
          config={{
            vimeo: {
              playerOptions: {
                playsinline: true
              }
            }
          }}
        />
      ));

  return (
    <div id="responsiveVideoWrapper" className="relative w-full h-0 pb-fluid-video">
      {output}
    </div>
  );
};

export default EmbedPlayer;
