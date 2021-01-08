import ReactPlayer from 'react-player/lazy';

const EmbedPlayer = (src) => {
  src = src.src;

  return (
    <div id="responsiveVideoWrapper" className="relative w-full h-0 pb-fluid-video">
      <ReactPlayer
        className="absolute top-0 left-0 w-full h-full"
        url={`https://player.vimeo.com/video/` + src}
        width="100%"
        height="100%"
        light
      />
    </div>
  );
};

export default EmbedPlayer;
