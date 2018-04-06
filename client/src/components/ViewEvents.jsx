import React, { Component } from 'react';
import EventCenterCover from './EventCenterCover';
import EventCardList from './EventCardList';
import Testimonials from './Testimonials';
import Footer from './Footer';

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
        <Footer />
      </div>
    );
  }
}

export default ViewEvents;
