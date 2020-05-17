import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import socketIOClient from "socket.io-client";
import Moment from "react-moment";

const ENDPOINT = "http://127.0.0.1:3000";

const App = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data: any) => {
      setResponse(data);
    });
  }, []);

  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <div className="ui container segment">
          <h4 className="ui header">
            It's <Moment parse="YYYY-MM-DD HH:mm:ss">{response}</Moment>
          </h4>
          <Switch>
            <Route path="/" exact />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
