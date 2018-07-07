import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ComposedComponent => {
  class Authentication extends Component {

    auth = true;
    
    componentWillMount() {
      if (!this.props.auth.authenticated) {
        this.auth = false;
        this.props.history.push('/login');
        return;
      }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.auth.authenticated) {
        this.props.history.push('/login');
      }
    }

    render() {
      if (!this.auth) return null;
      return <ComposedComponent {...this.props} />;
    }
  }
  const mapStateToProps = state => ({
    auth: state.authReducer
  });
  return connect(mapStateToProps)(Authentication);
};