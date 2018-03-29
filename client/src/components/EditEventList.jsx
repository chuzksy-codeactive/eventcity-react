import React, { Component } from 'react';
import moment from 'moment';
import EditEventModal from '../components/EditEventModal';

class EditEventList extends Component {
  state = {
    event: null
  };
  onEdit(event) {
    this.setState(
      {
        event
      },
      () => {
        this.modal.classList.toggle('opened');
        this.modal_overlay.classList.toggle('opened');
      }
    );
  }
  onCloseModal = () => {
    this.modal.classList.toggle('opened');
    this.modal_overlay.classList.toggle('opened');
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
              <i className="ion-trash-a" />
            </div>{' '}
          </div>
        );
      });
    }
    return (
      <div>
        {eventList}
        {eventModal}
      </div>
    );
  }
}

export default EditEventList;
