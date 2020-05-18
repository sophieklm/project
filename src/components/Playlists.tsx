import React from "react";

export interface PlaylistProps {
  playlist_items: [];
}

class Playlists extends React.Component<{ playlist_items: any }, {}> {
  constructor(props: any) {
    super(props);
  }

  renderList() {
    return this.props.playlist_items.map((playlist: any) => {
      return (
        <div className="item" key={playlist.name}>
          <div className="right floated content">
            <button className="ui button teal">Select</button>
          </div>
          <div>
            <div className="content">{playlist.name}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="ui divided list">{this.renderList()}</div>;
  }
}

export default Playlists;
