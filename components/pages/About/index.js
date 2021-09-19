import RichText from 'components/ui/RichText';
import { selectNav } from 'lib/slices/navSlice';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import { useSelector } from 'react-redux';

const AboutPage = ({ artistStatement, portfolioStatement }) => {
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
                }`}
            >
                {siteType === 'website' && (
                    <p>
                        <RichText richText={artistStatement} />
                    </p>
                )}
                {siteType === 'portfolio' && (
                    <p className="">
                        <RichText richText={portfolioStatement} />
                    </p>
                )}
                <br />

                <br />

                {siteType === 'portfolio' && (
                    <div className="flex pt-2 -ml-0">
                        <a
                            href="https://www.instagram.com/steinjulian/"
                            rel="noreferrer"
                            target="_blank"
                            className="hover:text-gray-400"
                        >
                            <Icon.Instagram className=" w-6 h-6 mr-3 " />
                        </a>
                        <a
                            href="mailto:julian.stein@gmail.com"
                            className="hover:text-gray-400"
                        >
                            <Icon.Mail className="w-6 h-6 mx-3" />
                        </a>
                        <a
                            href="https://github.com/julianstein/"
                            rel="noreferrer"
                            target="_blank"
                            className="hover:text-gray-400"
                        >
                            <Icon.GitHub className="w-6 h-6 mx-3" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/julian-stein-991707b4/"
                            rel="noreferrer"
                            target="_blank"
                            className="hover:text-gray-400"
                        >
                            <Icon.Linkedin className="w-6 h-6 ml-3" />
                        </a>
                    </div>
                )}
                <br />
                {siteType === 'portfolio' && (
                    <p className="italic pt-1">
                        This portfolio was built using Next.js and deployed
                        using Vercel.
                    </p>
                )}
            </div>
        </>
    );
};

AboutPage.propTypes = {
    artistStatement: PropTypes.any,
    portfolioStatement: PropTypes.any,
};

export default AboutPage;
