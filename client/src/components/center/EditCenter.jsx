import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditCenterList from './EditCenterList';
import { fetchCenter } from '../../actions/centerAction';
import PropTypes from 'prop-types';

/**
 * This component is used to wrap up editCenterList 
 *
 * @class EditCenterForm
 * @extends {Component}
 * @returns {object} JSX DOM
 */
class EditCenterForm extends Component {
  componentDidMount() {
    this.props.fetchCenter();
  }

  render() {
    return (
      <div>
        <div className="container content">
        <div className="header-center">
          <h1 className="header-section row-width">Center List</h1>
        </div>
          <div className="row">
            <div className="col-md-7 offset-md-2 center-list">
              <EditCenterList centerList={this.props.centers} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { centers: state.centerListReducer };
};

const mapDispatchToProps = dispatch => ({
  fetchCenter: () => dispatch(fetchCenter())
});

// EditCenterForm.propTypes = {
//   centers: PropTypes.shape({
//     centers: PropTypes.array.isRequired
//   }),
//   fetchCenter: PropTypes.func.isRequired
// }

export default connect(mapStateToProps, mapDispatchToProps)(EditCenterForm);
