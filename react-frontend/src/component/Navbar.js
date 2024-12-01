import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
        <img src="/static/images/download.png" height="40" alt="Logo" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto"></ul>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/admin">
              Admin Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/logout">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
