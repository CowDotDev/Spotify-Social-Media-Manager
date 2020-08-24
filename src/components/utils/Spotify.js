const _clientId = 'db18d43f7d0a4aa9902dc7c957a730fc';
const _secret = '4b55a9e8ca284ce5b1446aa074eda3d0';
const _redirectUri = `https://${window.location.hostname}`;
const _scope = 'playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private';
let _accessToken = localStorage.getItem('spotifyToken') ? localStorage.getItem('spotifyToken') : '';

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const Spotify = {
    setAccessToken(token) {
        _accessToken = token;
        if (token !== null) {
          localStorage.setItem('spotifyToken',token);
        } else {
          localStorage.removeItem('spotifyToken');
        }
    },
    getAccessToken() {
        return _accessToken;
    },
    hasAccessToken() {
        if(this.getAccessToken()) return true;
        return false;
    },
    // Check if an auth code is on the URL
    getAuthCode() {
        return getParameterByName('code');
    },
    // For authorizeUser(), send the user to the Spotify authorization page with our client info
    getAuthorizeUserUrl() {
       return `https://accounts.spotify.com/authorize?client_id=${_clientId}&response_type=code&scope=${encodeURIComponent(_scope)}&redirect_uri=${encodeURIComponent(_redirectUri)}`;
    },

    // Request the Access Token with the Authorization Code
    async requestAccessToken() {
        return await fetch(`https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token`, {
            method: 'POST',
            body: `grant_type=authorization_code&code=${this.getAuthCode()}&redirect_uri=${_redirectUri}`,
            headers: {
                'Authorization': 'Basic '+btoa(_clientId+":"+_secret),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(async (response) => {
            if(response.ok) {
                return await response.json();
            }
        });
    },

    // Search Spotify API with given search term
    async search(term) {
        if (term) {
            return await fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?q=${term}&type=track&limit=10`, {
                headers: {
                    'Authorization': `Bearer ${_accessToken}`
                }
            }).then(response => {
                if(response.ok) {
                    return response.json();
                }
            }).then(jsonResponse => {
                let tracks = (jsonResponse.tracks && jsonResponse.tracks.items.length > 0 ? jsonResponse.tracks.items : []);
                // Grab all the information for all matched tracks and then return the result
                return tracks.map(function(track) {
                    // Grab the 300x300 album image
                    let albumImg;
                    for(var i = 0; i < track.album.images.length; i++) {
                        let image = track.album.images[i];
                        if(image.height === 300) {
                            albumImg = image.url;
                            break;
                        }
                    };

                    return {
                        id: track.id,
                        album: track.album.name,
                        albumImage: albumImg,
                        artist: track.artists[0].name,
                        title: track.name,
                        externalUrl: (track.external_urls && track.external_urls.spotify) || ''
                    };
                });
            });
        } else {
            // No Terms have been set, should be caught by onSubmit callback, but if not... here is an empty object
            return new Promise(resolve => {
                resolve({});
            });
        }
    }
};

export default Spotify;