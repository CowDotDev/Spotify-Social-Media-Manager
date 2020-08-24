import React from 'react';
import PropTypes from 'prop-types';

import TrackType from '../../types/TrackType';

const SearchResults = (props) => (
  <div className="px-5 py-6 sm:px-4">
    <h2 className="text-xl font-semibold mb-4 pb-4 border-b border-gray-300">Search Results:</h2>
    <div className="flex flex-wrap sm:space-x-4 space-y-4">
      { props.tracks }
    </div>
  </div>
);

SearchResults.propTypes = {
  tracks: PropTypes.arrayOf(TrackType)
}

export default SearchResults;