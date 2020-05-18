import React from "react";
import * as $ from "jquery";
import Player from "./Player";
import Playlists from "./Playlists";

export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = process.env.SPOTIFY_CLIENT_ID;
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
];

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial: any, item: any) {
    if (item) {
      const parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";

class Spotify extends React.Component<
  {},
  {
    token: string;
    item: any;
    is_playing: string;
    progress_ms: number;
    playlist_items: [];
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }],
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0,
      },
      is_playing: "Paused",
      progress_ms: 0,
      playlist_items: [],
    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
  }

  getCurrentlyPlaying(token: string) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: (xhr: any) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data: any) => {
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms,
        });
      },
    });
  }

  getPlaylists(token: string) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/playlists",
      type: "GET",
      beforeSend: (xhr: any) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data: any) => {
        this.setState({
          playlist_items: data.items,
        });
      },
    });
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token,
      });
      this.getCurrentlyPlaying(_token);
      this.getPlaylists(_token);
    }
  }

  render() {
    return (
      <div className="ui center aligned segment">
        {!this.state.token && (
          <a
            className="ui button teal"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              "%20"
            )}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )}
        {this.state.token && (
          <div className="ui two column very relaxed grid">
            <div className="column">
              {this.state.token && (
                <Playlists playlist_items={this.state.playlist_items} />
              )}
            </div>
            <div className="column">
              {this.state.token && (
                <Player
                  item={this.state.item}
                  is_playing={this.state.is_playing}
                  progress_ms={this.state.progress_ms}
                />
              )}
            </div>
            <div className="ui inverted vertical divider"></div>
          </div>
        )}
      </div>
    );
  }
}

export default Spotify;
