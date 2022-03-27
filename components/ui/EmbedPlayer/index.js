import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/lazy';

const EmbedPlayer = props => {
    const player = useRef(null);

    const { img, src, videoPlayer, videoTime } = props;
    let output;

    const handleEnded = () => {
        player.current.showPreview();
    };

    const handleSeekTime = () => {
        if (videoTime !== undefined) {
            player.current.seekTo(videoTime);
        }
    };

    const onLoad = () => {
        player.current.showPreview();
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
                  light={img}
                  controls
                  onEnded={handleEnded}
                  height="100%"
                  config={{
                      file: {
                          attributes: {
                              autoPlay: true,
                              muted: true,
                          },
                      },
                  }}
              />
          ))
        : (output = (
              <ReactPlayer
                  ref={player}
                  light={img}
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
                              playsinline: true,
                              allowfullscreen: true,
                          },
                      },
                  }}
              />
          ));

    return (
        <div
            id="responsiveVideoWrapper"
            className="relative w-full h-0 pb-fluid-video"
        >
            {output}
        </div>
    );
};

EmbedPlayer.propTypes = {
    img: PropTypes.any,
    slug: PropTypes.any,
    src: PropTypes.any,
    videoPlayer: PropTypes.string,
    videoTime: PropTypes.any,
};

export default EmbedPlayer;
