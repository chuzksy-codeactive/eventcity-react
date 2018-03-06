import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditCenterList extends Component {
  onClose = () => {
    this.modal.style.display = 'none';
  };
  onOpen = () => {
    this.modal.style.display = 'block';
  };
  render() {
    let centerLists = null;
    if (Array.isArray(this.props.centerList.centers)) {
      const centers = this.props.centerList.centers;
      centerLists = centers.map((value, i) => {
        return (
          <div key={value.id} className="list-item">
            {`${i + 1}. ${value.name}`}{' '}
            <Link to={`/centers/${value.id}`} className="btn-list">
              <i className="ion-edit" />
            </Link>
            <div className="btn-list">
              <i className="ion-trash-a" onClick={this.onOpen} />
            </div>{' '}
          </div>
        );
      });
    }

    return (
      <div>
        <div className="list-wrapper">
          <div>Centers List</div>
          {centerLists}
        </div>
        <div
          className="myModal"
          id="modal"
          ref={el => {
            this.modal = el;
          }}
          onClick={this.onClose}
          style={{ display: 'none' }}
        >
          <div className="modal-content">
            <span className="close">&times;</span>
            <p>Some text in the Modal</p>
          </div>
        </div>
      </div>
    );
  }
}

export default EditCenterList;
