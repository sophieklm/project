import * as React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui attached secondary pointing large menu inverted teal">
      <Link to="/" className="header item" id="fonts">
        Project
      </Link>
    </div>
  );
};

export default Header;
