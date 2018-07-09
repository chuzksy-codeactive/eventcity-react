import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { searchCenterPerPage } from '../../actions/centerPaginationAction';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

/**
 * Component for Pagination
 *
 * @returns {object} React JSX DOM
 */
class Paginary extends Component {
  onPaginate = (pageNumber) => {
    this.props.searchCenterPerPage(pageNumber);
  };
  enablePaginationItem = (value) => {
    if (value === this.props.page) {
      return true;
    }
    return false;
  };
  render() {
    if (pages <= LIMIT) return null;
    const LIMIT = 2;
    const { pages, searchCenterPerPage, page } = this.props;
    return (
      <Pagination aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink previous href="#" />
        </PaginationItem>
        {new Array(pages).fill(1).map((array, i) => (
          <PaginationItem active={this.enablePaginationItem(i + 1)} key={i}>
            <PaginationLink key={Math.floor(moment() * Math.random())} onClick={this.onPaginate.bind(this, i + 1)}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
    );
  }
}
Pagination.propTypes = {
  pages: PropTypes.number,
  searchCenterPerPage: PropTypes.func
};

const mapStateToProps = state => ({
  centersPerPage: state.centerPaginationReducer
});

const mapDispatchToProps = dispatch => ({
  searchCenterPerPage: number => dispatch(searchCenterPerPage(number))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Paginary);
