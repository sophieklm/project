import React from "react";

export interface PlaylistProps {
  playlist_items: [];
}

const Playlists = (props: PlaylistProps) => {
  return (
    <div className="Playlists">
      <div className="playlist_items">{props.playlist_items}</div>
    </div>
  );
};

export default Playlists;
