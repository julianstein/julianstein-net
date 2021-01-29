import Head from 'next/head';
import Image from 'next/image';

import { LazyLoadComponent } from 'react-lazy-load-image-component';
import * as Icon from 'react-feather';
import Link from 'next/link';

import EmbedPlayer from '../components/EmbedPlayer';
import TheImage from '../components/TheImage';

import FadeInSection from '../components/FadeInSection';
import PrintMarkdown from '../components/PrintMarkdown';
import React, { useLayoutEffect, useState } from 'react';

import Layout, { siteTitle } from '../components/layout';

const AboutPage = () => {
  return (
    <div className=" flex">
      <div className="text-lg md:text-xl w-auto flex-shrink mx-3 xl:mr-64 xl:max-w-xl md:max-w-md lg:max-w-lg sm:max-w-sm max-w-sm text-left mt-0 mb-8 md:mb-0 md:mt-20 md:ml-8 xl:mr-20 md:mr-10">
        <p className="">
          Julian Stein is a media artist based in Los Angeles, CA. He creates performances and
          installations that examine relationships between the analog and the digital, primarily
          through expressions of sound, and movement, and light. Through the use of technology, his
          work aims to reimagine aspects of daily life, highlighting rhythmic and patterned
          structures to seek out shared qualities between the natural and built world.
        </p>
        <br />
        <p className="">
          MFA from the University of California Los Angeles in Design Media Arts, BFA from Concordia
          University in Electroacoustic Studies, co-creator of the Montreal Sound Map.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
