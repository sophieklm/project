import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import socketIOClient from "socket.io-client";
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
          <p>
            It's <time dateTime={response}>{response}</time>
          </p>
          <Switch>
            <Route path="/" exact />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
