import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

const TheVideo = (props, { scrollPosition }) => {
  const { src } = props;

  return (
    <video
      loop
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      width="640"
      height="360"
      playsInline
      autoPlay
      poster={'/images/sketches-stills/' + src + '.jpg'}
      muted
      className="absolute w-full h-full align-bottom top-0 object-cover">
      <source muted="true" src={'/videos/' + src + '.m4v'}></source>
    </video>
  );
};

export default trackWindowScroll(TheVideo);
