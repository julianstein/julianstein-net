import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

const TheVideo = (props, { scrollPosition }) => {
  const { src } = props;

  return (
    <LazyLoadComponent scrollPosition={scrollPosition}>
      <div
        dangerouslySetInnerHTML={{
          __html: `
        <video
          loop
          muted
          autoplay
          playsInline
          width="640"
          height="360"
          poster="${'/images/sketches-stills/' + src + '.jpg'}"
          class="absolute w-full h-full align-bottom top-0 object-cover"
        
        >
        <source src="${'/videos/' + src + '.m4v'}" type="video/mp4" />
        </video>`
        }}
      />
    </LazyLoadComponent>
  );
};

export default trackWindowScroll(TheVideo);
