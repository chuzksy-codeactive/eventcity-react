import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../helper/RenderField';
import PropTypes from 'prop-types';

function validate(values) {
  var errors = {};
  var hasErrors = false;
  if (!values.username || values.username.trim() === '') {
    errors.username = 'username or email is required';
    hasErrors = true;
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'password is required';
    hasErrors = true;
  }
  return hasErrors && errors;
}

/**
 * This component is use to sign in users
 *
 * @class SignInForm
 * @extends {Component}
 * @return {object} JSX DOM
 */
class SignInForm extends Component {
  onSubmitForm = values => {
    const user = {
      username: values.username,
      password: values.password,
      emial: values.username
    };
    this.props.userSignIn(user, this.props.history);
  };
  errorMessage = () => {
    if (this.props.user.error) {
      return <div className="submitting error">{this.props.user.error}</div>;
    }
  };

  loading = () => {
    if (this.props.user.loading) {
      return <div className="submitting">submitting...</div>;
    }
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="container content" id="sign-in-works">
        <div className="row">
          <div className="col-md-5 offset-md-3">
            <form onSubmit={handleSubmit(this.onSubmitForm)} id="signin" className="signin">
              {this.loading()}
              {this.errorMessage()}
              <Field id="sigin-name" name="username" type="text" component={RenderField} label="Username or Email" required />
              <Field id="sigin-password" name="password" type="password" component={RenderField} label="Password" />
              <button className="btn btn-success" type="submit" disabled={submitting} style={{ marginRight: '10px' }}>
                Log In
              </button>
              <Link to="/">
                <button type="button" id="sigin-button" className="btn btn-danger">
                  Cancel
                </button>
              </Link>
              <Link to="/" className="signup-link"><i>Not a member? Sign up here</i></Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignInForm.propTypes = {
  userSignIn: PropTypes.func,
  user: PropTypes.shape({
    error: PropTypes.any,
    user: PropTypes.object,
    loading: PropTypes.bool
  }),
  auth: PropTypes.shape({
    authenticated: PropTypes.bool,
    isAdmin: PropTypes.bool,
    error: PropTypes.any
  })
}

export default reduxForm({
  form: 'signInForm',
  validate
})(SignInForm);
