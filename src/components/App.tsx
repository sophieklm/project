import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Spotify from "./Spotify";
import socketIOClient from "socket.io-client";
import Moment from "react-moment";

const ENDPOINT = "http://127.0.0.1:3000";

class App extends React.Component<{}, { response: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      response: "",
    };
  }

  componentDidMount() {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data: any) => {
      this.setState({ response: data });
    });
  }

  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <Header />
          <div className="ui container segment">
            {/* <h4 className="ui header">
              It's{" "}
              <Moment parse="YYYY-MM-DD HH:mm:ss">{this.state.response}</Moment>
            </h4> */}
            <Spotify />
            <Switch>
              <Route path="/" exact />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
