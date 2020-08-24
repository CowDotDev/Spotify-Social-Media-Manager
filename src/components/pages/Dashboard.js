import React from 'react';
import PropTypes from 'prop-types';

import UserType from '../../types/UserType';
import Spotify from '../utils/Spotify';
import database from '../../firebase'

import Login from './Login';
import Track from '../atoms/Track';
import SearchResults from '../molecules/SearchResults';

class Dashboard extends React.Component {
  state = {
    isSpotifyAuthorized: Spotify.hasAccessToken(),
    isSpotifyProcessingLogin: Spotify.getAuthCode(),
    searchResults: null,
    previouslyShared: []
  };

  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    user: UserType,
    authenticate: PropTypes.func.isRequired
  };

  searchTermRef = React.createRef();

  componentDidMount() {
    if (this.props.isAuthed && this.state.isSpotifyProcessingLogin) {
      Spotify.requestAccessToken().then(tokenResponse => {
        // Check to see if we were returned an access token
        if(tokenResponse.access_token) {
          // We have an access_token! Set it to the session, then refresh the page to get the updated state with the correct URL
          // Once again, not how'd like to handle the URL and State, but I don't want the code URL parameter anymore to prevent any issues.
          Spotify.setAccessToken(tokenResponse.access_token);
          window.history.replaceState({}, document.title, "/");
          this.setState({ isSpotifyAuthorized: true, isSpotifyProcessingLogin: false })
        } else {
          // We do not have an access_token! Return to the base route, as it will check localStorage if we are in a funky place.
          // Otherwise, the user will be presented with the log-in screen
          alert('k');
        }
      });
    }

    if (this.props.isAuthed) {
      this.ref = database.syncState(`${this.props.user.uid}/history`, {
        context: this,
        state: "previouslyShared"
      })
    }
  }

  componentWillUnmount() {
    if (this.props.isAuthed) database.removeBinding(this.ref);
  }

  handleSpotifyAuth = () => {
    window.location.href = Spotify.getAuthorizeUserUrl();
  };
  handleSongSearch = (event) => {
    event.preventDefault();
    const searchTerm = this.searchTermRef.current.value;
    if (typeof searchTerm !== 'undefined' && searchTerm !== '') {
      Spotify.search(searchTerm).then(results => {
        this.setState({ searchResults: results });
      });
    }
  };
  handleTrackShare = (trackIndex) => {
    const track = this.state.searchResults[trackIndex];
    window.FB.ui({
      display: 'popup',
      method: 'share',
      href: track.externalUrl,
    }, () => {
      this.updatePreviouslyShared(track);
    });
  };
  updatePreviouslyShared = (track) => {
    const previouslyShared = this.state.previouslyShared.length > 0 ? [...this.state.previouslyShared] : [];
    previouslyShared.push(track);
    this.setState({ previouslyShared });
  };

  renderSpotifySearch = () => {
    if (!this.state.isSpotifyAuthorized && !this.state.isSpotifyProcessingLogin) {
      return (
        <button onClick={this.handleSpotifyAuth} className="bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-4 px-10 rounded transition-colors duration-300">Log-in to Spotify</button>
      )
    } else if(!this.state.isSpotifyAuthorized && this.state.isSpotifyProcessingLogin) {
      return <p class="text-white text-lg font-semibold">Please wait while we finish signing you into Spotify...</p>
    }
    return (
      <React.Fragment>
        <h2 className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 text-lg font-semibold">Search for Song to Share:</h2>
        <form className="w-full md:w-2/3 lg:w-3/4 xl:w-4/5" onSubmit={this.handleSongSearch}>
          <input className="py-2 px-4 w-full rounded bg-cool-gray-200 text-cool-gray-700 placeholder-cool-gray-400" type="text" ref={this.searchTermRef} name="search" placeholder="Song Title" />
        </form>
      </React.Fragment>
    );
  };
  renderSpotifySearchResults = () => {
    if (this.state.searchResults === null) return null;
    const Tracks = this.state.searchResults.map((track, index) => <Track key={track.id} index={index} track={track} mode="search" handleTrackShare={this.handleTrackShare} />);
    return <SearchResults tracks={Tracks} />
  };
  renderPreviouslyShared = () => {
    if (!this.state.previouslyShared.length > 0) {
      return <p className="text-gray-500 italic">You have not shared any songs, yet.<br />Use the search bar above to get started!</p>;
    }
    return (
      <div className="flex flex-wrap sm:space-x-4 space-y-4">
        { this.state.previouslyShared.map((track, index) => <Track key={track.id} index={index} track={track} mode="previous" />) }
      </div>
    );
  };

  render() {
    if (!this.props.isAuthed) {
      return <Login authenticate={this.props.authenticate} />;
    }
    return (
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 px-5 py-6 sm:px-4 text-white bg-cool-gray-600">
          { this.renderSpotifySearch() }
        </div>
        { this.renderSpotifySearchResults() }
        <div className="px-5 py-6 sm:px-4">
          <h2 className="text-xl font-semibold mb-4 pb-4 border-b border-gray-300">Previously Shared Songs</h2>
          { this.renderPreviouslyShared() }
        </div>
      </div>
    );
  }
};

export default Dashboard;
