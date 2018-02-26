import React, { Component } from 'react';
import EditCenterList from './EditCenterList';

class EditCenterForm extends Component {
  render() {
    return (
      <div className="container adjust-top">
        <div className="row">
          <div className="col-md-5 offset-md-3">
            <EditCenterList />
          </div>
        </div>
      </div>
    );
  }
}

export default EditCenterForm;
