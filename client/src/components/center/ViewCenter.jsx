import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCenter } from '../../actions/centerAction';
import { searchCenterPerPage } from '../../actions/centerPaginationAction';
import Carousel from '../ui-components/Carousel';
import CenterCardList from './CenterCardList';
import Footer from '../ui-components/Footer';
import PropTypes from 'prop-types';
import _ from 'lodash';


/**
 * This component is used to wrap different component
 * together
 * @class ViewCenter
 * @extends {Component}
 * @returns {object} JSX DOM
 */
export class ViewCenter extends Component {
  state = {
    page: 1
  };
  componentDidMount() {
    this.props.fetchCenter();
    this.props.searchCenterPerPage(this.state.page);
  }
  renderComponent = () => {
    let elements = null;
    if (!_.isUndefined(this.props.centers) && !_.isEmpty(this.props.centers) && !_.isEmpty(this.props.centersPerPage.centers)) {
      elements = (
        <Fragment>
          <Carousel />
          <CenterCardList 
            centers={this.props.centers} 
            centersPerPage={this.props.centersPerPage}
            pages={this.props.centersPerPage.centers.pages} 
            page={this.state.page} 
            count={this.props.centersPerPage.centers.count}
            searchCenterPerPage={this.props.searchCenterPerPage}
            history={this.props.history}/>
            
          <Footer />
        </Fragment>
      );
    }
    return elements;
  };

  render() {
    return <Fragment>{this.renderComponent()}</Fragment>;
  }
}

ViewCenter.propTypes = {
  centers: PropTypes.array.isRequired,
  fetchCenter: PropTypes.func.isRequired,
  searchCenterPerPage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  centers: state.centerListReducer.centers,
  centersPerPage: state.centerPaginationReducer
});

const mapDispatchToProps = dispatch => ({
  fetchCenter: () => dispatch(fetchCenter()),
  searchCenterPerPage: number => dispatch(searchCenterPerPage(number))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCenter);
