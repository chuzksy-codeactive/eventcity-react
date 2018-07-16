import React, { Component, Fragment } from 'react';
import _ from 'lodash';
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
    name: '',
    eventCenter: {}
  };
  componentDidMount() {
    this.props.fetchEventCenter(this.props.match.params.id);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.eventCenter.eventCenter && newProps.eventCenter.eventCenter.data){
      this.setState({
        name: newProps.eventCenter.eventCenter.data.name,
        eventCenter: newProps.eventCenter,
      })
    }
  }

  render() {
    const { userId, createEvent, name } = this.props;
    if(!_.isEmpty(this.state.eventCenter)){
      return (
        <Fragment>
          <EventCenterCover />
          <EventCenterInfo
            resetCenterEvent={this.props.resetCenterEvent}
            eventCenter={this.state.eventCenter}
            centerId={this.props.match.params.id}
            userId={userId}
            name={this.state.name}
            createEvent={createEvent}
          />
        </Fragment>
      );
    }
    return <div className="loader-big" style={{marginTop: "100px"}}/>
  }
}

EventCenterPage.propTypes = {
  fetchEventCenter: PropTypes.func.isRequired,
  eventCenter: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  createEvent: PropTypes.func.isRequired
}

export default EventCenterPage;
