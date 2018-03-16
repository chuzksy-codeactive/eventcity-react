import React from 'react';

const CenterCard = () => (
  <div className="card center-cards">
    <img className="card-img-top" src="/images/2.jpg" alt="this is the card" />
    <div className="card-block">
      <h4 className="card-title">Koga Event Hall</h4>
      <p className="card-text">
          The hall provides their calendar online and you know {'if'} your preferred date is
          available or not instantly.
      </p>
      <div className="center-feature">
        <i className="ion-ios-person icon-small" />
        <span>500 Happy Guests</span>
      </div>
      <div className="center-feature">
        <i className="ion-ios-location icon-small" />
        <span>Ajao Estate</span>
      </div>
      <div className="center-feature">
        <i className="ion-cash icon-small" />
        <span>700 000</span>
      </div>
      <a href="./viewCenter.html" className="btn btn-primary">
          More details
      </a>
    </div>
  </div>
);

export default CenterCard;
