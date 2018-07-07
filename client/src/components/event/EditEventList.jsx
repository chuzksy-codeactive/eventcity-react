import React, { Component, Fragment } from 'react';
import moment from 'moment';
import EditEventModal from './EditEventModal';
import PropTypes from 'prop-types';

/**
 * This component is use to view list of events
 *
 * @function deleteModal
 * @prop {onCloseModal, self} 
 * @returns {object} JSX DOM
 */

const deleteModal = (onCloseModal, self) => {
  return (
    <Fragment>
       <div
          className="modal-overlay"
          id="modal-overlay"
          ref={(el) => {
            self.modal_overlay = el;
          }}
        />
        <div
          className="modal delete"
          id="modal"
          ref={(el) => {
            self.modal = el;
          }}
        >
          <div className="modal-guts">
            <div className="modal-header">
              <h5>Confirm Delete</h5>
              <span className="close" onClick={onCloseModal}>
                &times;
              </span>
            </div>
            {self.props.eventsByUserId.loading && (
              <div className="center-loader">
                <span className={self.props.eventsByUserId.loading ? 'loader' : ''} />
              </div>
            )}
            <p>Do you want to delete this event? </p>
            <div className="modal-footer">
              <button
                className="close-button btn btn-danger btn-sm"
                id="close-button"
                onClick={self.onDeleteEvent.bind(self, self.state.id)}
              >
                delete
              </button>
              <button type="button" className="btn btn-default btn-sm" onClick={self.onCloseModalDelete}>
                cancel
              </button>
            </div>
          </div>
        </div>
    </Fragment>
  )
};

/**
 * This component is used to create a modal 
 * for edit user's events
 *
 * @class EditEventList
 * @extends {Component}
 * @returns {object} JSX DOM
 */
class EditEventList extends Component {
  state = {
    event: null, id: null,
    setModal: 'edit'
  };
  onEdit(event) {
    this.setState(
      {
        event,
        setModal: 'edit'
      },
      () => {
        this.modal.classList.toggle('opened');
        this.modal_overlay.classList.toggle('opened');
        this.props.reset();
      }
    );
  }
  onDeleteEvent = (id) => {
    this.props.deleteEventById(id);
    this.props.fetchEventById(this.props.userId);
    this.modal.classList.toggle('opened');
    this.modal_overlay.classList.toggle('opened');
  };
  onCloseModal = () => {
    this.modal.classList.toggle('opened');
    this.modal_overlay.classList.toggle('opened');
    this.props.fetchEventById(this.props.userId);
  };
  onCloseModalDelete = () => {
    this.props.fetchEventById(this.props.userId);
    this.modal.classList.toggle('opened');
    this.modal_overlay.classList.toggle('opened');
  };
  onOpenModalDelete = (id) => {
    this.setState({
      id,
      setModal: 'delete'
    }, () => {
      this.modal.classList.toggle('opened');
      this.modal_overlay.classList.toggle('opened');
    });
  };

  render() {
    let eventModal = null;
    if (this.state.event !== null) {
      eventModal = (
        <EditEventModal
          event={this.state.event}
          onOpenModal={this.onOpenModal}
          onCloseModal={this.onCloseModal}
          modal_overlay={el => (this.modal_overlay = el)}
          modal={el => (this.modal = el)}
        />
      );
    }
    let eventList = null;
    if (Array.isArray(this.props.events)) {
      eventList = this.props.events.map((event, i) => {
        const editable = event.userId === 1 || event.userId === 2 || event.userId === this.props.userId;

        const btnStyle = editable ? "btn-list" : "btn-list-disabled"
        const EditButton = editable
        ? (<i className="ion-edit ion-icon" onClick={this.onEdit.bind(this, event)} />)
        : (<i className="ion-edit ion-icon" />); 
        return (
          <div key={event.id} className="list-item">
            {`${i + 1}. ${event.name}`}
            {'. '}
            {moment(event.eventDate).format('MMMM, Do YYYY')}
            <div className={btnStyle} data-toggle="tooltip" data-placement="left" title="edit" >
              {EditButton}
            </div>
            <div className="btn-list ion-icon" data-toggle="tooltip" data-placement="right" title="delete">
              <i className="ion-trash-a" onClick={this.onOpenModalDelete.bind(this, event.id)} />
            </div>{' '}
          </div>
        );
      });
    }
    return (
      <Fragment>
        {eventList}
        {this.state.setModal === 'edit' ? eventModal : deleteModal(this.onCloseModalDelete, this)}
      </Fragment>
    );
  }
}

EditEventList.propTypes = {
  loading: PropTypes.bool,
  reset: PropTypes.func.isRequired, 
  event: PropTypes.array,
  fetchEventById: PropTypes.func,
  deleteEventById: PropTypes.func
}

export default EditEventList;
