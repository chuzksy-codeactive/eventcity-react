import React, { Component } from "react";
import EventCenterCover from "./EventCenterCover";
import EventCardList from "./EventCardList";
import Testimonials from "../ui-components/Testimonials";
import Footer from "../ui-components/Footer";
import PropTypes from "prop-types";

/**
 * This component is used to create
 * the event page
 *
 * @class ViewEvents
 * @extends {Component}
 * @returns {object} JSX DOM
 */
class ViewEvents extends Component {
  componentDidMount() {
    this.props.fetchEvent();
  }
  render() {
    return (
      <div>
        <EventCenterCover />
        <EventCardList
          events={this.props.events}
          history={this.props.history}
        />
        <Testimonials />
        <Footer />
      </div>
    );
  }
}

ViewEvents.propTypes = {
  fetchEvent: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired
};

export default ViewEvents;
