import React, { Component, Fragment } from 'react';
import moment from 'moment';
import EditEventModal from './EditEventModal';

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
    this.props.reset();
    this.props.fetchEventById(id);
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
        return (
          <div key={event.id} className="list-item">
            {`${i + 1}. ${event.name}`}
            {'. '}
            {moment(event.eventDate).format('MMMM, Do YYYY')}
            <div className="btn-list btn btn-success" data-toggle="tooltip" data-placement="left" title="edit">
              <i className="ion-edit ion-icon" onClick={this.onEdit.bind(this, event)} />
            </div>
            <div className="btn-list btn btn-danger" data-toggle="tooltip" data-placement="right" title="delete">
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

export default EditEventList;
