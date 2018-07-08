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
    currentlyDisplayed: this.props.centers || []
  };
  onInputChange = (event) => {
    const value = event.target.value;
    let newlyDisplayed;
    if (!_.isEmpty(this.props.centers)) {
     newlyDisplayed = _.filter(this.props.centers, center => {
       const name = center.name.toLowerCase();
       const facilities = center.facilities.toLowerCase();
       const location = center.location.toLowerCase();
       return name.includes(value.toLowerCase()) || facilities.includes(value.toLowerCase()) || location.includes(value.toLowerCase())
     })
      this.setState({
        searchTerm: value,
        currentlyDisplayed: newlyDisplayed
      });
    }
  };
  renderCenter = () => {
    const centers = this.state.currentlyDisplayed;
    let centerCards = null;
    if (Array.isArray(centers) && centers.length > 0) {
      centerCards = centers.map(center => <CenterCards key={center.id} center={center} />);
    } else if (Array.isArray(centers) && centers.length === 0) {
      centerCards = <div className="no-centers-found">No available center</div>;
    }
    return centerCards
  }
  render() {
    
    return (
      <Fragment>
        <SearchBar centers={this.props.centers} onInputChange={this.onInputChange} />
        <div className="container">
          <div className="row cards">{this.renderCenter()}</div>
        </div>
      </Fragment>
    );
  }
}

CenterCardList.propType = {
  centers: PropTypes.array.isRequired
};

export default CenterCardList;
