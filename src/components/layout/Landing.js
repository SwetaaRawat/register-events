import React from "react";
import { Navigate, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

const Landing = ({ auth }) => {
  if (auth.isAuthenticated) return <Navigate to="/dashboard" />;
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Register Event Application</h1>
          <p className="lead">
            If you already register then login 
          </p>
          <div className="buttons">
            <NavLink to="/register" className="btn btn-primary">
              Sign Up
            </NavLink>
            <NavLink to="/login" className="btn btn-light">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Landing);
