import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ComposedComponent => {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.auth.authenticated) {
        this.props.history.push('/login');
      }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.auth.authenticated) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  const mapStateToProps = state => ({
    auth: state.authReducer
  });
  return connect(mapStateToProps)(Authentication);
};
