import React, { Component } from 'react';

class EventCards extends Component {
  render() {
    return (
      <div className="event-cards">
        <h4>Events Name here</h4>
        <div className="container">
          <ul>
            <li>Purpose</li>
            <li>Location</li>
            <li>Date</li>
          </ul>
          <p>MORE DETAILS</p>
        </div>
      </div>
    );
  }
}

export default EventCards;
