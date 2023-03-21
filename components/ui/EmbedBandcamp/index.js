import React from 'react';
import PropTypes from 'prop-types';

const EmbedBandcamp = ({ album }) => {
    return (
        <div
            id="responsiveVideoWrapper"
            className=" pt-0 lg:pt-8 relative w-full "
        >
            <iframe
                style={{ border: 0, width: '100%', height: '406px' }}
                src={`https://bandcamp.com/EmbeddedPlayer/album=${album}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/`}
                seamless
            />
        </div>
    );
};

EmbedBandcamp.propTypes = {
    album: PropTypes.string,
};

export default EmbedBandcamp;
