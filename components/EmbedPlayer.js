import ReactPlayer from 'react-player/lazy';
import { useRef, useEffect } from 'react';

const EmbedPlayer = (props) => {
  const player = useRef(null);

  const { img, slug, src, type } = props;
  let output;
  //  console.log(src);
  // console.log('/images/' + slug + '/' + img);

  const handleEnded = () => {
    //  console.log('onEnded');
    player.current.showPreview();
  };

  const onLoad = () => {
    player.current.showPreview();
    //console.log('loaded');
  };

  useEffect(() => {
    onLoad();
  });

  type === 'player'
    ? (output = (
        <ReactPlayer
          ref={player}
          playing={true}
          className="absolute w-full align-bottom top-0"
          url={'/videos/' + src}
          width="100%"
          light={false}
          controls={false}
          muted={true}
          loop={true}
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
