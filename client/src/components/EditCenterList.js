import React from 'react';
import { Link } from 'react-router-dom';

const EditCenterList = props => {
  let centerLists = null;
  if (Array.isArray(props.centerList.centers)) {
    const centers = props.centerList.centers;
    centerLists = centers.map((value, i) => {
      return (
        <div key={value.id} className="list-item">
          {`${i + 1}. ${value.name}`}{' '}
          <Link to={`/centers/${value.id}`} className="btn-list">
            <i className="ion-edit" />
          </Link>
          <div className="btn-list">
            <i className="ion-trash-a" />
          </div>{' '}
        </div>
      );
    });
  }
  return (
    <div className="list-wrapper">
      <div>Centers List</div>
      {centerLists}
    </div>
  );
};

export default EditCenterList;
