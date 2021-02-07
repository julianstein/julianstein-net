import { useSelector } from 'react-redux';

import { toggle, selectNav } from '../lib/slices/navSlice';
import * as Icon from 'react-feather';

const AboutPage = () => {
  const siteType = useSelector(selectNav);

  return (
    <div className=" flex">
      <div
        className={`text-base sm:text-lg md:text-xl ${
          siteType === 'website'
            ? 'md:pt-12 pl-1.5 md:pl-0 lg:pl-6 max-w-prose'
            : 'max-w-prose pt-6 pl-1.5 '
        }`}>
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
        <br />
        {siteType === 'portfolio' && (
          <p className="italic">
            This portfolio was built using Next.js and deployed using Vercel.
          </p>
        )}
        {siteType === 'portfolio' && (
          <div className="flex pt-8 -ml-0">
            <a
              href="https://www.instagram.com/steinjulian/"
              rel="noreferrer"
              target="_blank"
              className="hover:text-gray-400">
              <Icon.Instagram className=" w-6 h-6 mr-2 " />
            </a>
            <a href="mailto:julian.stein@gmail.com" className="hover:text-gray-400">
              <Icon.Mail className="w-6 h-6 mx-2" />
            </a>
            <a
              href="https://github.com/julianstein/"
              rel="noreferrer"
              target="_blank"
              className="hover:text-gray-400">
              <Icon.GitHub className="w-6 h-6 ml-2" />
            </a>
            <a
              href="https://github.com/julianstein/"
              rel="noreferrer"
              target="_blank"
              className="hover:text-gray-400">
              <Icon.Linkedin className="w-6 h-6 ml-2" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutPage;
