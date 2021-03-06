import React from 'react';

/**
 * This component is used as a list item for a center
 *
 * @class CenterCard
 * @param {object} props A center information
 * @returns {object} JSX DOM
 */

const CenterList = () => (
  <div className="containter center-flex">
    <div className="row">
      <div className="col">
        <ul className="list-group">
          <li className="list-group-item">
            <div className="center-list">
              <h5 className="btn-list-1">Center Name</h5>
              <button className="btn btn-primary" title="edit center">
                <i className="ion-edit" />
              </button>
              <button className="btn btn-danger" title="delete center">
                <i className="ion-trash-a" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default CenterList;
