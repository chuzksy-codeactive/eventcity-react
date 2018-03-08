import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { deleteCenter } from '../actions/centerAction';
import { connect } from 'react-redux';

class EditCenterList extends Component {
  state = {
    id: null,
  };
  onDeleteCenter = id => {
    this.props.deleteCenter(id);
    this.modal.classList.toggle('opened');
    this.modal_overlay.classList.toggle('opened');
  };
  onCloseModal = () => {
    this.modal.classList.toggle('opened');
    this.modal_overlay.classList.toggle('opened');
  };
  onOpenModal = id => {
    this.setState({
      id,
    });
    this.modal.classList.toggle('opened');
    this.modal_overlay.classList.toggle('opened');
  };

  render() {
    let centerLists = null;
    if (Array.isArray(this.props.centerList.centers)) {
      const centers = this.props.centerList.centers;
      centerLists = centers.map((value, i) => {
        return (
          <div key={value.id} className="list-item">
            {`${i + 1}. ${value.name}`}{' '}
            <Link to={`/centers/${value.id}`} className="btn-list">
              <i className="ion-edit" />
            </Link>
            <div className="btn-list">
              <i className="ion-trash-a" onClick={this.onOpenModal.bind(this, value.id)} />
            </div>{' '}
          </div>
        );
      });
    }

    return (
      <div>
        <div className="list-wrapper">
          <div>Centers List</div>
          {centerLists}
        </div>
        <div
          className="modal-overlay"
          id="modal-overlay"
          ref={el => {
            this.modal_overlay = el;
          }}
        />
        <div
          className="modal"
          id="modal"
          ref={el => {
            this.modal = el;
          }}
        >
          <div className="modal-guts">
            <div className="modal-header">
              <h5>Confirm Delete</h5>
              <span className="close" onClick={this.onCloseModal}>
                &times;
              </span>
            </div>
            {this.props.centerList.loading && (
              <div className="center-loader">
                <span className={this.props.centerList.loading ? 'loader' : ''} />
              </div>
            )}
            <p>Do you want to delete this center? </p>
            <div className="modal-footer">
              <button
                className="close-button btn btn-danger btn-sm"
                id="close-button"
                onClick={this.onDeleteCenter.bind(this, this.state.id)}
              >
                delete
              </button>
              <button type="button" className="btn btn-default btn-sm" onClick={this.onCloseModal}>
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  deleteCenter: id => dispatch(deleteCenter(id)),
});

const mapStateToProps = state => ({
  center: state.centerReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCenterList);
