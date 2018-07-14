import React, { Component, Fragment } from 'react';
import CenterCards from './CenterCards.jsx';
import SearchBar from '../ui-components/SearchBar';
import PropTypes from 'prop-types';
import _ from 'lodash';

/**
 * This component is used to generate center list
 *
 * @class CenterCardList
 * @extends {Component}
 * @returns {object} JSX DOM
 */

class CenterCardList extends Component {
  state = {
    searchTerm: '',
    currentlyDisplayed: this.props.centers
  };

  onInputChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    });
  };
  renderCenter = (props) => {
    let centerCards = null;
    const value = this.state.searchTerm;
    const centers = _.filter(this.props.centers, center => {
       const name = center.name.toLowerCase();
       const facilities = center.facilities.toLowerCase();
       const location = center.location.toLowerCase();
       return name.includes(value.toLowerCase()) || facilities.includes(value.toLowerCase()) || location.includes(value.toLowerCase())
     })
    if (Array.isArray(centers) && centers.length > 0) {
      centerCards = centers.map(center => <CenterCards key={center.id} center={center} />);
    } else if (Array.isArray(centers) && centers.length === 0) {
      centerCards = <div className="no-centers-found">No available center</div>;
    }
    return centerCards;
  };
  render() {
    return (
      <Fragment>
        <SearchBar centers={this.props.centers} onInputChange={this.onInputChange} />
        <div className="container">
          <div id="cards" className="row cards">
            {this.renderCenter()}
          </div>
        </div>
      </Fragment>
    );
  }
}

CenterCardList.propType = {
  centers: PropTypes.array.isRequired
};

export default CenterCardList;
