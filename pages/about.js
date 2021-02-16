import { NextSeo } from 'next-seo';
import * as Icon from 'react-feather';
import { useSelector } from 'react-redux';

import { selectNav } from '../lib/slices/navSlice';

const AboutPage = () => {
  const siteType = useSelector(selectNav);

  return (
    <>
      <NextSeo
        title="julian stein — about"
        description="Julian Stein is a media artist based in Los Angeles, CA. His work examines relationships between the analog and the digital, primarily through expressions of sound, and movement, and light."
      />
      <div
        className={` flex flex-col text-base sm:text-lg md:text-xl ${
          siteType === 'website'
            ? 'md:pt-12 pl-1.5 md:pl-0 lg:pl-6 max-w-prose'
            : 'max-w-prose text-sm pt-6 pl-1.5 '
        }`}>
        {siteType === 'website' && (
          <p className="">
            Julian Stein is a media artist based in Los Angeles, CA. He creates performances and
            installations that examine relationships between the analog and the digital, primarily
            through expressions of sound, and movement, and light. Through the use of technology,
            his work aims to reimagine aspects of daily life, highlighting rhythmic and patterned
            structures to seek out shared qualities between the natural and built world.
          </p>
        )}
        {siteType === 'portfolio' && (
          <p className="">
            Julian Stein is a media artist and creative developer based in Los Angeles, CA. He
            creates performances and installations that examine relationships between the analog and
            the digital, primarily through expressions of sound, and movement, and light. His work
            aims to reimagine aspects of daily life, highlighting rhythmic and patterned structures
            to seek out shared qualities between the natural and built world.
            <br />
            <br />
            As a creative developer, Julian constructs bespoke experiences for physical and
            web-based environments, giving careful attention to design and interaction. He works
            with artists, musicians, agencies, and institutions to realize creative ventures,
            crafting each project through code, fabrication, and custom electronics.
          </p>
        )}
        <br />
        <p className="">
          MFA from the University of California Los Angeles in Design Media Arts, BFA from Concordia
          University in Electroacoustic Studies.
        </p>
        <br />

        {siteType === 'portfolio' && (
          <div className="flex pt-2 -ml-0">
            <a
              href="https://www.instagram.com/steinjulian/"
              rel="noreferrer"
              target="_blank"
              className="hover:text-gray-400">
              <Icon.Instagram className=" w-6 h-6 mr-3 " />
            </a>
            <a href="mailto:julian.stein@gmail.com" className="hover:text-gray-400">
              <Icon.Mail className="w-6 h-6 mx-3" />
            </a>
            <a
              href="https://github.com/julianstein/"
              rel="noreferrer"
              target="_blank"
              className="hover:text-gray-400">
              <Icon.GitHub className="w-6 h-6 mx-3" />
            </a>
            <a
              href="https://www.linkedin.com/in/julian-stein-991707b4/"
              rel="noreferrer"
              target="_blank"
              className="hover:text-gray-400">
              <Icon.Linkedin className="w-6 h-6 ml-3" />
            </a>
          </div>
        )}
        <br />
        {siteType === 'portfolio' && (
          <p className="italic pt-1">
            This portfolio was built using Next.js and deployed using Vercel.
          </p>
        )}
      </div>
    </>
  );
};

export default AboutPage;
