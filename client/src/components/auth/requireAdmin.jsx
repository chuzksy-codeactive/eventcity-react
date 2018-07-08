import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ComposedComponent => {
  class Administrator extends Component {

    isAdmin = true;
    
    componentWillMount() {
      if (!this.props.auth.isAdmin) {
        this.isAdmin = false;
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
      if (!this.isAdmin) return null;
      return <ComposedComponent {...this.props} />;
    }
  }
  const mapStateToProps = state => ({
    auth: state.authReducer
  });
  return connect(mapStateToProps)(Administrator);
};