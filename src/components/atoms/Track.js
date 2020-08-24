import React from 'react';
import PropTypes from 'prop-types';

import TrackType from '../../types/TrackType';

class Track extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    track: TrackType,
    mode: PropTypes.string.isRequired,
    handleTrackShare: PropTypes.func
  }

  preShareCheck = (trackIndex) => {
    if (this.isSearch) this.props.handleTrackShare(trackIndex);
  }

  isSearch = this.props.mode === 'search';

  render() {
    return (
      <div
        className={`${this.isSearch && 'flex-basis cursor-pointer hover:bg-green-500 hover:text-white transition-colors duration-200'}`}
        key={this.props.track.id}
        onClick={ () => { this.preShareCheck(this.props.index) } }
      >
        <img className="w-full" src={this.props.track.albumImage} alt={this.props.track.album} />
        <p>{this.props.track.title}</p>
        <p>{this.props.track.artist}</p>
      </div>
    );
  }
}

export default Track;
