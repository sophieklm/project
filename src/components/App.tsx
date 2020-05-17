import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <div className="ui container segment">
          <Switch>
            <Route path="/" exact />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
