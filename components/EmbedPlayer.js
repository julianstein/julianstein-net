import ReactPlayer from 'react-player/lazy';
import { useRef, useEffect } from 'react';

const EmbedPlayer = (src, img, slug) => {
  const player = useRef(null);

  img = src.img;
  slug = src.slug;
  src = src.src;

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

  return (
    <div id="responsiveVideoWrapper" className="relative w-full h-0 pb-fluid-video">
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
    </div>
  );
};

export default EmbedPlayer;
