import React, { Component } from 'react';
import EventCenterCover from './EventCenterCover';
import EventCardList from './EventCardList';
import Testimonials from './Testimonials';

class ViewEvents extends Component {
  componentDidMount() {
    this.props.fetchEvent();
  }
  render() {
    return (
      <div>
        <EventCenterCover />
        <EventCardList events={this.props.events} />
        <Testimonials />
      </div>
    );
  }
}

export default ViewEvents;
