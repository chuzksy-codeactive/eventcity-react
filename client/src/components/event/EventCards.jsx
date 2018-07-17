import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const moment = require("moment");

/**
 * This component is used to generete centers cards
 *
 * @class EventCards
 * @extends {Component}
 * @returns {object} JSX DOM
 */
class EventCards extends Component {
  render() {
    const { name, purpose, location, eventDate, centerId } = this.props.event;
    return (
      <div className="event-card">
        <h4>{name}</h4>
        <div>
          <div>{purpose}</div>
          <div>{location}</div>
          <div style={{ marginBottom: "20px" }}>
            {moment(eventDate).format("MMMM, Do YYYY")}
          </div>
          <span
            onClick={this.props.history.push(`/centers/event/${centerId}`)}
            className="more-details"
          >
            MORE DETAILS
          </span>
        </div>
      </div>
    );
  }
}

EventCards.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string,
    purpose: PropTypes.string,
    location: PropTypes.string,
    eventDate: PropTypes.string,
    centerId: PropTypes.number
  })
};

export default EventCards;
