import { useEffect, useRef, useState } from 'react';

const FadeInSection = (props, name) => {
  const [isVisible, setVisible] = useState(true);
  const domRef = useRef();
  // console.log(props.name);

  let setClass = props.name === undefined ? 'fade-in-section' : props.name;

  let options = {
    rootMargin: '0px',
    threshold: 0
  };

  useEffect(() => {
    let previousY = 0;
    let previousRatio = 0;

    const observer = new IntersectionObserver(([entry]) => {
      const currentY = entry.boundingClientRect.y;
      const currentRatio = entry.intersectionRatio;
      const isIntersecting = entry.isIntersecting;
      //console.log(entry);

      // Scrolling down/up
      if (currentY > previousY) {
        if (currentRatio < previousRatio && isIntersecting) {
          setVisible(entry.isIntersecting);
        } else {
          setVisible(entry.isIntersecting);
        }
      } else if (currentY < previousY && isIntersecting) {
        if (currentRatio > previousRatio) {
          setVisible(entry.isIntersecting);
        } else {
          setVisible(entry.isIntersecting);
        }
      }

      previousY = currentY;
      previousRatio = currentRatio;
    }, options);

    if (domRef) {
      observer.observe(domRef.current);
    }
    return () => observer.unobserve(domRef.current);
  }, []);
  return (
    <div className={`${setClass} ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
      {props.children}
    </div>
  );
};

export default FadeInSection;
