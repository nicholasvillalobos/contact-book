
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./nav.css"

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-2">
          <div className="nav-wrapper">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="text"
            >
              Contact Manager
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
