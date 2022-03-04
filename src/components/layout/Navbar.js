import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
   
    <ul>
     
        
     <li>
        <a onClick={logout} href="/" style={{ textDecoration: 'none' }}>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
      
    </ul>
     
  );

  const guestLinks = (
    <ul>
      
      <li>
        <NavLink to="/login" style={{ textDecoration: 'none' }} >{' '}
        <FontAwesomeIcon icon={['fas', 'unlock']}/>{' '}
          Login</NavLink>
      </li>
      <li>
        <NavLink to="/register" style={{ textDecoration: 'none' }} >
        <FontAwesomeIcon icon={['fas', 'user']}/>{' '}
          Register</NavLink>
      </li>
      
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <NavLink to="/" style={{ textDecoration: 'none' }}>
         Task
        </NavLink>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
  