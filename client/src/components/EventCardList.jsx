import React, { Component } from 'react';

class EventCardList extends Component {
  render() {
    const { loading, message, events } = this.props.events;
    return <div style={{ marginTop: '30px' }}>{loading ? <div className="loader-big" /> : <div />}</div>;
  }
}

export default EventCardList;
