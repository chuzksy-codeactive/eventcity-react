import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCenter, sortCenters } from '../../actions/centerAction';
import Carousel from '../ui-components/Carousel';
import CenterCardList from './CenterCardList';
import Footer from '../ui-components/Footer';
import PropTypes from 'prop-types';


/**
 * This component is used to wrap different component
 * together
 * @class ViewCenter
 * @extends {Component}
 * @returns {object} JSX DOM
 */
class ViewCenter extends Component {
  componentDidMount() {
    this.props.fetchCenter();
  }

  render() {
    return (
      <Fragment>
        <Carousel />
        <CenterCardList centers={this.props.centers} sortCenters={this.props.sortCenters}/>
        <Footer />
      </Fragment>
    );
  }
}

ViewCenter.propTypes = {
  centers: PropTypes.array,
  fetchCenter: PropTypes.func.isRequired
}

const mapStateToProps = state => 
  { 
    return { centers: state.centerListReducer.centers }
  };

const mapDispatchToProps = dispatch => ({
  fetchCenter: () => dispatch(fetchCenter()),
  sortCenters: (value) => dispatch(sortCenters(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewCenter);
