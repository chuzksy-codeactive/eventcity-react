import React, { Component } from 'react';
import CenterCards from './CenterCards.jsx';
import PropTypes from 'prop-types';

/**
 * This component is used to generate center list
 *
 * @class CenterCardList
 * @extends {Component}
 * @returns {object} JSX DOM
 */

class CenterCardList extends Component {
  render() {
    const { centers } = this.props;
    let centerCards = null;
    if (Array.isArray(centers) && centers.length > 0) {
      const { centers } = this.props;
      centerCards = centers.map(center => <CenterCards key={center.id} center={center} />);
    } else if (Array.isArray(centers) && centers.length === 0) {
      centerCards = <div className="no-centers-found">No centers available yet</div>;
    }
    return (
      <div className="container">
        <div className="row cards">{centerCards}</div>
      </div>
    );
  }
}

CenterCardList.propType = {
  centers: PropTypes.array.isRequired
}

export default CenterCardList;
