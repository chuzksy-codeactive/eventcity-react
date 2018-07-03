import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditCenterList from './EditCenterList';
import { fetchCenter } from '../../actions/centerAction';

class EditCenterForm extends Component {
  componentWillMount() {
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
            <div className="col-md-5 offset-md-3 center-list">
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

export default connect(mapStateToProps, mapDispatchToProps)(EditCenterForm);