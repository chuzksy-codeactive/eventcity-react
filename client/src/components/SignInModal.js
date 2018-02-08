import React, { Component } from 'react';
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

class SignInModal extends Component {
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
    const { handleSubmit, submitting, reset } = this.props;
    return (
      <div>
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Sign In Form
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(this.onSubmitForm)} id="signin">
                  {this.loading()}
                  {this.errorMessage()}
                  <Field name="username" type="text" component={RenderField} label="Username or Email" required />
                  <Field name="password" type="password" component={RenderField} label="Password" />
                </form>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" form="signin" onClick={reset}>
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    form="signin"
                    disabled={submitting}
                    data-dismiss={this.props.user.user.UserMsg ? 'modal' : ''}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const SignInForm = reduxForm({
  form: 'login',
  validate
})(SignInModal);

export default SignInForm;
