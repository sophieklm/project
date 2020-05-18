import React from "react";

export interface PlayerProps {
  item: {
    album: any;
    duration_ms: number;
    name: string;
    artists: any;
  };
  progress_ms: number;
  is_playing: string;
}

const Player = (props: PlayerProps) => {
  const backgroundStyles = {
    backgroundImage: `url(${props.item.album.images[0].url})`,
  };

  const progressBarStyles = {
    width: (props.progress_ms * 100) / props.item.duration_ms + "%",
  };

  return (
    <div className="ui items">
      <div className="item">
        <div className="image">
          <img src={props.item.album.images[0].url} />
        </div>
        <div className="content">
          <div className="header">{props.item.name}</div>
          <div className="meta">{props.item.artists[0].name}</div>
          <div className="meta">{props.is_playing ? "Playing" : "Paused"}</div>
          <div className="extra">
            <div className="progress__bar" style={progressBarStyles} />
          </div>
        </div>
        <div className="background" style={backgroundStyles} />{" "}
      </div>
    </div>
  );
};

export default Player;
