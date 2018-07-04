import React, { Component } from 'react';
import EventCards from './EventCards';
import PropTypes from 'prop-types';

const Events = props => {
  const { events } = props;
  if(events.length > 0){
    return <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>{events.map(e => <EventCards key={e.id} event={e} />)}</div>;
  }
  return <div className="no-events-found">No Event is scheduled yet</div>
};


/**
 * This component is used to generate event lists
 *
 * @class EventCardList
 * @extends {Component}
 * @returns {object} JSX DOM
 */
class EventCardList extends Component {
  render() {
    const { loading, message, events } = this.props.events;
    return (
      <div className="container">
        <h1 className="header-section row-width">Up Coming events</h1>
        <div style={{ margin: '30px 0', display: 'flex', justifyContent: 'center' }}>
          {loading ? <div className="loader-big" /> : message ? <div className="no-centers-found">{message}</div> : <Events events={events} />}
        </div>
      </div>
    );
  }
}

EventCardList.propTypes = {
  events: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    message: PropTypes.any,
    events: PropTypes.array.isRequired
  })
}
export default EventCardList;
