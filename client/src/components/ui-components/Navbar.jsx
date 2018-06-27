import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          EventCity
        </Link>

        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link to="/centers" className="nav-link">
                Explore Our Centers
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="http://example.com"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Admin
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="/">
                  Add New Center
                </a>
                <div className="dropdown-divider" />
                <Link to="/centers" className="dropdown-item">
                  Modify/Delete Center
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="http://example.com"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Event
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="/">
                  Add New Event
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="/">
                  Modify/Delete Event
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="/">
                Sign In
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
