import React from 'react';

const CenterCard = props => (
  <div className="card center-cards">
    <img className="card-img-top" src={props.center.imageUrl} alt="this is the card" />
    <div className="card-block">
      <h4 className="card-title">{props.center.name}</h4>

      <div className="center-feature">
        <i className="ion-ios-person icon-small" />
        <span>{props.center.capacity} capacity</span>
      </div>
      <div className="center-feature">
        <i className="ion-ios-location icon-small" />
        <span>{props.center.location}</span>
      </div>
      <div className="center-feature">
        <i className="ion-cash icon-small" />
        <span>{props.center.price}</span>
      </div>
      <a href="./viewCenter.html" className="btn btn-primary">
        More details
      </a>
    </div>
  </div>
);

export default CenterCard;
