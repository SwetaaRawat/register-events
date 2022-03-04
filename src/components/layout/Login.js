import React,{Fragment} from "react";
import { Navigate} from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { login } from "../../actions/auth";
import { PropTypes } from "prop-types";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pwd: "",
    };
  }

  submitForm = async (e) => {
    e.preventDefault();
    const { pwd, email } = this.state;
    this.props.login(email, pwd);
  };

  render() {
    const { email, pwd } = this.state;
    const { submitForm } = this;

    if (this.props.isAuthenticated) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <section className ="landing">
      <div className ="dark-overlay">
        <div className ="landing-inner">
        <Fragment> <h1 className ="large text-primary">Login User</h1>
    <p className ="lead"><i className ="fas fa-user"></i> Sign Into Your Account</p>


    <form className ="form" onSubmit={(e) => submitForm(e)} >
     
      <div className ="form-group">
        <input 
        type="email" 
        placeholder="Email Address" 
        name="email" 
        value={email} 
        onChange={(e) => {
          this.setState({ email: e.target.value });
        }}
        />
      
      </div>
      <div className ="form-group">
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={pwd} 
          onChange={(e) => {
            this.setState({ pwd: e.target.value });
          }}
           minLength="6"
        />
      </div>
      
      <input type="submit" className ="btn btn-primary" value="Login" />
    </form>
  
    </Fragment>
          </div>
        </div>
    
    </section>
    );
  }
}
Login.protoTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, login })(Login);
