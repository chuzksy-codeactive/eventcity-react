import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditCenterList from './EditCenterList';
import { fetchCenter } from '../actions/centerAction';

class EditCenterForm extends Component {
  componentDidMount() {
    this.props.fetchCenter();
  }

  render() {
    return (
      <div className="container adjust-top">
        <div className="row">
          <div className="col-md-5 offset-md-3">
            <EditCenterList centers={this.props.centers} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  centers: state.centerReducer
});

const mapDispatchToProps = dispatch => ({
  fetchCenter: () => dispatch(fetchCenter())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCenterForm);
