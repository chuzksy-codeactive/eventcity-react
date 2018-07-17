import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Modal extends Component {
  render() {
    return (
      <div className="myModal" id="modal" ref={this.props.modal} onClick={this.onClose}>
        <div className="modal-content">
          <span className="close">&times;</span>
          <p>Some text in the Modal</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.centerReducer.center.message
  };
};

export default connect(mapStateToProps)(Modal);
