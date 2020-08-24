import PropTypes from 'prop-types';

const TrackType = PropTypes.shape({
  id: PropTypes.string,
  album: PropTypes.string,
  albumImage: PropTypes.string,
  artist: PropTypes.string,
  title: PropTypes.string,
  externalUrl: PropTypes.string
});
export default TrackType;