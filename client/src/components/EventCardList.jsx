import React, { Component } from 'react';
import EventCards from './EventCards';

const Events = props => {
  const { events } = props;
  return <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>{events.map(e => <EventCards key={e.id} event={e} />)}</div>;
};

class EventCardList extends Component {
  render() {
    const { loading, message, events } = this.props.events;
    return (
      <div className="container">
        <h1 className="header-section row-width">Up Coming events</h1>
        <div style={{ margin: '30px 0' }}>
          {loading ? <div className="loader-big" /> : message ? <div>{message}</div> : <Events events={events} />}
        </div>
      </div>
    );
  }
}

export default EventCardList;
