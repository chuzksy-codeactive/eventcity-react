import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import RenderField from './RenderField';

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
      <div className="container forms">
        <div className="row">
          <div className="col-md-5 offset-md-3">
            <form onSubmit={handleSubmit(this.onSubmitForm)} id="signin" className="signin">
              {this.loading()}
              {this.errorMessage()}
              <Field name="username" type="text" component={RenderField} label="Username or Email" required />
              <Field name="password" type="password" component={RenderField} label="Password" />
              <button className="btn btn-success" type="submit" disabled={submitting} style={{ marginRight: '10px' }}>
                Log In
              </button>
              <Link to="/">
                <button type="button" className="btn btn-danger">
                  Cancel
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'signInForm',
  validate
})(SignInForm);
