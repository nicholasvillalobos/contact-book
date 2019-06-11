import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style ={{ height: "75vh", background:"lightgray", width:"100%", height:"650px"}}
          className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4 style={{
              fontFamily: "monospace"
            }}>
            Please login or register.
            </h4>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  border: "black",
                  fontFamily: "monospace"
                }}
                className="btn btn-large waves-effect waves-light hoverable black accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  border: "black",
                  fontFamily: "monospace",
                  color: "black"
                }}
                className="btn btn-large btn-outline-warning waves-effect waves-light hoverable white"
              >
                LOGIN
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
