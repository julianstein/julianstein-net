import React from 'react';
import PropTypes from 'prop-types';
import BandcampPlayer from 'react-bandcamp';

const EmbedBandcamp = ({ album }) => {
    return (
        <div
            id="responsiveVideoWrapper"
            className=" pt-0 lg:pt-8 relative w-full "
        >
            <BandcampPlayer
                width="100%"
                height="26rem"
                album={album}
                artwork="small"
            />
        </div>
    );
};

EmbedBandcamp.propTypes = {
    album: PropTypes.string,
};

export default EmbedBandcamp;
