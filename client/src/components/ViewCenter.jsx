import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCenter } from '../actions/centerAction';
import Carousel from './Carousel';
import SearchBar from './SearchBar';
import CenterCardList from './CenterCardList';
import Footer from './Footer';

class ViewCenter extends Component {
  componentWillMount() {
    this.props.fetchCenter();
  }
  render() {
    return (
      <div>
        <Carousel />
        <SearchBar />
        <CenterCardList centers={this.props.centers} />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({ centers: state.centerListReducer.centers });

const mapDispatchToProps = dispatch => ({
  fetchCenter: () => dispatch(fetchCenter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewCenter);
