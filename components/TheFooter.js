import Link from 'next/link';
import slugify from 'slugify';
import Projects from './projects';
import FadeInSection from './FadeInSection';
import useKeyPress from '../hooks/useKeyPress';
import * as Icon from 'react-feather';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';

const links = [
  'recent sketches, 2020',
  'time is out of joint',
  'artificial ecologies',
  'Whispering Wishes',
  'a room that i take care of',
  'structure couples',
  'rhythm assemblage',
  'stridulating prototype',
  "don't fog yourself with rosy clouds, or yellow",
  'the wind repeats itself: blue grama',
  'MindTravel',
  'Sounding Out Spaces: Garden Ecologies',
  'Time Lenses: Palimpsest',
  'SERRA',
  'dans le bois',
  'Turcot: la route devenue architecture',
  "Einstein's Dreams",
  'Invisible Lines',
  'Music for Lamps',
  'aurora urbem',
  'Montreal Sound Map'
];

const TheFooter = (props) => {
  const { display } = props;
  const [active, setActive] = useState(null);

  const router = useRouter();

  let path = router.asPath;

  const keyArrowL = useKeyPress('ArrowLeft');
  const keyArrowR = useKeyPress('ArrowRight');
  const keyEsc = useKeyPress('Escape');

  useEffect(() => {
    if (keyArrowL) {
      router.push(slugs[mod(active - 1, 21)]);
    }
  }, [keyArrowL]);

  useEffect(() => {
    if (keyArrowR) {
      router.push(slugs[mod(active + 1, 21)]);
    }
  }, [keyArrowR]);

  useEffect(() => {
    if (keyEsc) {
      router.push('/portfolio');
    }
  }, [keyEsc]);

  function mod(a, n) {
    return a - n * Math.floor(a / n);
  }

  let slugs = [];
  slugs = links.map((value) => `/${slugify(value, { lower: true, strict: true })}`);

  useEffect(() => {
    setActive(slugs.indexOf(path));
  }, [path]);

  let output;

  console.log(active);

  display === 'portfolio'
    ? (output = (
        <footer
          className={`${
            path === '/recent-sketches-2020' ? '' : 'xl:pr-5 xl:flex-shrink-0'
          } flex pb-8 md:pb-6 md:pt-2 mx-auto justify-center  flex-row`}>
          <Icon.ChevronsLeft
            onClick={() => router.push(slugs[mod(active - 1, 20)])}
            className=" w-8 h-8 mr-12 md:mr-24 hover:text-gray-400 cursor-pointer"
          />
          <Icon.Grid
            onClick={() => router.push('/portfolio')}
            className=" hover:text-gray-400 w-6 h-6 mx-12 mt-1 md:mx-24 cursor-pointer"
          />

          <Icon.ChevronsRight
            onClick={() => router.push(slugs[mod(active + 1, 21)])}
            className="w-8 h-8 ml-12 md:ml-24 hover:text-gray-400 cursor-pointer"
          />
          <div className={`w-0 ${path === '/recent-sketches-2020' ? '' : 'xl:w-96'}`} />
        </footer>
      ))
    : (output = <footer></footer>);

  return output;
};

export default TheFooter;
