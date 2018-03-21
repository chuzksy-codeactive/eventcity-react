import React, { Component } from 'react';
import EventCenterCover from './EventCenterCover';
import EventCards from './eventCards';

class ViewEvents extends Component {
  render() {
    return (
      <div>
        <EventCenterCover />
        <EventCards />
      </div>
    );
  }
}

export default ViewEvents;
