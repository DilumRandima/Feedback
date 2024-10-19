import React from "react";
import { Link } from "react-router-dom";
import './Header.css'; // Import the custom CSS file
import logo from './logo.jpg'; // Import the logo image

function Header() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          {/* Use the imported logo */}
          <img src={logo} alt="logo" className="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/add">Add Feedback</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">View Feedback</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
