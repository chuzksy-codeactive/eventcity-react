import React, { Component } from 'react';
import EventCenterCover from './EventCenterCover';
import EventCardList from './EventCardList';
import Testimonials from '../ui-components/Testimonials';
import Footer from '../ui-components/Footer';

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
