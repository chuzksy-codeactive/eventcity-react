import React, { Component } from 'react';
const moment = require('moment');

class EventCards extends Component {
  render() {
    const { name, purpose, location, eventDate } = this.props.event;
    return (
      <div className="event-card">
        <h4>{name}</h4>
        <div>
          <div>{purpose}</div>
          <div>{location}</div>
          <div>{moment(eventDate).format('MMMM, Do YYYY')}</div>
          <p>MORE DETAILS</p>
        </div>
      </div>
    );
  }
}

export default EventCards;
