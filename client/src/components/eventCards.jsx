import React, { Component } from 'react';

class EventCards extends Component {
  render() {
    return (
      <div className="event-card">
        <h4>Events Name here</h4>
        <div>
          <div>Purpose</div>
          <div>Location</div>
          <div>Date</div>
          <p>MORE DETAILS</p>
        </div>
      </div>
    );
  }
}

export default EventCards;
