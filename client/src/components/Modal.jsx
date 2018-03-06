import React, { Component } from 'react';
import { connect } from 'react-redux';

class Modal extends Component {
  onClose = () => {
    this.modal.style.display = 'none';
  };
  render() {
    return (
      <div
        className="myModal"
        id="modal"
        ref={el => {
          this.modal = el;
        }}
        onClick={this.onClose}
      >
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
