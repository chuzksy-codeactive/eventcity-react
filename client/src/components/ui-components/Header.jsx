import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signInReset, unAuthenticated } from '../../actions/userLoginAction';
import PropTypes from 'prop-types';

/**
 * This component is used for the navbar
 * of the application
 *
 * @class Header
 * @extends {Component}
 * @returns {object} JSX DOM
 */
class Header extends Component {
  renderAdminLinks = isAdmin => {
    if (isAdmin) {
      return (
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
            <Link to="/centers/create" className="dropdown-item">
              Add New Center
            </Link>
            <div className="dropdown-divider" />
            <Link to="/centers/list" className="dropdown-item">
              Modify/Delete Center
            </Link>
          </div>
        </li>
      );
    }
  };
  getUserId = () => {
    let userId = null;
    if (this.props.user.user.data !== undefined) {
      userId = this.props.user.user.data.id;
    }
    return userId;
  };
  renderAuthLinks = auth => {
    if (auth) {
      return (
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
            <Link className="dropdown-item" to="/events">
              View Events
            </Link>
            <div className="dropdown-divider" />
            <Link className="dropdown-item" to={`/events/${this.getUserId()}`}>
              Modify/Delete Event
            </Link>
          </div>
        </li>
      );
    }
  };
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            EventCity
          </a>
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
                <Link exact="true" to="/centers" className="nav-link active">
                  Explore Our Centers
                </Link>
              </li>
              {this.renderAdminLinks(this.props.auth.isAdmin)}
              {this.renderAuthLinks(this.props.auth.authenticated)}

              {!this.props.auth.authenticated && (
                <li className="nav-item">
                  <Link className="nav-link active" to="/login">
                    Sign In
                  </Link>
                </li>
              )}
              {this.props.user.user.data && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {this.props.user.user.data.username}
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link className="dropdown-item" to="/" onClick={this.props.logout}>
                      Sign Out
                    </Link>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    error: PropTypes.any,
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  }),
  auth: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    error: PropTypes.any.isRequired
  })
}

const mapStateToProps = state => ({
  user: state.userReducer,
  auth: state.authReducer
});
const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(signInReset());
    dispatch(unAuthenticated());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
