import React from 'react';
import { Link, StaticRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * This component is used as a list item for a center
 *
 * @class CenterCard
 * @param {object} props A center information
 * @returns {object} JSX DOM
 */

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
        <span> &#x20A6;{props.center.price}</span>
      </div>
      <Link to={`/book/center/${props.center.id}`} className="btn btn-primary">
        <div><span id="more-details" href={`/book/center/${props.center.id}`}>More details</span></div>
      </Link>
    </div>
  </div>
);

CenterCard.propTypes = {
  center: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired
  })
};

export default CenterCard;
