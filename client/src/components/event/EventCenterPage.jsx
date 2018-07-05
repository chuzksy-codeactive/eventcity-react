import React, { Component } from 'react';
import EventCenterCover from './EventCenterCover';
import EventCenterInfo from './EventCenterInfo';
import PropTypes from 'prop-types';

/**
 * This component is used to create event page
 *
 * @class EventCenterPage
 * @extends {Component}
 * @return {object} JSX DoM
 */
class EventCenterPage extends Component {
  state = {
    name: ''
  };
 
  componentDidMount() {
    this.props.fetchEventCenter(this.props.match.params.id);
    this.setState({
      name: this.props.eventCenter.eventCenter.data.name
    });
  }

  render() {
    const { eventCenter, userId, createEvent } = this.props;
    return (
      <div>
        <EventCenterCover />
        <EventCenterInfo
          eventCenter={eventCenter}
          centerId={this.props.match.params.id}
          userId={userId}
          name={this.state.name}
          createEvent={createEvent}
        />
      </div>
    );
  }
}

EventCenterPage.propTypes = {
  fetchEventCenter: PropTypes.func.isRequired,
  eventCenter: PropTypes.object.isRequired,
  eventCenter: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  createEvent: PropTypes.func.isRequired
}

export default EventCenterPage;
