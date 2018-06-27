import React, { Component } from 'react';
import EventCenterCover from './EventCenterCover';
import EventCenterInfo from './EventCenterInfo';

class EventCenterPage extends Component {
  state = {
    name: ''
  };
  componentWillMount() {
    this.props.fetchEventCenter(this.props.match.params.id);
  }
  componentDidMount() {
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

export default EventCenterPage;
