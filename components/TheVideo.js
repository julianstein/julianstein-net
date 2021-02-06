import { LazyLoadComponent } from 'react-lazy-load-image-component';

const TheVideo = (props) => {
  const { src } = props;

  return (
    <LazyLoadComponent>
      <video
        loop
        playsInline
        autoPlay
        muted
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        width="640"
        height="360"
        className="absolute w-full h-full align-bottom top-0 object-cover">
        <source src={'/videos/' + src + '.m4v'}></source>
      </video>
    </LazyLoadComponent>
  );
};

export default TheVideo;
