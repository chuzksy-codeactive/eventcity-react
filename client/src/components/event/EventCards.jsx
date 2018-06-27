import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const moment = require('moment');

class EventCards extends Component {
  render() {
    const { name, purpose, location, eventDate, centerId } = this.props.event;
    return (
      <div className="event-card">
        <h4>{name}</h4>
        <div>
          <div>{purpose}</div>
          <div>{location}</div>
          <div style={{ marginBottom: '20px' }}>{moment(eventDate).format('MMMM, Do YYYY')}</div>
          <Link to={`/centers/event/${centerId}`} className="more-details">
            MORE DETAILS
          </Link>
        </div>
      </div>
    );
  }
}

export default EventCards;
