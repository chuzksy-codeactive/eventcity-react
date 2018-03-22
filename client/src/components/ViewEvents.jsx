import React, { Component } from 'react';
import EventCenterCover from './EventCenterCover';
import EventCardList from './EventCardList';

class ViewEvents extends Component {
  componentDidMount() {
    this.props.fetchEvent();
  }
  render() {
    return (
      <div>
        <EventCenterCover />
        <EventCardList events={this.props.events} />
      </div>
    );
  }
}

export default ViewEvents;
