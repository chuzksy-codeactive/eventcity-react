import React, { Component } from 'react';
import { Field, reduxForm, values } from 'redux-form';
import axios from 'axios';
import PropTypes from 'prop-types';

const validate = (values) => {
  const errors = {};
  let hasErrors = false;

  if (!values.username || values.username.trim() === '') {
    errors.username = 'Enter username';
    hasErrors = true;
  }
  if (!values.firstname || values.firstname.trim() === '') {
    errors.firstname = 'Enter Firstname';
    hasErrors = true;
  }
  if (!values.lastname || values.lastname.trim() === '') {
    errors.lastname = 'Enter Lastname';
    hasErrors = true;
  }
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter email';
    hasErrors = true;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
    hasErrors = true;
  }
  if (!values.confirmPassword || values.confirmPassword.trim() === '') {
    errors.confirmPassword = 'Enter Confirm Password';
    hasErrors = true;
  }

  if (
    values.confirmPassword &&
    values.confirmPassword.trim() !== '' &&
    values.password &&
    values.password.trim() !== '' &&
    values.password !== values.confirmPassword
  ) {
    errors.password = "Password And Confirm Password don't match";
    errors.password = "Password And Confirm Password don't match";
    hasErrors = true;
  }
  return hasErrors && errors;
};

const renderField = ({
  input, label, type, meta: {
    touched, error, invalid, warning
  }
}) => (
  <div>
    <div className="form-group">
      <input {...input} type={type} placeholder={label} className={`form-control form-control-sm ${error && touched ? 'is-invalid' : ''}`} />
      <small className="invalid-feedback">{error}</small>
    </div>
  </div>
);

/**
 * This component is used to register
 * users
 *
 * @class Signup
 * @extends {Component}
 * @returns {object} 
 */
class Signup extends Component {
  state = {
    file: '',
    imageUrl: ''
  }

  onSubmitForm = (values) => {
    this.props.userSignUp(values, this.props.history);
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="form-container">
        <div className="form-title">
          <h4>Please Sign up here</h4>
        </div>
        <div className="form-inputs form">
          <form onSubmit={handleSubmit(this.onSubmitForm)}>
            {this.props.user.loading && <div className="submitting">submitting...</div>}
            <Field name="username" type="text" component={renderField} label="Username" />
            <Field name="email" type="email" component={renderField} label="Email addres here" />
            <Field name="firstname" type="text" component={renderField} label="Firstname" />
            <Field name="lastname" type="text" component={renderField} label="Lastname" />
            <Field name="password" type="password" component={renderField} label="Password" />
            <Field name="confirmPassword" type="password" component={renderField} label="Re-enter password" />
            {this.props.user.error && (
              <div className="submitting error form-control-sm" role="alert">
                {this.props.user.error}
              </div>
            )}

            <button type="submit" disabled={submitting} className="btn btn-primary btn-sm">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  user: PropTypes.shape({
    error: PropTypes.any,
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  }),
  auth: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    error: PropTypes.any.isRequired
  }),
  userSignUp: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'signUpForm',
  validate
})(Signup);
