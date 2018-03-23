import React, { Component } from 'react';
import moment from 'moment';

class EditEventList extends Component {
  render() {
    let eventList = null;
    if (Array.isArray(this.props.events)) {
      eventList = this.props.events.map((event, i) => {
        return (
          <div key={event.id} className="list-item">
            {`${i + 1}. ${event.name}`}
            {'. '}
            {moment(event.eventDate).format('MMMM, Do YYYY')}
            <div className="btn-list btn btn-success" data-toggle="tooltip" data-placement="left" title="edit">
              <i className="ion-edit ion-icon" />
            </div>
            <div className="btn-list btn btn-danger" data-toggle="tooltip" data-placement="right" title="delete">
              <i className="ion-trash-a" />
            </div>{' '}
          </div>
        );
      });
    }
    return <div>{eventList}</div>;
  }
}

export default EditEventList;
