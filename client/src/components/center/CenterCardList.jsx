import React, { Component, Fragment } from 'react';
import CenterCards from './CenterCards.jsx';
import SearchBar from '../ui-components/SearchBar';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Pagination from '../ui-components/Pagination';

/**
 * This component is used to generate center list
 *
 * @class CenterCardList
 * @extends {Component}
 * @returns {object} JSX DOM
 */

export class CenterCardList extends Component {
  state = {
    searchTerm: '',
    currentlyDisplayed: this.props.centers
  };

  onInputChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    });
  };
  handlePageClick = (page) => {  
    const selected = page.selected + 1;
    this.props.searchCenterPerPage(selected);
  };

  renderCenter = () => {
    let centerCards = null;
    const value = this.state.searchTerm;
    const centers = _.filter(this.props.centersPerPage.centers.data, (center) => {
      const name = center.name.toLowerCase();
      const facilities = center.facilities.toLowerCase();
      const location = center.location.toLowerCase();
      return name.includes(value.toLowerCase()) || facilities.includes(value.toLowerCase()) || location.includes(value.toLowerCase());
    });
    if (Array.isArray(centers) && centers.length > 0) {
      centerCards = centers.map(center => (
        <CenterCards
          key={center.id}
          center={center}
          history={this.props.history}
        />
      ));
    } else if (Array.isArray(centers) && centers.length === 0) {
      centerCards = <div className="no-centers-found">No available center</div>;
    }
    return centerCards;
  };
  render() {
    return (
      <Fragment>
        <SearchBar onInputChange={this.onInputChange} />
        <div className="container">
          <div id="cards" className="row cards">
            {this.renderCenter()}
          </div>
        </div>
        <div className="paginate">
          {this.props.centersPerPage.centers.data && <Pagination pages={this.props.pages} page={this.props.page} />} 
        </div>
      </Fragment>
    );
  }
}

CenterCardList.propType = {
  centers: PropTypes.array
};

export default CenterCardList;
