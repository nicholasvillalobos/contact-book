
import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-2">
          <div className="nav-wrapper black">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center white-text"
            >
              Contact Manager system
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
